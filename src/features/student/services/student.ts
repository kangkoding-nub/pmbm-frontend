import { apiCore } from '@/services/api';
import type {
    StudentDashboardType,
    StudentInvoiceType,
    StudentBoardingType,
} from '@/types';
import type { ApiResponse } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetStudentDashboardParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface GetStudentInvoiceParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface GetStudentBoardingParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface GetStudentTreasurerParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface UpdateStudentProgramParams {
    programId?: number;
    boardingId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function studentDashboard(
    params: GetStudentDashboardParams = {}
): Promise<StudentDashboardType | undefined> {
    const resp = await api.get<StudentDashboardType>('/student/dashboard', params);
    return resp.result;
}

export async function studentTreasurer<T>(
    params: GetStudentTreasurerParams = {}
): Promise<T[]> {
    const resp = await api.get<T[]>('/student/treasurer', params);
    return resp.result ?? [];
}

export async function studentInvoice(
    params: GetStudentInvoiceParams = {}
): Promise<StudentInvoiceType[]> {
    const resp = await api.get<StudentInvoiceType[]>('/student/invoice', params);
    return resp.result ?? [];
}

export async function studentBoarding(
    params: GetStudentBoardingParams = {}
): Promise<StudentBoardingType[]> {
    const resp = await api.get<StudentBoardingType[]>('/student/boarding', params);
    return resp.result ?? [];
}

export async function updateStudentProgram(
    id: number,
    params: UpdateStudentProgramParams,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.update(`/student/program/${id}`, params as unknown as Record<string, unknown>, notification);
}
