import { apiCore } from '@/services/api';
import type { ApiResponse, RuleType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetRulesParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreRuleParams {
    content: string;
    institutionId?: number | null;
}

export interface UpdateRuleParams extends Partial<StoreRuleParams> {
    id: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getRules(
    params: GetRulesParams = {}
): Promise<RuleType[]> {
    const resp = await api.get<RuleType[]>('/master/rule', params);
    return resp.result ?? [];
}

export async function storeRule(
    params: StoreRuleParams
): Promise<ApiResponse<RuleType>> {
    return api.create<RuleType>('/master/rule', params as unknown as Record<string, unknown>, true);
}

export async function updateRule(
    params: UpdateRuleParams
): Promise<ApiResponse<RuleType>> {
    return api.update<RuleType>(`/master/rule/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteRule(id: number | undefined): Promise<ApiResponse<unknown>> {
    return api.delete(`/master/rule/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getRules */ export function get<T = RuleType>(params: GetRulesParams = {}): Promise<T[]> { return getRules(params) as unknown as Promise<T[]>; }
/** @deprecated use storeRule */ export const store = storeRule;
/** @deprecated use updateRule */ export const update = updateRule;
/** @deprecated use deleteRule */ export const destroy = deleteRule;
