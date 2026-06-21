import { apiCore } from '@/services/api';
import type { ApiResponse, StudentVerificationType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetVerificationParams {
    userId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreVerificationParams {
    twins?: number;
    twinsName?: string;
    graduate?: number;
    domicile?: number;
    student?: number;
    teacherSon?: number;
    sibling?: number;
    siblingInstitution?: number;
    siblingName?: string;
    userId?: number;
    id?: number;
}

export interface UpdateVerificationParams extends Partial<StoreVerificationParams> {
    id?: number;
    userId?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getVerification(
    params: GetVerificationParams = {}
): Promise<StudentVerificationType[]> {
    const resp = await api.get<StudentVerificationType[]>('/student/verification', params);
    return resp.result ?? [];
}

export async function storeVerification(
    params: StoreVerificationParams,
    notification = true
): Promise<StudentVerificationType | undefined> {
    const resp = await api.create<StudentVerificationType>('/student/verification', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateVerification(
    params: UpdateVerificationParams,
    notification = true
): Promise<ApiResponse<StudentVerificationType>> {
    return api.update<StudentVerificationType>(`/student/verification/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteVerification(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/verification/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getVerification */ export const get = getVerification;
/** @deprecated use storeVerification */ export const store = storeVerification;
/** @deprecated use updateVerification */ export const update = updateVerification;
