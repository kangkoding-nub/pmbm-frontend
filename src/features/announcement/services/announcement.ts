import { apiCore } from '@/services/api';
import type { AnnouncementType } from '@/types';
import type { ApiResponse } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetAnnouncementsParams {
    yearId?: number;
    institutionId?: number;
    type?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreAnnouncementParams {
    yearId: number;
    institutionId?: number | null;
    title: string;
    description: string;
    type: number;
}

export interface UpdateAnnouncementParams extends Partial<StoreAnnouncementParams> {
    id: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getAnnouncements(
    params: GetAnnouncementsParams = {}
): Promise<AnnouncementType[]> {
    const resp = await api.get<AnnouncementType[]>('announcement', params);
    return resp.result ?? [];
}

export async function createAnnouncement(
    params: StoreAnnouncementParams
): Promise<ApiResponse<AnnouncementType>> {
    return api.create<AnnouncementType>('announcement', params as unknown as Record<string, unknown>, true);
}

export async function updateAnnouncement(
    id: number,
    params: Partial<StoreAnnouncementParams>
): Promise<ApiResponse<AnnouncementType>> {
    return api.update<AnnouncementType>(`announcement/${id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteAnnouncement(id: number): Promise<boolean> {
    const resp = await api.delete(`announcement/${id}`, true);
    return resp.status === 'success';
}

// ---------------------------------------------------------------------------
// Backward-compat aliases (consumers still use old names)
// ---------------------------------------------------------------------------
/** @deprecated use getAnnouncements */ export const get = getAnnouncements;
/** @deprecated use deleteAnnouncement */ export const destroy = deleteAnnouncement;
/** @deprecated use createAnnouncement */ export const create = createAnnouncement;
/** @deprecated use updateAnnouncement */
export function update(id_or_data: number | AnnouncementType, params?: Partial<StoreAnnouncementParams>): Promise<ApiResponse<AnnouncementType>> {
    if (typeof id_or_data === 'number') {
        return updateAnnouncement(id_or_data, params ?? {});
    }
    // called as update(data) — extract id from object
    const { id, ...rest } = id_or_data as AnnouncementType & { id: number };
    return updateAnnouncement(id, rest as Partial<StoreAnnouncementParams>);
}
