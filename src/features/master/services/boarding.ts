import { apiCore } from '@/services/api';
import type { ApiResponse, BoardingType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetBoardingsParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreBoardingParams {
    id?: number;
    yearId?: number;
    institutionId?: number;
    name: string;
    surname?: string;
    description?: string;
}

export interface UpdateBoardingParams extends Partial<StoreBoardingParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getBoardings(
    params: GetBoardingsParams = {}
): Promise<BoardingType[]> {
    const resp = await api.get<BoardingType[]>('/master/boarding', params);
    return resp.result ?? [];
}

export async function storeBoarding(
    params: StoreBoardingParams
): Promise<ApiResponse<BoardingType>> {
    return api.create<BoardingType>('/master/boarding', params as unknown as Record<string, unknown>, true);
}

export async function updateBoarding(
    params: UpdateBoardingParams
): Promise<ApiResponse<BoardingType>> {
    return api.update<BoardingType>(`/master/boarding/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteBoarding(id: number | undefined): Promise<ApiResponse<unknown>> {
    return api.delete(`/master/boarding/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getBoardings */ export function get<T = BoardingType>(params: GetBoardingsParams = {}): Promise<T[]> { return getBoardings(params) as unknown as Promise<T[]>; }
/** @deprecated use storeBoarding */ export const store = storeBoarding;
/** @deprecated use updateBoarding */ export const update = updateBoarding;
/** @deprecated use deleteBoarding */ export const destroy = deleteBoarding;
