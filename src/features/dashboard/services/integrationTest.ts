import { apiCore } from '@/services/api';
import type { ApiResponse } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface TestMidtransCallbackParams {
    order_id: string;
    status: string;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function testWhatsAppMessage(
    phone: string
): Promise<ApiResponse<unknown>> {
    return api.create('/system/test/whatsapp/message', { phone }, true);
}

export async function testWhatsAppPdf(
    phone: string
): Promise<ApiResponse<unknown>> {
    return api.create('/system/test/whatsapp/pdf', { phone }, true);
}

export async function testMidtrans(
    ref?: string
): Promise<ApiResponse<unknown>> {
    return api.create(
        '/system/test/midtrans',
        ref ? { invoice_reference: ref } : {},
        true
    );
}

export async function testPdfSignature(): Promise<ApiResponse<unknown>> {
    return api.create('/system/test/pdf/signature', {}, true);
}

export async function testMidtransCallback(
    data: TestMidtransCallbackParams
): Promise<ApiResponse<unknown>> {
    return api.create('/system/test/midtrans/callback', data as unknown as Record<string, unknown>, true);
}
