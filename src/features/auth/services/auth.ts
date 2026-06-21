import { apiCore } from '@/services/api';
import { RToast } from '@/components';
import type { ApiResponse, AuthenticationType, VerifyPhoneType } from '@/types';
import type { UserType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface RegisterParams {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    role: number;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface PhoneVerifyParams {
    email: string;
    otp: string;
}

export interface GetPhoneVerifyParams {
    email: string;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function register(
    params: RegisterParams
): Promise<AuthenticationType | undefined> {
    const resp = await api.create<AuthenticationType>('/auth/register', params as unknown as Record<string, unknown>, true);
    if (resp.status === 'success' && resp.result) {
        api.setLoggedInUser(resp.result);
        return { user: resp.result.user, token: resp.result.token };
    }
    return undefined;
}

export async function login(
    params: LoginParams
): Promise<AuthenticationType | undefined> {
    const resp = await api.create<AuthenticationType>('/auth/login', params as unknown as Record<string, unknown>, true);
    if (resp.status === 'success' && resp.result) {
        api.setLoggedInUser(resp.result);
        return { user: resp.result.user, token: resp.result.token };
    }
    return undefined;
}

export async function storeVerifyPhone(
    params: PhoneVerifyParams
): Promise<AuthenticationType | undefined> {
    const resp = await api.create<AuthenticationType>(
        '/auth/phone-verify',
        params as unknown as Record<string, unknown>,
        true
    );
    if (resp.status === 'success' && resp.result) {
        api.setLoggedInUser(resp.result);
        return resp.result;
    }
    return undefined;
}

export async function getVerifyPhone(
    params: GetPhoneVerifyParams
): Promise<VerifyPhoneType | undefined> {
    const resp = await api.create<VerifyPhoneType>(
        '/auth/get-phone-verify',
        params as unknown as Record<string, unknown>,
        true
    );
    return resp.status === 'success' ? resp.result : undefined;
}

export async function profile(): Promise<UserType | undefined> {
    const resp = await api.get<UserType>('/auth/profile', {}, false);
    if (resp.result) {
        return resp.result;
    }
    RToast(resp.statusMessage);
    setTimeout(() => api.setLoggedInUser(undefined), 2000);
    return undefined;
}

export async function logout(): Promise<void> {
    const resp: ApiResponse<unknown> = await api.create('/auth/logout', {}, false);
    if (resp.status === 'success') {
        api.setLoggedInUser(undefined);
    }
}
