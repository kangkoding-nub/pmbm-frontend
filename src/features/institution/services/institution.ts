import { apiCore } from "@/services/api";
import type { ApiResponseInterface, InstitutionType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string, any> = {}, n = false): Promise<T[]> { const r = await api.get<T[]>("/institution", params, n).then((v: ApiResponseInterface<T[]>) => v.result); return r ?? []; }
async function store(p: Record<string, any> = {}) { return await api.createWithFile<InstitutionType>("/institution", p, true).then((r) => r); }
async function show(p: Record<string, any> = {}) { return await api.get<InstitutionType>(`/institution/${p.id}`, p, true).then((r) => r.result); }
async function update(p: Record<string, any> = {}) { return await api.updateWithFile<InstitutionType>(`/institution/${p.id}`, p, true).then((r) => r); }
async function destroy(id: number | undefined) { return await api.delete(`/institution/${id}`, true).then((r) => r); }
export { get, store, show, update, destroy };
