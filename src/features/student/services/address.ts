import { apiCore } from "@/services/api";
import type { ApiResponseInterface, StudentAddressType } from "@/types";
const api = new apiCore();
async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentAddressType[]> {
    const baseUrl = "/student/address";
    const result = await api.get<StudentAddressType[]>(baseUrl, params, notification).then((value: ApiResponseInterface<StudentAddressType[]>) => value.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = true) {
    const result = await api.create<StudentAddressType>("/student/address", params, notification).then((resp) => resp.result);
    return result !== undefined ? result : undefined;
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.update<StudentAddressType>(`/student/address/${params.id}`, params, notification).then((resp) => resp.result);
}
async function destroy(id: number | undefined, notification: boolean = true) {
    return await api.delete(`/student/address/${id}`, notification).then((resp) => resp);
}
export { get, store, update, destroy };
