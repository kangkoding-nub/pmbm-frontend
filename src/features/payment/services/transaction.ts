import { apiCore } from "@/services/api";
import type { ApiResponseInterface, TransactionType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification = false): Promise<T[]> {
    const result = await api.get<T[]>('/institution/transaction', params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification = false) {
    return await api.create<TransactionType>('/institution/transaction', params, notification).then((r) => r);
}
async function update(params: Record<string, any> = {}) {
    return await api.update<TransactionType>(`/institution/transaction/${params.id}`, params, false).then((r) => r);
}
async function destroy(id: number | undefined) {
    return await api.delete(`/institution/transaction/${id}`, true).then((r) => r);
}
async function dashboard<T>(params: Record<string, any> = {}) {
    const result = await api.get<T>('/dashboard/transaction', params, false).then((v: ApiResponseInterface<T>) => v.result);
    return result !== undefined ? result : undefined;
}
export { get, store, update, destroy, dashboard };
