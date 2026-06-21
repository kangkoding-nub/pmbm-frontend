import { apiCore } from '@/services/api';
import type { ApiResponse, InstitutionAccountType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetAccountsParams {
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreAccountParams {
    id?: number;
    institutionId?: number;
    name: string;
    method: number;
    credit?: number;
    debit?: number;
    balance?: number;
}

export interface UpdateAccountParams extends Partial<StoreAccountParams> {
    id: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getAccounts<T = InstitutionAccountType>(
    params: GetAccountsParams = {}
): Promise<T[]> {
    const resp = await api.get<T[]>('/institution/account', params);
    return resp.result ?? [];
}

export async function storeAccount(
    params: StoreAccountParams
): Promise<ApiResponse<InstitutionAccountType>> {
    return api.create<InstitutionAccountType>('/institution/account', params as unknown as Record<string, unknown>, true);
}

export async function updateAccount(
    params: UpdateAccountParams
): Promise<ApiResponse<InstitutionAccountType>> {
    return api.update<InstitutionAccountType>(`/institution/account/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteAccount(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/institution/account/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getAccounts */ export const get = getAccounts;
/** @deprecated use storeAccount */ export const store = storeAccount;
/** @deprecated use updateAccount */ export const update = updateAccount;
/** @deprecated use deleteAccount */ export const destroy = deleteAccount;
