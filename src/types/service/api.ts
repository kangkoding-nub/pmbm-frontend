/**
 * Standard API envelope returned by the backend on every request.
 */
export interface ApiResponse<T> {
    status: 'success' | 'error';
    statusMessage: string;
    result?: T;
}

/**
 * Paginated result wrapper for list endpoints that return pagination metadata.
 */
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    current_page: number;
    last_page: number;
    per_page?: number;
}

/**
 * Allowed scalar types for query-string / request params.
 * Prefer this over `Record<string, any>` whenever possible.
 */
export type ApiParams = Record<string, string | number | boolean | null | undefined>;

/**
 * @deprecated Use ApiResponse<T> instead.
 * Kept for backward compatibility during migration.
 */
export type ApiResponseInterface<T> = ApiResponse<T>;

/**
 * @deprecated Use typed params per service instead.
 * Kept for backward compatibility during migration.
 */
export interface ApiRequestInterface<T = ApiParams> {
    params?: T;
    data?: Record<string, unknown>;
    notification?: boolean;
}
