import { apiCore } from '@/services/api';
import type { InstitutionActivityType } from '@/features/institution/types';
import type { ApiResponse } from '@/types';

const api = new apiCore();

export async function getActivities<T = InstitutionActivityType>(params: Record<string, string>): Promise<T[]> {
    const resp = await api.get<T[]>('/institution/activity', params);
    return resp.result ?? [];
}

export async function storeActivity(payload: InstitutionActivityType): Promise<ApiResponse<InstitutionActivityType>> {
    return api.createWithFile<InstitutionActivityType>('/institution/activity', payload, true);
}

export async function updateActivity(payload: InstitutionActivityType): Promise<ApiResponse<InstitutionActivityType>> {
    return api.updateWithFile<InstitutionActivityType>(`/institution/activity/${payload.id}`, payload, true);
}

export async function deleteActivity(id: number|undefined): Promise<ApiResponse<InstitutionActivityType>> {
    return api.delete(`/institution/activity/${id}`, true);
}
