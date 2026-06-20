import { apiCore } from "@/services/api";

const api = new apiCore();

export const generateReceipt = async (
    paymentId: number,
    frontendUrl?: string
): Promise<Blob> => {
    const url =
        `/payment/${paymentId}/generate-receipt` +
        (frontendUrl ? `?frontend_url=${encodeURIComponent(frontendUrl)}` : "");
    return (await api.getFile(url)).data;
};

export const downloadReceipt = async (
    paymentId: number,
    frontendUrl?: string
): Promise<Blob> => {
    const url =
        `/payment/${paymentId}/download-receipt` +
        (frontendUrl ? `?frontend_url=${encodeURIComponent(frontendUrl)}` : "");
    return (await api.getFile(url)).data;
};

export const downloadAllReceipts = async (
    frontendUrl?: string
): Promise<Blob> => {
    const url =
        `/payment/download-all-receipts` +
        (frontendUrl ? `?frontend_url=${encodeURIComponent(frontendUrl)}` : "");
    return (await api.getFile(url)).data;
};

export const verifyReceipt = (token: string) =>
    api.get<any>(`/verify-receipt/${token}`, {}, false);