import { apiCore } from '@/services/api';
import type { YearType, LandingDataType, RulesDataType, ScheduleData } from '@/types';
import type { GetPublicYearParams, GetPublicLandingParams, GetPublicRulesParams, GetPublicScheduleParams } from '@/features/guest/types';
const api = new apiCore();

export async function getPublicYear(
    params: GetPublicYearParams = {}
): Promise<YearType | undefined> {
    const resp = await api.get<YearType>('public/year', params);
    return resp.result;
}

export async function getPublicLanding(
    params: GetPublicLandingParams = {}
): Promise<LandingDataType | undefined> {
    const resp = await api.get<LandingDataType>('public/landing', params);
    return resp.result;
}

export async function getPublicRules(
    params: GetPublicRulesParams = {}
): Promise<RulesDataType | undefined> {
    const resp = await api.get<RulesDataType>('public/rules', params);
    return resp.result;
}

export async function getPublicSchedule(
    params: GetPublicScheduleParams = {}
): Promise<ScheduleData | undefined> {
    const resp = await api.get<ScheduleData>('public/schedule', params);
    return resp.result;
}

// ---------------------------------------------------------------------------
// Backward-compat aliases (consumers still call year(), rules(), schedule())
// ---------------------------------------------------------------------------
/** @deprecated use getPublicYear */
export function year(params: GetPublicYearParams = {}, _n?: boolean): Promise<YearType | undefined> {
    return getPublicYear(params);
}
/** @deprecated use getPublicLanding */ export const landing = getPublicLanding;
/** @deprecated use getPublicRules */ export const rules = getPublicRules;
/** @deprecated use getPublicSchedule */ export const schedule = getPublicSchedule;
