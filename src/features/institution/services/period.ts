import { apiCore } from "@/services/api";
import type { ApiResponseInterface, InstitutionPeriodType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, n = false): Promise<T[]> { const r = await api.get<T[]>("/institution/period", params, n).then((v: ApiResponseInterface<T[]>) => v.result); return r ?? []; }
async function store(p: Record<string, any> = {}) { return await api.create<InstitutionPeriodType>("/institution/period", p, true).then((r) => r); }
async function update(p: Record<string, any> = {}) { return await api.update<InstitutionPeriodType>(`/institution/period/${p.id}`, p, true).then((r) => r); }
async function destroy(id: number | undefined) { return await api.delete(`/institution/period/${id}`, true).then((r) => r); }
export { get, store, update, destroy };
