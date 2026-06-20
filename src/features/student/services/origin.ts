import { apiCore } from "@/services/api";
import type { ApiResponseInterface, StudentOriginType } from "@/types";
const api = new apiCore();
async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentOriginType[]> {
    const result = await api.get<StudentOriginType[]>("/student/origin", params, notification).then((v: ApiResponseInterface<StudentOriginType[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = true) {
    const result = await api.create<StudentOriginType>("/student/origin", params, notification).then((r) => r.result);
    return result !== undefined ? result : undefined;
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.update<StudentOriginType>(`/student/origin/${params.id}`, params, notification).then((r) => r.result);
}
async function destroy(id: number | undefined, notification: boolean = true) {
    return await api.delete(`/student/origin/${id}`, notification).then((r) => r);
}
export { get, store, update, destroy };
