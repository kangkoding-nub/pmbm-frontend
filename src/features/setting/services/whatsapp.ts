import { apiCore } from "@/services/api";
import type { ApiResponseInterface, WhatsappType } from "@/types";
const api = new apiCore();
async function get<T>(params: Record<string,any>={}, n=false): Promise<T[]> { const r = await api.get<T[]>("/whatsapp",params,n).then((v:ApiResponseInterface<T[]>)=>v.result); return r??[]; }
async function store(params: Record<string,any>={}, n=true) { return api.create<WhatsappType>("/whatsapp",params,n).then((r)=>r); }
async function show(id: number|undefined): Promise<WhatsappType|undefined> { return api.get<WhatsappType>(`/whatsapp/${id}`,{},false).then((r:ApiResponseInterface<WhatsappType>)=>r.result); }
async function update(params: Record<string,any>={}, n=true) { return api.update<WhatsappType>(`/whatsapp/${params.id}`,params,n).then((r)=>r); }
async function destroy(id: number|undefined, n=true) { return api.delete(`/whatsapp/${id}`,n).then((r)=>r); }
async function login(params: Record<string,any>={}, n=false) { return api.create<any>("/whatsapp/login",params,n).then((r:ApiResponseInterface<any>)=>r.result); }
export { get, store, show, update, destroy, login };
