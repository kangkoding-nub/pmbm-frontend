import { apiCore } from '@/services/api';
import type { AdminDashboardStats, GetDashboardParams } from '@/features/dashboard/types';

const api = new apiCore();

export async function getDashboardStats(
    params: GetDashboardParams = {}
): Promise<AdminDashboardStats | undefined> {
    const resp = await api.get<AdminDashboardStats>('/report/admin/stats', params);
    return resp.status === 'success' ? resp.result : undefined;
}

export async function updateSystem(): Promise<{ log: string } | undefined> {
    const resp = await api.create<{ log: string }>('/system/update', {}, true);
    return resp.status === 'success' ? resp.result : undefined;
}

// Re-export type so consumers can import from this service file
export type { AdminDashboardStats };
