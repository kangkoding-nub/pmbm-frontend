import { apiCore } from "@/services/api";
import type { ApiResponseInterface, StudentFileType } from "@/types";
const api = new apiCore();
async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentFileType[]> {
    const result = await api.get<StudentFileType[]>("/student/file", params, notification).then((v: ApiResponseInterface<StudentFileType[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = true) {
    const result = await api.createWithFile<StudentFileType>("/student/file", params, notification).then((r) => r.result);
    return result !== undefined ? result : undefined;
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.updateWithFile<StudentFileType>(`/student/file/${params.id}`, params, notification).then((r) => r.result);
}
async function destroy(id: number | undefined, notification: boolean = true) {
    return await api.delete(`/student/file/${id}`, notification).then((r) => r);
}
export { get, store, update, destroy };
