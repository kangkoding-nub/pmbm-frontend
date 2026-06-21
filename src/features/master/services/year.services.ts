import { apiCore } from '@/services/api';
import type { ApiResponse } from '@/types';
import type { YearType } from '@/features/master/types';

const api = new apiCore();

export async function getYears<T = YearType>(params: Record<string, string> = {}): Promise<T[]> {
    const resp = await api.get<T[]>('/master/year', params);
    return resp.result ?? [];
}

export async function storeYear(payload: YearType): Promise<ApiResponse<YearType>> {
    return api.create<YearType>('/master/year', payload as unknown as Record<string, unknown>, true);
}

export async function updateYear(payload: YearType): Promise<ApiResponse<YearType>> {
    return api.update<YearType>(`/master/year/${payload.id}`, payload as unknown as Record<string, unknown>, true);
}

export async function deleteYear(id: number|undefined): Promise<ApiResponse<YearType>> {
    return api.delete(`/master/year/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getYears */ export const get = getYears;
