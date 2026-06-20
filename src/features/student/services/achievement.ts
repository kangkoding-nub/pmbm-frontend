import { apiCore } from "@/services/api";
import type { ApiResponseInterface, StudentAchievementType } from "@/types";
const api = new apiCore();
async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentAchievementType[]> {
    const result = await api.get<StudentAchievementType[]>("/student/achievement", params, notification).then((v: ApiResponseInterface<StudentAchievementType[]>) => v.result);
    return result !== undefined ? result : [];
}
async function store(params: Record<string, any> = {}, notification: boolean = true) {
    const result = await api.createWithFile<StudentAchievementType>("/student/achievement", params, notification).then((r) => r.result);
    return result !== undefined ? result : undefined;
}
async function update(params: Record<string, any> = {}, notification: boolean = true) {
    return await api.updateWithFile<StudentAchievementType>(`/student/achievement/${params.id}`, params, notification).then((r) => r.result);
}
async function destroy(id: number | undefined) {
    return await api.delete(`/student/achievement/${id}`, true).then((r) => r);
}
export { get, store, update, destroy };
