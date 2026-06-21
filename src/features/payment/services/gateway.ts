import { apiCore } from '@/services/api';
import type { ApiResponse, GatewayType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetGatewaysParams {
    [key: string]: string | number | boolean | null | undefined;
}

export interface UpdateGatewayParams {
    id?: number;
    provider?: string;
    is_active?: boolean | number;
    mode?: number;
    server_key?: string;
    client_key?: string;
    secret_key?: string;
    callback_token?: string;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getGateways(
    params: GetGatewaysParams = {}
): Promise<GatewayType[]> {
    const resp = await api.get<GatewayType[]>('/payment/gateway', params);
    return resp.result ?? [];
}

export async function updateGateway(
    params: UpdateGatewayParams,
    notification = false
): Promise<ApiResponse<GatewayType>> {
    return api.update<GatewayType>(`/payment/gateway/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getGateways */ export const get = getGateways;
/** @deprecated use updateGateway */ export const update = updateGateway;
