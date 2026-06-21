import type { InstitutionType } from "@/features/institution/types";

export interface ScheduleItem {
    id: number;
    name: string;
    description: string;
    start: string;
    end: string;
    institution: InstitutionType;
}

export interface ScheduleData {
    status: string;
    year: string;
    schedules: ScheduleItem[];
}
