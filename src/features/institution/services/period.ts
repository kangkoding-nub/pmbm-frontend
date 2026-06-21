import { apiCore } from '@/services/api';
import type { ApiResponse, InstitutionPeriodType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetPeriodsParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StorePeriodParams {
    id?: number;
    yearId?: number;
    institutionId?: number | string;
    name: string;
    description?: string;
    start?: string;
    end?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface UpdatePeriodParams extends Partial<StorePeriodParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getPeriods(
    params: GetPeriodsParams = {}
): Promise<InstitutionPeriodType[]> {
    const resp = await api.get<InstitutionPeriodType[]>('/institution/period', params);
    return resp.result ?? [];
}

export async function storePeriod(
    params: StorePeriodParams
): Promise<ApiResponse<InstitutionPeriodType>> {
    return api.create<InstitutionPeriodType>('/institution/period', params as unknown as Record<string, unknown>, true);
}

export async function updatePeriod(
    params: UpdatePeriodParams
): Promise<ApiResponse<InstitutionPeriodType>> {
    return api.update<InstitutionPeriodType>(`/institution/period/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deletePeriod(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/institution/period/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getPeriods */ export function get<T = InstitutionPeriodType>(params: GetPeriodsParams = {}): Promise<T[]> { return getPeriods(params) as unknown as Promise<T[]>; }
/** @deprecated use storePeriod */ export const store = storePeriod;
/** @deprecated use updatePeriod */ export const update = updatePeriod;
/** @deprecated use deletePeriod */ export const destroy = deletePeriod;
