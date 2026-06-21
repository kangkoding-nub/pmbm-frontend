import type { YearType } from "@/features/master/types";
import type { InstitutionType } from "@/features/institution/types";
export type InstitutionActivityType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    capacity: string,
    brochure?: string,
    file?: FileList
    createdBy?: number,
    updatedBy?: number,
    year?: YearType,
    institution?: InstitutionType,
}