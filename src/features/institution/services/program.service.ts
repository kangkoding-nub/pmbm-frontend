import { apiCore } from '@/services/api';
import type { ApiResponse, InstitutionProgramType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetProgramsParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreProgramParams {
    id?: number;
    yearId?: number;
    institutionId?: number;
    name: string;
    alias: string;
    description: string;
    boarding: string | number[];
    createdBy?: string;
    updatedBy?: string;
}

export interface UpdateProgramParams extends Partial<StoreProgramParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getPrograms(
    params: GetProgramsParams = {}
): Promise<InstitutionProgramType[]> {
    const resp = await api.get<InstitutionProgramType[]>('/institution/program', params);
    return resp.result ?? [];
}

export async function storeProgram(
    params: StoreProgramParams
): Promise<ApiResponse<InstitutionProgramType>> {
    return api.create<InstitutionProgramType>('/institution/program', params as unknown as Record<string, unknown>, true);
}

export async function updateProgram(
    params: UpdateProgramParams
): Promise<ApiResponse<InstitutionProgramType>> {
    return api.update<InstitutionProgramType>(`/institution/program/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteProgram(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/institution/program/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getPrograms */ export function get<T = InstitutionProgramType>(params: GetProgramsParams = {}): Promise<T[]> { return getPrograms(params) as unknown as Promise<T[]>; }
/** @deprecated use storeProgram */ export const store = storeProgram;
/** @deprecated use updateProgram */ export const update = updateProgram;
/** @deprecated use deleteProgram */ export const destroy = deleteProgram;
