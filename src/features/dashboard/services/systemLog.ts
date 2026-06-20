import { apiCore } from "@/services/api";
import type { ApiResponseInterface } from "@/types";
const api = new apiCore();
export interface SystemLogItem { id: number; userId: number | null; level: string; message: string; context: any; ip_address: string | null; user_agent: string | null; created_at: string; updated_at: string; user?: { id: number; name: string; }; }
export interface PaginatedLogs { data: SystemLogItem[]; total: number; last_page: number; current_page: number; }
async function getLogs(params: Record<string, any> = {}): Promise<PaginatedLogs | null> { const r = await api.get<PaginatedLogs>("/system/logs", params, false).then((v: ApiResponseInterface<PaginatedLogs>) => v.result); return r ?? null; }
async function deleteLog(id: number | string): Promise<boolean> { return await api.delete(`/system/logs/${id}`, true).then((r: ApiResponseInterface<any>) => r.status === "success"); }
async function clearLogs(): Promise<boolean> { return await api.delete("/system/logs/clear", true).then((r: ApiResponseInterface<any>) => r.status === "success"); }
export { getLogs, deleteLog, clearLogs };
