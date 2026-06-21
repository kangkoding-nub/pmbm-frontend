// ---------------------------------------------------------------------------
// Operator dashboard
// ---------------------------------------------------------------------------

import type { StudentBoardingType } from "@/types";

type GenderBreakdown = { all: number; male: number; female: number };

export type DashboardOperatorType = {
    institution: {
        id: number;
        name: string;
        surname: string;
    };
    stats: {
        total: GenderBreakdown;
        verified: GenderBreakdown;
        unverified: GenderBreakdown;
        boarding: GenderBreakdown;
        nonBoarding: GenderBreakdown;
        programs: Array<{
            name: string;
            alias: string;
            total: GenderBreakdown;
        }>;
        out: GenderBreakdown;
    };
    recentStudents: RecentStudent[];
};

export type RecentStudent = {
    id: number;
    name: string;
    program: string;
    gender: number;
    created_at: string;
    verified: boolean;
};

// ---------------------------------------------------------------------------
// Administrator dashboard
// ---------------------------------------------------------------------------

export type AdminInstitutionStat = {
    id: number;
    name: string;
    totalStudents: number;
    verified: number;
    unverified: number;
    out: number;
    totalPaid: number;
    totalUnpaid: number;
    totalInvoiced: number;
};

export type AdminRecentActivity = {
    id: number;
    name: string;
    institutionName: string;
    program: string;
    created_at: string;
    verified: boolean;
};

export type AdminRecentPayment = {
    id: number;
    amount: number;
    date: string;
    studentName: string;
    institutionName: string;
};

export type AdminBoardingBreakdown = {
    name: string;
    count: number;
};

export type AdminDashboardStats = {
    totalInstitutions: number;
    totalStudents: number;
    totalStudentsOut: number;
    totalVerified: number;
    totalUnverified: number;
    totalBoarding: number;
    totalNonBoarding: number;
    boardingBreakdown: AdminBoardingBreakdown[];
    institutions: AdminInstitutionStat[];
    recentActivity: AdminRecentActivity[];
    recentPayments: AdminRecentPayment[];
};

// ---------------------------------------------------------------------------
// System logs
// ---------------------------------------------------------------------------

export type SystemLogUser = {
    id: number;
    name: string;
};

export type SystemLogItem = {
    id: number;
    userId: number | null;
    level: string;
    message: string;
    context: Record<string, unknown>;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    updated_at: string;
    user?: SystemLogUser;
};

export type PaginatedLogs = {
    data: SystemLogItem[];
    total: number;
    last_page: number;
    current_page: number;
    per_page?: number;
};

export interface GetSystemLogsParams {
    page?: number;
    per_page?: number;
    level?: string;
    search?: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface CottageStats {
    totalStudents: number;
    maleStudents: number;
    femaleStudents: number;
    capacity: number;
    programBreakdown: Array<{
        programName: string;
        count: number;
    }>;
    recentRegistrations: Array<StudentBoardingType>;
}