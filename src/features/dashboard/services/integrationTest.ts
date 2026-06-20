import { apiCore } from "@/services/api";
import type { ApiResponseInterface } from "@/types";
const api = new apiCore();
export async function testWhatsAppMessage(phone: string): Promise<ApiResponseInterface<any>> { return api.create("/system/test/whatsapp/message", { phone }, true); }
export async function testWhatsAppPdf(phone: string): Promise<ApiResponseInterface<any>> { return api.create("/system/test/whatsapp/pdf", { phone }, true); }
export async function testMidtrans(ref?: string): Promise<ApiResponseInterface<any>> { return api.create("/system/test/midtrans", ref ? { invoice_reference: ref } : {}, true); }
export async function testPdfSignature(): Promise<ApiResponseInterface<any>> { return api.create("/system/test/pdf/signature", {}, true); }
export async function testMidtransCallback(data: { order_id: string; status: string }): Promise<ApiResponseInterface<any>> { return api.create("/system/test/midtrans/callback", data, true); }
