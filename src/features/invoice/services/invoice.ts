import { apiCore } from "@/services/api";
import type { ApiResponseInterface, InvoiceType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification: boolean = false): Promise<T[]> {
    const result = await api.get<T[]>('/invoice', params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}) {
    return await api.create<InvoiceType>('/invoice', params, true).then((r) => r);
}
async function show<T = InvoiceType>(params: Record<string, any> = {}) {
    return await api.get<T>(`/invoice/${params.id}`, params, true).then((r) => r.result);
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.update<InvoiceType>(`/invoice/${params.id}`, params, notification).then((r) => r);
}
async function destroy(id: number | undefined) {
    return await api.delete(`/invoice/${id}`, true).then((r) => r);
}
async function sendWhatsapp(id: number | undefined, notification: boolean = true) {
    return await api.create(`/invoice/${id}/send-whatsapp`, {}, notification).then((r) => r);
}
export { get, store, show, update, destroy, sendWhatsapp };
