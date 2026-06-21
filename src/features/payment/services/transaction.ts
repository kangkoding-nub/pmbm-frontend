import { apiCore } from '@/services/api';
import type { ApiResponse, TransactionType, TransactionDashboardType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetTransactionsParams {
    yearId?: number;
    institutionId?: number;
    accountId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreTransactionParams {
    id?: number;
    yearId?: number;
    institutionId?: number;
    accountId?: number;
    paymentId?: number;
    name: string;
    credit?: number;
    debit?: number;
    balance?: number;
    createdBy?: string;
    updatedBy?: string;
    created_at?: string;
    updated_at?: string;
    account?: unknown;
}

export interface UpdateTransactionParams extends Partial<StoreTransactionParams> {
    id?: number;
}

export interface GetTransactionDashboardParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getTransactions(
    params: GetTransactionsParams = {},
    notification = false
): Promise<TransactionType[]> {
    const resp = await api.get<TransactionType[]>('/institution/transaction', params, notification);
    return resp.result ?? [];
}

export async function storeTransaction(
    params: StoreTransactionParams,
    notification = false
): Promise<ApiResponse<TransactionType>> {
    return api.create<TransactionType>('/institution/transaction', params as unknown as Record<string, unknown>, notification);
}

export async function updateTransaction(
    params: UpdateTransactionParams
): Promise<ApiResponse<TransactionType>> {
    return api.update<TransactionType>(`/institution/transaction/${params.id}`, params as unknown as Record<string, unknown>, false);
}

export async function deleteTransaction(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/institution/transaction/${id}`, true);
}

export async function getTransactionDashboard(
    params: GetTransactionDashboardParams = {}
): Promise<TransactionDashboardType | undefined> {
    const resp = await api.get<TransactionDashboardType>('/dashboard/transaction', params);
    return resp.result;
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getTransactions */ export const get = getTransactions;
/** @deprecated use storeTransaction */ export const store = storeTransaction;
/** @deprecated use getTransactionDashboard */ export const dashboard = getTransactionDashboard;
