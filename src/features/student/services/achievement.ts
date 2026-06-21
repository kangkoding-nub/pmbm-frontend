import { apiCore } from '@/services/api';
import type { ApiResponse, StudentAchievementType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetAchievementParams {
    userId?: number;
    yearId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreAchievementParams {
    id?: number;
    userId?: number;
    yearId?: number;
    level?: number;
    champ?: number;
    type?: number;
    name?: string;
    file?: File | string;
    image?: File | string;
    createdBy?: number;
    updatedBy?: number;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateAchievementParams extends Partial<StoreAchievementParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getAchievements(
    params: GetAchievementParams = {}
): Promise<StudentAchievementType[]> {
    const resp = await api.get<StudentAchievementType[]>('/student/achievement', params);
    return resp.result ?? [];
}

export async function storeAchievement(
    params: StoreAchievementParams,
    notification = true
): Promise<StudentAchievementType | undefined> {
    const resp = await api.createWithFile<StudentAchievementType>('/student/achievement', params as unknown as Record<string, unknown>, notification);
    return resp.result;
}

export async function updateAchievement(
    params: UpdateAchievementParams,
    notification = true
): Promise<ApiResponse<StudentAchievementType>> {
    return api.updateWithFile<StudentAchievementType>(`/student/achievement/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteAchievement(id: number | undefined): Promise<ApiResponse<unknown>> {
    return api.delete(`/student/achievement/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getAchievements */ export const get = getAchievements;
/** @deprecated use storeAchievement */ export const store = storeAchievement;
/** @deprecated use updateAchievement */ export const update = updateAchievement;
/** @deprecated use deleteAchievement */ export const destroy = deleteAchievement;
