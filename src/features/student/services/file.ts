import { apiCore } from '@/services/api';
import type { ApiResponse, StudentFileType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetStudentFileParams {
    userId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreStudentFileParams {
    imagePhoto?: File;
    imageKk?: File;
    imageKtp?: File;
    numberAkta: string;
    imageAkta?: File;
    numberIjazah: string;
    imageIjazah?: File;
    numberSkl: string;
    imageSkl?: File;
    numberKip: string;
    imageKip?: File;
}

export interface UpdateStudentFileParams extends Partial<StoreStudentFileParams> {
    id?: number;
    userId?: number;
    [key: string]: File | string | number | boolean | null | undefined;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getStudentFile(
    params: GetStudentFileParams = {}
): Promise<StudentFileType[]> {
    const resp = await api.get<StudentFileType[]>('/student/file', params);
    return resp.result ?? [];
}

export async function storeStudentFile(
    params: StoreStudentFileParams,
    notification = true
): Promise<StudentFileType | undefined> {
    const resp = await api.createWithFile<StudentFileType>('/student/file', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateStudentFile(
    params: UpdateStudentFileParams,
    notification = true
): Promise<ApiResponse<StudentFileType>> {
    return api.updateWithFile<StudentFileType>(`/student/file/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteStudentFile(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/file/${id}`, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getStudentFile */ export const get = getStudentFile;
/** @deprecated use storeStudentFile */ export const store = storeStudentFile;
/** @deprecated use updateStudentFile */ export const update = updateStudentFile;
/** @deprecated use deleteStudentFile */ export const destroy = deleteStudentFile;
