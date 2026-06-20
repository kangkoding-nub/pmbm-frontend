import { apiCore } from "@/services/api";
import type { ApiResponseInterface, GatewayType } from "@/types";

const api = new apiCore();

export async function get(
    params: Record<string, any> = {},
    notification: boolean = false
): Promise<GatewayType[]> {
    const result = await api
        .get<GatewayType[]>("/payment/gateway", params, notification)
        .then((v: ApiResponseInterface<GatewayType[]>) => v.result);
    return result !== undefined ? result : [];
}

export async function update(
    params: Record<string, any> = {},
    notification: boolean = false
) {
    return await api
        .update<GatewayType>(`/payment/gateway/${params.id}`, params, notification)
        .then((r) => r);
}