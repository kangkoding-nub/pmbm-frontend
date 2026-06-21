import { apiCore } from '@/services/api';
import type { ApiResponse, StudentProgramType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetStudentProgramParams {
    userId?: number;
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreStudentProgramParams {
    id?: number;
    userId?: number;
    yearId?: number;
    institutionId?: number;
    periodId?: number;
    programId?: number;
    boardingId?: number;
    registration_number?: string;
    status?: number;
    createdBy?: string;
    updatedBy?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateStudentProgramParams extends Partial<StoreStudentProgramParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getStudentProgram(
    params: GetStudentProgramParams = {}
): Promise<StudentProgramType[]> {
    const resp = await api.get<StudentProgramType[]>('/student/program', params);
    return resp.result ?? [];
}

export async function storeStudentProgram(
    params: StoreStudentProgramParams,
    notification = true
): Promise<StudentProgramType | undefined> {
    const resp = await api.create<StudentProgramType>('/student/program', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateStudentProgram(
    params: UpdateStudentProgramParams,
    notification = true
): Promise<ApiResponse<StudentProgramType>> {
    return api.update<StudentProgramType>(`/student/program/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteStudentProgram(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/program/${id}`, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getStudentProgram */ export const get = getStudentProgram;
/** @deprecated use storeStudentProgram */ export const store = storeStudentProgram;
/** @deprecated use updateStudentProgram */ export const update = updateStudentProgram;
/** @deprecated use deleteStudentProgram */ export const destroy = deleteStudentProgram;
