import { AxiosError, type AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { getToken, setToken, removeToken, isAuthenticated } from '@/lib/auth-token';
import { RToast } from '@/components';
import type { ApiResponse, ApiParams } from '@/types';
import type { AuthenticationType } from '@/types';

function buildUrl(url: string, params?: ApiParams): string {
    if (!params) return url;
    const entries = Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null
    ) as [string, string | number | boolean][];
    if (entries.length === 0) return url;
    const qs = new URLSearchParams(
        entries.map(([k, v]) => [k, String(v)])
    ).toString();
    return `${url}?${qs}`;
}

function buildFormData(data: Record<string, unknown>): FormData {
    const fd = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            for (const item of value) {
                fd.append(`${key}[]`, item === undefined || item === null ? '' : String(item));
            }
        } else {
            fd.append(key, value === undefined || value === null ? '' : (value as string | Blob));
        }
    }
    return fd;
}


class apiCore {

    async get<T>(
        url: string,
        params: ApiParams = {},
        notification = false
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axiosInstance.get<ApiResponse<T>>(buildUrl(url, params));
            return this.handleResponse<T>(response, notification);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notification);
        }
    }

    async getFile(
        url: string,
        params?: ApiParams
    ): Promise<AxiosResponse<Blob>> {
        try {
            const response = await axiosInstance.get<Blob>(buildUrl(url, params), {
                responseType: 'blob',
            });
            return response;
        } catch (error) {
            const axiosErr = error as AxiosError;
            if (axiosErr.response?.data instanceof Blob) {
                const text = await axiosErr.response.data.text();
                try {
                    const json = JSON.parse(text) as { statusMessage?: string; message?: string };
                    throw new Error(json.statusMessage ?? json.message ?? 'Terjadi kesalahan');
                } catch (parseErr) {
                    if (parseErr instanceof SyntaxError) throw new Error(text);
                    throw parseErr;
                }
            }
            throw axiosErr;
        }
    }

    getMultiple(
        urls: string[],
        params?: ApiParams
    ): Promise<AxiosResponse[]> {
        return Promise.all(
            urls.map((url) => axiosInstance.get(buildUrl(url, params)))
        );
    }


    async create<T>(
        url: string,
        data: Record<string, unknown>,
        notify: boolean
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axiosInstance.post<ApiResponse<T>>(url, data);
            return this.handleResponse<T>(response, notify);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notify);
        }
    }

    async update<T>(
        url: string,
        data: Record<string, unknown>,
        notify: boolean
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axiosInstance.put<ApiResponse<T>>(url, data);
            return this.handleResponse<T>(response, notify);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notify);
        }
    }

    async updatePatch<T>(
        url: string,
        data: Record<string, unknown>,
        notify = false
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axiosInstance.patch<ApiResponse<T>>(url, data);
            return this.handleResponse<T>(response, notify);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notify);
        }
    }

    async delete<T = unknown>(
        url: string,
        notify: boolean
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axiosInstance.delete<ApiResponse<T>>(url);
            return this.handleResponse<T>(response, notify);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notify);
        }
    }

    async createWithFile<T>(
        url: string,
        data: Record<string, unknown>,
        notify: boolean
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axiosInstance.post<ApiResponse<T>>(
                url,
                buildFormData(data),
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return this.handleResponse<T>(response, notify);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notify);
        }
    }

    async updateWithFile<T>(
        url: string,
        data: Record<string, unknown>,
        notify: boolean
    ): Promise<ApiResponse<T>> {
        const fd = buildFormData(data);
        fd.append('_method', 'put');
        try {
            const response = await axiosInstance.post<ApiResponse<T>>(
                url,
                fd,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return this.handleResponse<T>(response, notify);
        } catch (error) {
            return this.handleResponse<T>(error as AxiosError, notify);
        }
    }

    isUserAuthenticated(): boolean {
        return isAuthenticated();
    }

    setLoggedInUser(session: AuthenticationType | undefined): void {
        if (session?.token) {
            setToken(session.token);
        } else {
            removeToken();
        }
    }

    getLoggedInUser(): AuthenticationType | undefined {
        const token = getToken();
        return token ? { token } : undefined;
    }

    handleResponse<T>(
        resp: AxiosResponse<ApiResponse<T>> | AxiosError,
        notification: boolean
    ): ApiResponse<T> {
        // Happy path: HTTP 2xx, server returned a valid envelope
        if (!(resp instanceof AxiosError)) {
            const { status, statusMessage, result } = resp.data;
            if (status === 'success') {
                if (statusMessage && notification) RToast(statusMessage, 'success');
                return { status: 'success', statusMessage, result };
            }
            // HTTP 2xx but business-logic error from backend (e.g. validation message)
            // Use 'warning' because this is user-correctable, not a system crash
            if (statusMessage && notification) RToast(statusMessage, 'warning');
            return { status: 'error', statusMessage, result };
        }

        // Error path — AxiosError (network error or HTTP 4xx/5xx)
        const err = resp as AxiosError<ApiResponse<T>>;

        if (err.code === 'ERR_NETWORK' || !err.response) {
            const msg = 'Aplikasi tidak terhubung ke server.';
            if (notification) RToast(msg, 'error');
            return { status: 'error', statusMessage: msg };
        }

        const { status: httpStatus, data } = err.response;

        switch (httpStatus) {
            case 401: {
                // Session expired — informational, not a crash
                const msg = data?.statusMessage || 'Sesi anda telah berakhir: Silakan masuk lagi.';
                if (notification) RToast(msg, 'warning');
                return { status: 'error', statusMessage: msg };
            }
            case 403: {
                // Forbidden — informational, user should know but it’s not a crash
                const msg = data?.statusMessage || 'Anda tidak memiliki izin untuk mengakses sumber daya ini.';
                if (notification) RToast(msg, 'warning');
                return { status: 'error', statusMessage: msg };
            }
            case 422: {
                // Validation error — user-correctable, use warning
                const msg = data?.statusMessage || 'Validasi gagal.';
                if (notification) RToast(msg, 'warning');
                return { status: 'error', statusMessage: msg };
            }
            case 500: {
                // Internal server error — system crash, use error (red)
                const msg = data?.statusMessage || 'Server error, silahkan ulangi lagi.';
                if (notification) RToast(msg, 'error');
                return { status: 'error', statusMessage: msg };
            }
            default: {
                // Unknown error — use error for anything unexpected
                const msg =
                    data?.statusMessage ||
                    (err.response as { data: { message?: string } }).data?.message ||
                    'Kesalahan tidak diketahui';
                if (notification) RToast(msg, 'error');
                return { status: 'error', statusMessage: msg };
            }
        }
    }
}

export { apiCore };
