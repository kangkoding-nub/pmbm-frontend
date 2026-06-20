import { apiCore } from "@/services/api";
import type { ApiResponseInterface } from "@/types";
const api = new apiCore();
export type AdminDashboardStats = { totalInstitutions: number; totalStudents: number; totalStudentsOut: number; totalVerified: number; totalUnverified: number; totalBoarding: number; totalNonBoarding: number; boardingBreakdown: Array<{ name: string; count: number; }>; institutions: Array<{ id: number; name: string; totalStudents: number; verified: number; unverified: number; out: number; totalPaid: number; totalUnpaid: number; totalInvoiced: number; }>; recentActivity: Array<{ id: number; name: string; institutionName: string; program: string; created_at: string; verified: boolean; }>; recentPayments: Array<{ id: number; amount: number; date: string; studentName: string; institutionName: string; }>; };
async function getDashboardStats(params: Record<string, any> = {}): Promise<AdminDashboardStats | null> { const r = await api.get<AdminDashboardStats>("/report/admin/stats", params, false).then((v: ApiResponseInterface<AdminDashboardStats>) => v.result); return r ?? null; }
async function updateSystem(): Promise<{ log: string } | null> { const r = await api.create<{ log: string }>("/system/update", {}, true).then((r: any) => r.result); return r ?? null; }
export { getDashboardStats, updateSystem };
