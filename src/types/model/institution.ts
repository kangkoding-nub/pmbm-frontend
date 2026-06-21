import type { OptionsType } from "@/types";
import type { YearType } from "@/features/master/types";

/**
 * Re-export the canonical InstitutionType from the institution feature
 * so that other models (payment, student, user, whatsapp) can still
 * import it from "@/types" without breaking.
 */
export type {
    InstitutionType,
    InstitutionFormType,
} from "@/features/institution/types";

export type InstitutionActivityType = {
    id?: number | undefined;
    yearId: number | undefined;
    institutionId: number | string | undefined;
    capacity: string;
    brochure?: string;
    file?: FileList;
    createdBy?: number | undefined;
    updatedBy?: number | undefined;
    year?: YearType | undefined;
    institution?: import("@/features/institution/types").InstitutionType | undefined;
};

export type InstitutionActivityFormType = {
    id?: number | undefined;
    yearId: number | undefined;
    institutionId: number | string | undefined;
    capacity: string;
    file?: FileList;
};

export type InstitutionProgramType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    name: string;
    alias: string;
    description: string;
    boarding: string;
    createdBy?: string;
    updatedBy?: string;
};

export type InstitutionProgramFormType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    name: string;
    alias: string;
    description: string;
    boarding: OptionsType[];
};

export type InstitutionPeriodType = {
    id?: number | undefined;
    yearId: number | undefined;
    institutionId: number | string | undefined;
    name: string;
    description: string | undefined;
    start: string | undefined;
    end: string | undefined;
    createdBy?: string;
    updatedBy?: string;
};

export type InstitutionPeriodFormType = {
    id?: number | undefined;
    yearId: number | undefined;
    institutionId: number | string | undefined;
    name: string;
    description: string | undefined;
    start: Date | undefined;
    end: Date | undefined;
};

export type InstitutionAccountType = {
    id?: number | undefined;
    institutionId: number | undefined;
    name: string;
    credit?: number;
    debit?: number;
    balance?: number;
    method: number;
};

export type TransactionType = {
    id?: number | undefined;
    yearId?: number | undefined;
    institutionId?: number | undefined;
    accountId?: number | undefined;
    paymentId?: number | undefined;
    name: string;
    credit?: number;
    debit?: number;
    balance?: number;
    createdBy?: string;
    updatedBy?: string;
    created_at?: string;
    updated_at?: string;
    account?: Partial<InstitutionAccountType>;
};

export type TransactionDashboardType = {
    balance: number;
    credit: number;
    debit: number;
    cash: number;
    nonCash: number;
};
