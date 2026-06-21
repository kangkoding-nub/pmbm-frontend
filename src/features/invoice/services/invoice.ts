import { apiCore } from '@/services/api';
import type { ApiResponse, InvoiceType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetInvoicesParams {
    yearId?: number;
    institutionId?: number;
    userId?: number;
    status?: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreInvoiceParams {
    id?: number;
    yearId?: number;
    institutionId?: number;
    userId?: number;
    reference?: string;
    studentName?: string;
    name: string;
    amount?: number;
    original_amount?: number;
    dueDate?: string;
    status?: string;
    link?: string;
    createdBy?: number;
    updatedBy?: number;
}

export interface UpdateInvoiceParams extends Partial<StoreInvoiceParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getInvoices(
    params: GetInvoicesParams = {}
): Promise<InvoiceType[]> {
    const resp = await api.get<InvoiceType[]>('/invoice', params);
    return resp.result ?? [];
}

export async function showInvoice(
    id: number | string | Record<string, unknown>
): Promise<InvoiceType | undefined> {
    // Backward compat: accept object {id, type} or plain number/string
    let actualId: number | string;
    if (typeof id === 'object' && id !== null) {
        actualId = (id as Record<string, unknown>).id as number | string;
    } else {
        actualId = id;
    }
    const resp = await api.get<InvoiceType>(`/invoice/${actualId}`, {});
    return resp.result;
}

export async function storeInvoice(
    params: StoreInvoiceParams
): Promise<ApiResponse<InvoiceType>> {
    return api.create<InvoiceType>('/invoice', params as unknown as Record<string, unknown>, true);
}

export async function updateInvoice(
    params: UpdateInvoiceParams,
    notification = true
): Promise<ApiResponse<InvoiceType>> {
    return api.update<InvoiceType>(`/invoice/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deleteInvoice(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/invoice/${id}`, true);
}

export async function sendInvoiceWhatsapp(
    id: number | undefined,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.create(`/invoice/${id}/send-whatsapp`, {}, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getInvoices */ export function get<T = InvoiceType>(params: GetInvoicesParams = {}): Promise<T[]> { return getInvoices(params) as unknown as Promise<T[]>; }
/** @deprecated use showInvoice */ export const show = showInvoice;
/** @deprecated use storeInvoice */ export const store = storeInvoice;
/** @deprecated use updateInvoice */ export const update = updateInvoice;
/** @deprecated use deleteInvoice */ export const destroy = deleteInvoice;
/** @deprecated use sendInvoiceWhatsapp */ export const sendWhatsapp = sendInvoiceWhatsapp;
