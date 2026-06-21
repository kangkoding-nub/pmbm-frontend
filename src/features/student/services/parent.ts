import { apiCore } from '@/services/api';
import type { ApiResponse, StudentParentType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetParentParams {
    userId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreParentParams {
    id?: number;
    userId?: number;
    numberKk?: string;
    headFamily?: string;
    fatherStatus?: number;
    fatherName?: string;
    fatherNik?: string;
    fatherBirthPlace?: string;
    fatherBirthDate?: string;
    fatherStudy?: number;
    fatherJob?: number;
    fatherPhone?: string;
    motherStatus?: number;
    motherName?: string;
    motherNik?: string;
    motherBirthPlace?: string;
    motherBirthDate?: string;
    motherStudy?: number;
    motherJob?: number;
    motherPhone?: string;
    guardStatus?: number;
    guardName?: string;
    guardNik?: string;
    guardBirthPlace?: string;
    guardBirthDate?: string;
    guardStudy?: number;
    guardJob?: number;
    guardPhone?: string;
    createdBy?: number;
    updatedBy?: number;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateParentParams extends Partial<StoreParentParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getParent(
    params: GetParentParams = {}
): Promise<StudentParentType[]> {
    const resp = await api.get<StudentParentType[]>('/student/parent', params);
    return resp.result ?? [];
}

export async function storeParent(
    params: StoreParentParams,
    notification = true
): Promise<StudentParentType | undefined> {
    const resp = await api.create<StudentParentType>('/student/parent', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateParent(
    params: UpdateParentParams,
    notification = true
): Promise<ApiResponse<StudentParentType>> {
    return api.update<StudentParentType>(`/student/parent/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteParent(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/parent/${id}`, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getParent */ export const get = getParent;
/** @deprecated use storeParent */ export const store = storeParent;
/** @deprecated use updateParent */ export const update = updateParent;
/** @deprecated use deleteParent */ export const destroy = deleteParent;
