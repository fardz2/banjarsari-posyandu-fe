/**
 * Ortu (Orang Tua) Service
 * Service layer untuk mengelola data orang tua
 */

import api from "../lib/axios";
import type { 
  Ortu, 
  CreateOrtuInput,
  UpdateOrtuInput,
  ApiResponse, 
  PaginatedResponse, 
  PaginationParams 
} from "../types";

// ============================================================================
// CURRENT ORTU (ME) ENDPOINTS
// ============================================================================

/**
 * Get current ortu profile
 * GET /api/v1/ortu/me
 */
export const getCurrentOrtu = async (): Promise<ApiResponse<Ortu>> => {
  return await api.get<ApiResponse<Ortu>>("/ortu/me");
};

/**
 * Update current ortu profile
 * PUT /api/v1/ortu/me
 */
export const updateCurrentOrtu = async (
  data: UpdateOrtuInput
): Promise<ApiResponse<Ortu>> => {
  return await api.put<ApiResponse<Ortu>>("/ortu/me", data);
};

// ============================================================================
// ORTU MANAGEMENT ENDPOINTS
// ============================================================================

/**
 * Get all ortu
 * GET /api/v1/ortu
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const getAllOrtu = async (
  params?: PaginationParams
): Promise<PaginatedResponse<Ortu>> => {
  return await api.get<PaginatedResponse<Ortu>>("/ortu", { params });
};

/**
 * Create ortu
 * POST /api/v1/ortu
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const createOrtu = async (
  data: CreateOrtuInput
): Promise<ApiResponse<Ortu>> => {
  return await api.post<ApiResponse<Ortu>>("/ortu", data);
};

/**
 * Get ortu by ID
 * GET /api/v1/ortu/:id
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const getOrtuById = async (id: number): Promise<ApiResponse<Ortu>> => {
  return await api.get<ApiResponse<Ortu>>(`/ortu/${id}`);
};

/**
 * Update ortu
 * PUT /api/v1/ortu/:id
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const updateOrtu = async (
  id: number,
  data: UpdateOrtuInput
): Promise<ApiResponse<Ortu>> => {
  return await api.put<ApiResponse<Ortu>>(`/ortu/${id}`, data);
};

/**
 * Delete ortu
 * DELETE /api/v1/ortu/:id
 * Roles: SUPER_ADMIN, ADMIN
 */
export const deleteOrtu = async (id: number): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/ortu/${id}`);
};
