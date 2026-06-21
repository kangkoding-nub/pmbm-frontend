import { apiCore } from '@/services/api';
import type { ApiResponse } from '@/types';
import type { RoomType } from '@/features/master/types';

const api = new apiCore();

export async function getRooms<T = RoomType>(params: Record<string, string> = {}): Promise<T[]> {
    const resp = await api.get<T[]>('/master/room', params);
    return resp.result ?? [];
}

export async function storeRoom(payload: RoomType): Promise<ApiResponse<RoomType>> {
    return api.create<RoomType>('/master/room', payload as unknown as Record<string, unknown>, true);
}

export async function updateRoom(payload: RoomType): Promise<ApiResponse<RoomType>> {
    return api.update<RoomType>(`/master/room/${payload.id}`, payload as unknown as Record<string, unknown>, true);
}

export async function deleteRoom(id: number|undefined): Promise<ApiResponse<RoomType>> {
    return api.delete(`/master/room/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getRooms */ export const get = getRooms;
