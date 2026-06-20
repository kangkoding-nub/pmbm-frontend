import { apiCore } from "@/services/api";
import type { ApiResponseInterface, StudentProgramType } from "@/types";
const api = new apiCore();
async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentProgramType[]> {
    const result = await api.get<StudentProgramType[]>("/student/program", params, notification).then((v: ApiResponseInterface<StudentProgramType[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = true) {
    const result = await api.create<StudentProgramType>("/student/program", params, notification).then((r) => r.result);
    return result !== undefined ? result : undefined;
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.update<StudentProgramType>(`/student/program/${params.id}`, params, notification).then((r) => r.result);
}
async function destroy(id: number | undefined, notification: boolean = true) {
    return await api.delete(`/student/program/${id}`, notification).then((r) => r);
}
export { get, store, update, destroy };
