import { apiCore } from "@/services/api";
import type { AnnouncementType } from "@/types";
const api = new apiCore();
export async function get(params: any = {}): Promise<AnnouncementType[]> { return api.get<AnnouncementType[]>("announcement", params).then((v) => v.result || []); }
export async function create(p: Partial<AnnouncementType>): Promise<AnnouncementType | null> { return api.create<AnnouncementType>("announcement", p, true).then((v) => v.result || null); }
export async function update(id: number, p: Partial<AnnouncementType>): Promise<AnnouncementType | null> { return api.update<AnnouncementType>(`announcement/${id}`, p, true).then((v) => v.result || null); }
export async function destroy(id: number): Promise<boolean> { return api.delete(`announcement/${id}`, true).then((r) => r.status === "success"); }
