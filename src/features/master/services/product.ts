import { apiCore } from "@/services/api";
import type { ApiResponseInterface, ProductType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification = false): Promise<T[]> {
  const r = await api.get<T[]>("/master/product", params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
  return r !== undefined ? r : [];
}
async function store(params: Record<string, any> = {}) { return await api.create<ProductType>("/master/product", params, true).then((r) => r); }
async function update(params: Record<string, any> = {}) { return await api.update<ProductType>(`/master/product/${params.id}`, params, true).then((r) => r); }
async function destroy(id: number | undefined) { return await api.delete(`/master/product/${id}`, true).then((r) => r); }
export { get, store, update, destroy };
