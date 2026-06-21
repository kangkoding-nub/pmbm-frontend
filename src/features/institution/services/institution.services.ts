import { apiCore } from '@/services/api';
import type { InstitutionType } from '@/features/institution/types';
import type { ApiResponse } from '@/types';

const api = new apiCore();

export async function getInstitutions<T>(params: Record<string, string>): Promise<T[]> {
    const resp = await api.get<T[]>('/institution', params);
    return resp.result ?? [];
}

export async function showInstitution(id: number): Promise<InstitutionType | undefined> {
    const resp = await api.get<InstitutionType>(`/institution/${id}`, {});
    return resp.result;
}

export async function storeInstitution(payload: InstitutionType): Promise<ApiResponse<InstitutionType>> {
    return api.createWithFile<InstitutionType>('/institution', payload, true);
}

export async function updateInstitution(payload: InstitutionType): Promise<ApiResponse<InstitutionType>> {
    return api.updateWithFile<InstitutionType>(`/institution/${payload.id}`, payload, true);
}

export async function deleteInstitution(id: number|undefined): Promise<ApiResponse<InstitutionType>> {
    return api.delete(`/institution/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getInstitutions */ export const get = getInstitutions;
/** @deprecated use showInstitution */ export const show = showInstitution;
