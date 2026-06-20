import { apiCore } from "@/services/api";
import type { ApiResponseInterface, InvoiceDetailType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification: boolean = false): Promise<T[]> {
    const result = await api.get<T[]>('/invoice/detail', params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = false): Promise<ApiResponseInterface<InvoiceDetailType> | void> {
    return await api.create<InvoiceDetailType>('/invoice/detail', params, notification).then((r) => r);
}
async function show(params: Record<string, any> = {}) {
    return await api.get<InvoiceDetailType>(`/invoice/detail/${params.id}`, params, true).then((r) => r.result);
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.update<InvoiceDetailType>(`/invoice/detail/${params.id}`, params, notification).then((r) => r);
}
async function destroy(id: number | undefined) {
    return await api.delete(`/invoice/detail/${id}`, true).then((r) => r);
}
export { get, store, show, update, destroy };
