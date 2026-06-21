import { apiCore } from '@/services/api';
import type { ApiResponse, InvoiceDetailType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetInvoiceDetailsParams {
    invoiceId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreInvoiceDetailParams {
    id?: number;
    invoiceId?: number;
    productId?: number;
    name: string;
    price?: number;
    discount?: number;
    amount?: number;
}

export interface UpdateInvoiceDetailParams extends Partial<StoreInvoiceDetailParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getInvoiceDetails(
    params: GetInvoiceDetailsParams = {}
): Promise<InvoiceDetailType[]> {
    const resp = await api.get<InvoiceDetailType[]>('/invoice/detail', params);
    return resp.result ?? [];
}

export async function showInvoiceDetail(
    id: number
): Promise<InvoiceDetailType | undefined> {
    const resp = await api.get<InvoiceDetailType>(`/invoice/detail/${id}`, {});
    return resp.result;
}

export async function storeInvoiceDetail(
    params: StoreInvoiceDetailParams,
    notification = false
): Promise<ApiResponse<InvoiceDetailType>> {
    return api.create<InvoiceDetailType>('/invoice/detail', params as unknown as Record<string, unknown>, notification);
}

export async function updateInvoiceDetail(
    params: UpdateInvoiceDetailParams,
    notification = true
): Promise<ApiResponse<InvoiceDetailType>> {
    return api.update<InvoiceDetailType>(`/invoice/detail/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteInvoiceDetail(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/invoice/detail/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getInvoiceDetails */ export function get<T = InvoiceDetailType>(params: GetInvoiceDetailsParams = {}): Promise<T[]> { return getInvoiceDetails(params) as unknown as Promise<T[]>; }
/** @deprecated use storeInvoiceDetail */ export const store = storeInvoiceDetail;
/** @deprecated use updateInvoiceDetail */ export const update = updateInvoiceDetail;
/** @deprecated use deleteInvoiceDetail */ export const destroy = deleteInvoiceDetail;
