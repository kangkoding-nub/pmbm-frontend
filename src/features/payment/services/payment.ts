import { apiCore } from "@/services/api";
import type { ApiResponseInterface, PaymentType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification: boolean = false): Promise<T[]> {
    const result = await api.get<T[]>('/payment', params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}) { return await api.create<any>('/payment', params, false).then((r) => r); }
async function show(params: Record<string, any> = {}) { return await api.get<PaymentType>(`/payment/${params.id}`, params, true).then((r) => r.result); }
async function update(params: Record<string, any> = {}, notification: boolean = true): Promise<ApiResponseInterface<PaymentType>> {
    return await api.update<PaymentType>(`/payment/${params.id}`, params, notification).then((r) => r);
}
async function destroy(id: number | undefined) { return await api.delete(`/invoice/${id}`, true).then((r) => r); }
async function cash(params: Record<string, any> = {}) { return await api.create<any>('/payment/cash', params, true).then((r) => r); }
async function sendWhatsapp(id: number | undefined, notification: boolean = true) { return await api.create<any>(`/payment/${id}/send-whatsapp`, {}, notification).then((r) => r); }
async function getActiveGateway() { return await api.get<any>('/payment/active-gateway', {}, false).then((r) => r.result); }
export { get, store, show, update, destroy, cash, getActiveGateway, sendWhatsapp };
