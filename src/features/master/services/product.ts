import { apiCore } from '@/services/api';
import type { ApiResponse, ProductType } from '@/types';

const api = new apiCore();

// ---------------------------------------------------------------------------
// Param types
// ---------------------------------------------------------------------------

export interface GetProductsParams {
    yearId?: number;
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface StoreProductParams {
    id?: number;
    yearId?: number;
    institutionId?: number;
    name: string;
    surname?: string;
    price?: number | null;
    gender?: number;
    programId?: number | null;
    isBoarding?: number | null;
    boardingId?: number | null;
    createdBy?: number;
    updatedBy?: number;
}

export interface UpdateProductParams extends Partial<StoreProductParams> {
    id?: number;
}

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

export async function getProducts(
    params: GetProductsParams = {}
): Promise<ProductType[]> {
    const resp = await api.get<ProductType[]>('/master/product', params);
    return resp.result ?? [];
}

export async function storeProduct(
    params: StoreProductParams
): Promise<ApiResponse<ProductType>> {
    return api.create<ProductType>('/master/product', params as unknown as Record<string, unknown>, true);
}

export async function updateProduct(
    params: UpdateProductParams
): Promise<ApiResponse<ProductType>> {
    return api.update<ProductType>(`/master/product/${params.id}`, params as unknown as Record<string, unknown>, true);
}

export async function deleteProduct(id: number | undefined): Promise<ApiResponse<unknown>> {
    return api.delete(`/master/product/${id}`, true);
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------
/** @deprecated use getProducts */ export function get<T = ProductType>(params: GetProductsParams = {}): Promise<T[]> { return getProducts(params) as unknown as Promise<T[]>; }
/** @deprecated use storeProduct */ export const store = storeProduct;
/** @deprecated use updateProduct */ export const update = updateProduct;
/** @deprecated use deleteProduct */ export const destroy = deleteProduct;
