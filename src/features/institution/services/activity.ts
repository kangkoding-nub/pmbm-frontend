import { apiCore } from "@/services/api";
import type { ApiResponseInterface, InstitutionActivityType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, n = false): Promise<T[]> { const r = await api.get<T[]>("/institution/activity", params, n).then((v: ApiResponseInterface<T[]>) => v.result); return r ?? []; }
async function store(p: Record<string, any> = {}) { return await api.createWithFile<InstitutionActivityType>("/institution/activity", p, true).then((r) => r); }
async function update(p: Record<string, any> = {}) { return await api.updateWithFile<InstitutionActivityType>(`/institution/activity/${p.id}`, p, true).then((r) => r); }
async function destroy(id: number | undefined) { return await api.delete(`/institution/activity/${id}`, true).then((r) => r); }
export { get, store, update, destroy };
