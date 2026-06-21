import { apiCore } from '@/services/api';
import type { ApiResponse } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface SendWhatsAppParams {
    frontend_url: string;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

/**
 * Download registration proof PDF and trigger browser download.
 */
export async function downloadRegistrationProof(): Promise<void> {
    const frontendUrl = `${window.location.protocol}//${window.location.host}`;

    try {
        const response = await api.getFile(
            '/student/registration-proof',
            { frontend_url: frontendUrl }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        const contentDisposition = response.headers['content-disposition'] as string | undefined;
        let filename = 'bukti-pendaftaran.pdf';
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+?)"?$/i);
            if (match?.[1]) filename = match[1];
        }

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error: unknown) {
        const msg =
            error instanceof Error
                ? error.message
                : 'Gagal mengunduh bukti pendaftaran';
        throw new Error(msg);
    }
}

/**
 * Send registration proof PDF via WhatsApp to the student.
 */
export async function sendWhatsAppRegistrationProof(
    userId: number | string
): Promise<ApiResponse<unknown>> {
    const frontendUrl = `${window.location.protocol}//${window.location.host}`;
    return api.create(
        `/student/${userId}/send-whatsapp`,
        { frontend_url: frontendUrl } as unknown as Record<string, unknown>,
        false
    );
}
