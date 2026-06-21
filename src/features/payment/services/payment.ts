import { apiCore } from '@/services/api';
import type { ApiResponse, PaymentType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetPaymentsParams {
    yearId?: number;
    institutionId?: number;
    status?: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StorePaymentParams {
    reference: string;
    code?: string;
    amount: number;
    studentName?: string;
    userEmail?: string;
    userPhone?: string;
}

export interface UpdatePaymentParams extends Partial<StorePaymentParams> {
    id: number;
}

export interface CashPaymentParams {
    invoiceId: number;
    amount: number;
    [key: string]: string | number | boolean | null | undefined;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getPayments(
    params: GetPaymentsParams = {}
): Promise<PaymentType[]> {
    const resp = await api.get<PaymentType[]>('/payment', params);
    return resp.result ?? [];
}

export async function showPayment(
    id: number
): Promise<PaymentType | undefined> {
    const resp = await api.get<PaymentType>(`/payment/${id}`, {});
    return resp.result;
}

export async function storePayment(
    params: StorePaymentParams
): Promise<ApiResponse<unknown>> {
    return api.create<unknown>('/payment', params as unknown as Record<string, unknown>, false);
}

export async function updatePayment(
    params: UpdatePaymentParams,
    notification = true
): Promise<ApiResponse<PaymentType>> {
    return api.update<PaymentType>(`/payment/${params.id}`, params as unknown as Record<string, unknown>, notification);
}

export async function deletePayment(id: number): Promise<ApiResponse<unknown>> {
    // Note: intentionally uses invoice endpoint — matches original behaviour
    return api.delete(`/invoice/${id}`, true);
}

export async function cashPayment(
    params: CashPaymentParams
): Promise<ApiResponse<unknown>> {
    return api.create<unknown>('/payment/cash', params as unknown as Record<string, unknown>, true);
}

export async function getActiveGateway(): Promise<unknown | undefined> {
    const resp = await api.get<unknown>('/payment/active-gateway', {});
    return resp.result;
}

export async function sendPaymentWhatsapp(
    id: number,
    notification = true
): Promise<ApiResponse<unknown>> {
    return api.create<unknown>(`/payment/${id}/send-whatsapp`, {}, notification);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getPayments */ export function get<T = PaymentType>(params: GetPaymentsParams = {}): Promise<T[]> { return getPayments(params) as unknown as Promise<T[]>; }
/** @deprecated use storePayment */ export const store = storePayment;
/** @deprecated use cashPayment */ export const cash = cashPayment;
/** @deprecated use sendPaymentWhatsapp */ export const sendWhatsapp = sendPaymentWhatsapp;
