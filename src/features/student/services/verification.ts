import { apiCore } from "@/services/api";
import type { ApiResponseInterface, StudentVerificationType } from "@/types";
const api = new apiCore();
async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentVerificationType[]> {
    const result = await api.get<StudentVerificationType[]>("/student/verification", params, notification).then((v: ApiResponseInterface<StudentVerificationType[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = true) {
    const result = await api.create<StudentVerificationType>("/student/verification", params, notification).then((r) => r.result);
    return result !== undefined ? result : undefined;
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.update<StudentVerificationType>(`/student/verification/${params.id}`, params, notification).then((r) => r.result);
}
async function destroy(id: number | undefined) {
    return await api.delete(`/student/verification/${id}`, true).then((r) => r);
}
export { get, store, update, destroy };
