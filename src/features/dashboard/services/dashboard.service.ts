import { apiCore } from '@/services/api';
import type { DashboardOperatorType } from '@/features/dashboard/types';

const api = new apiCore();

export async function getDashboardOperator(params: Record<string, number>): Promise<DashboardOperatorType | undefined> {
    const resp = await api.get<DashboardOperatorType>('/dashboard/operator', params);
    console.log(resp.result)
    return resp.status === 'success' ? resp.result : undefined;
}
