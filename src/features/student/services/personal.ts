import { apiCore } from '@/services/api';
import type { ApiResponse, StudentPersonalType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetPersonalParams {
    userId?: number;
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StorePersonalParams {
    id?: number;
    userId?: number;
    name?: string;
    nisn?: string;
    nik?: string;
    gender?: number;
    birthPlace?: string;
    birthDate?: string;
    phone?: string;
    birthNumber?: string;
    sibling?: string;
    createdBy?: number;
    updatedBy?: number;
    created_at?: string;
    updated_at?: string;
}

export interface UpdatePersonalParams extends Partial<StorePersonalParams> {
    id?: number;
    userId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getPersonal<T = StudentPersonalType>(
    params: GetPersonalParams = {}
): Promise<T[]> {
    const resp = await api.get<T[]>('/student/personal', params);
    return resp.result ?? [];
}

export async function storePersonal(
    params: StorePersonalParams,
    notification = true
): Promise<StudentPersonalType | undefined> {
    const resp = await api.create<StudentPersonalType>('/student/personal', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updatePersonal(
    params: UpdatePersonalParams,
    notification = true
): Promise<ApiResponse<StudentPersonalType>> {
    return api.update<StudentPersonalType>(`/student/personal/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deletePersonal(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/personal/${id}`, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getPersonal */ export const get = getPersonal;
/** @deprecated use storePersonal */ export const store = storePersonal;
/** @deprecated use updatePersonal */ export const update = updatePersonal;
/** @deprecated use deletePersonal */ export const destroy = deletePersonal;
