import { apiCore } from '@/services/api';
import type { ApiResponse, StudentOriginType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetOriginParams {
    userId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreOriginParams {
    id?: number;
    userId?: number;
    name?: string;
    npsn?: string;
    address?: string;
    createdBy?: number;
    updatedBy?: number;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateOriginParams extends Partial<StoreOriginParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getOrigin(
    params: GetOriginParams = {}
): Promise<StudentOriginType[]> {
    const resp = await api.get<StudentOriginType[]>('/student/origin', params);
    return resp.result ?? [];
}

export async function storeOrigin(
    params: StoreOriginParams,
    notification = true
): Promise<StudentOriginType | undefined> {
    const resp = await api.create<StudentOriginType>('/student/origin', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateOrigin(
    params: UpdateOriginParams,
    notification = true
): Promise<ApiResponse<StudentOriginType>> {
    return api.update<StudentOriginType>(`/student/origin/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteOrigin(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/origin/${id}`, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getOrigin */ export const get = getOrigin;
/** @deprecated use storeOrigin */ export const store = storeOrigin;
/** @deprecated use updateOrigin */ export const update = updateOrigin;
/** @deprecated use deleteOrigin */ export const destroy = deleteOrigin;
