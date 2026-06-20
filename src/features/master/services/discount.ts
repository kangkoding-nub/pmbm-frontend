import { apiCore } from "@/services/api";
import type { ApiResponseInterface, DiscountType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification = false): Promise<T[]> {
  const r = await api.get<T[]>("/master/discount", params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
  return r !== undefined ? r : [];
}
async function store(params: Record<string, any> = {}) { return await api.create<DiscountType>("/master/discount", params, true).then((r) => r); }
async function update(params: Record<string, any> = {}) { return await api.update<DiscountType>(`/master/discount/${params.id}`, params, true).then((r) => r); }
async function destroy(id: number | undefined) { return await api.delete(`/master/discount/${id}`, true).then((r) => r); }
export { get, store, update, destroy };
