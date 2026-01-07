/**
 * Generic API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string | string[]>;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string | string[]>;
  statusCode?: number;
}

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated API Response
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

/**
 * Query Parameters for Pagination
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string; // For forum filtering
  posyanduId?: string | number; // For forum filtering
}



/**
 * Generic List Response (without pagination)
 */
export interface ListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}
