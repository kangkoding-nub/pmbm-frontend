import { apiCore } from '@/services/api';
import type { ApiResponse, StudentAddressType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetAddressParams {
    userId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreAddressParams {
    province?: string;
    city?: string;
    district?: string;
    village?: string;
    street?: string;
    rt?: string;
    rw?: string;
    postal?: string;
    userId?: number;
    createdBy?: number;
    updatedBy?: number;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateAddressParams extends Partial<StoreAddressParams> {
    id?: number;
    userId?: number;
    createdBy?: number;
    updatedBy?: number;
    created_at?: string;
    updated_at?: string;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getAddress(
    params: GetAddressParams = {}
): Promise<StudentAddressType[]> {
    const resp = await api.get<StudentAddressType[]>('/student/address', params);
    return resp.result ?? [];
}

export async function storeAddress(
    params: StoreAddressParams,
    notification = true
): Promise<StudentAddressType | undefined> {
    const resp = await api.create<StudentAddressType>('/student/address', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateAddress(
    params: UpdateAddressParams,
    notification = true
): Promise<ApiResponse<StudentAddressType>> {
    return api.update<StudentAddressType>(`/student/address/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteAddress(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/address/${id}`, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getAddress */ export const get = getAddress;
/** @deprecated use storeAddress */ export const store = storeAddress;
/** @deprecated use updateAddress */ export const update = updateAddress;
/** @deprecated use deleteAddress */ export const destroy = deleteAddress;
