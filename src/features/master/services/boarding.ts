import { apiCore } from "@/services/api";
import type { ApiResponseInterface, BoardingType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, notification = false): Promise<T[]> {
  const r = await api.get<T[]>("/master/boarding", params, notification).then((v: ApiResponseInterface<T[]>) => v.result);
  return r !== undefined ? r : [];
}
async function store(params: Record<string, any> = {}) { return await api.create<BoardingType>("/master/boarding", params, true).then((r) => r); }
async function update(params: Record<string, any> = {}) { return await api.update<BoardingType>(`/master/boarding/${params.id}`, params, true).then((r) => r); }
async function destroy(id: number | undefined) { return await api.delete(`/master/boarding/${id}`, true).then((r) => r); }
export { get, store, update, destroy };
