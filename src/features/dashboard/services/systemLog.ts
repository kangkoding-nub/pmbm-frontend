import { apiCore } from '@/services/api';
import type { PaginatedLogs, GetSystemLogsParams, SystemLogItem } from '@/features/dashboard/types';

const api = new apiCore();

export async function getLogs(
    params: GetSystemLogsParams = {}
): Promise<PaginatedLogs | undefined> {
    const resp = await api.get<PaginatedLogs>('/system/logs', params);
    return resp.status === 'success' ? resp.result : undefined;
}

export async function deleteLog(id: number | string): Promise<boolean> {
    const resp = await api.delete(`/system/logs/${id}`, true);
    return resp.status === 'success';
}

export async function clearLogs(): Promise<boolean> {
    const resp = await api.delete('/system/logs/clear', true);
    return resp.status === 'success';
}

// Re-export types so consumers can import them from this service file
export type { PaginatedLogs, SystemLogItem };
