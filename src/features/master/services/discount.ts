import { apiCore } from '@/services/api';
import type { ApiResponse, DiscountType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetDiscountsParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreDiscountParams {
    yearId: number;
    institutionId: number;
    name: string;
    amount: number;
    type: number;
}

export interface UpdateDiscountParams extends Partial<StoreDiscountParams> {
    id: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getDiscounts(
    params: GetDiscountsParams = {}
): Promise<DiscountType[]> {
    const resp = await api.get<DiscountType[]>('/master/discount', params);
    return resp.result ?? [];
}

export async function storeDiscount(
    params: StoreDiscountParams
): Promise<ApiResponse<DiscountType>> {
    return api.create<DiscountType>('/master/discount', params as unknown as Record<string, unknown>, true);
}

export async function updateDiscount(
    params: UpdateDiscountParams
): Promise<ApiResponse<DiscountType>> {
    return api.update<DiscountType>(`/master/discount/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteDiscount(id: number): Promise<ApiResponse<unknown>> {
    return api.delete(`/master/discount/${id}`, true);
}
