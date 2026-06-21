import { apiCore } from '@/services/api';
import type { ApiResponse } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function generateReceipt(
    paymentId: number,
    frontendUrl?: string
): Promise<Blob> {
    const params = frontendUrl ? { frontend_url: frontendUrl } : undefined;
    const response = await api.getFile(`/payment/${paymentId}/generate-receipt`, params);
    return response.data;
}

export async function downloadReceipt(
    paymentId: number,
    frontendUrl?: string
): Promise<Blob> {
    const params = frontendUrl ? { frontend_url: frontendUrl } : undefined;
    const response = await api.getFile(`/payment/${paymentId}/download-receipt`, params);
    return response.data;
}

export async function downloadAllReceipts(
    frontendUrl?: string
): Promise<Blob> {
    const params = frontendUrl ? { frontend_url: frontendUrl } : undefined;
    const response = await api.getFile('/payment/download-all-receipts', params);
    return response.data;
}

export async function verifyReceipt(
    token: string
): Promise<ApiResponse<unknown>> {
    return api.get<unknown>(`/verify-receipt/${token}`, {});
}
