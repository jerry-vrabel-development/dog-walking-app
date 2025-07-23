export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
    error?: string;
}
export interface ApiError {
    error: string;
    statusCode: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}
//# sourceMappingURL=api.d.ts.map