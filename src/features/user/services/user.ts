import { apiCore } from "@/services/api";
import type { ApiResponseInterface, UserType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string,any>={}, n=false): Promise<T[]> { const r = await api.get<T[]>("/user",params,n).then((v:ApiResponseInterface<T[]>)=>v.result); return r??[]; }
async function store(params: Record<string,any>={}, n=true) { return api.create<UserType>("/user",params,n).then((r)=>r.result); }
async function show(id: number|undefined): Promise<UserType|undefined> { return api.get<UserType>(`/user/${id}`,{},false).then((r:ApiResponseInterface<UserType>)=>r.result); }
async function update(params: Record<string,any>={}, n=true) { return api.update<UserType>(`/user/${params.id}`,params,n).then((r)=>r); }
async function destroy(id: number|undefined, n=true) { return api.delete(`/user/${id}`,n).then((r)=>r); }
export { get, store, show, update, destroy };
