/**
 * Posyandu Service
 * Service layer untuk mengelola data posyandu
 */

import api from "../lib/axios";
import type { 
  Posyandu,
  CreatePosyanduInput,
  UpdatePosyanduInput,
  ApiResponse, 
  PaginatedResponse, 
  PaginationParams 
} from "../types";

// ============================================================================
// POSYANDU ENDPOINTS
// ============================================================================

/**
 * Get all posyandu with pagination
 * GET /api/v1/posyandu
 * Roles: All authenticated users
 */
export const getAllPosyandu = async (
  params?: PaginationParams
): Promise<PaginatedResponse<Posyandu>> => {
  return await api.get<PaginatedResponse<Posyandu>>("/posyandu", { params });
};

/**
 * Get posyandu by ID
 * GET /api/v1/posyandu/:id
 * Roles: All authenticated users
 */
export const getPosyanduById = async (
  id: number
): Promise<ApiResponse<Posyandu>> => {
  return await api.get<ApiResponse<Posyandu>>(`/posyandu/${id}`);
};

/**
 * Create new posyandu
 * POST /api/v1/posyandu
 * Roles: SUPER_ADMIN only
 */
export const createPosyandu = async (
  data: CreatePosyanduInput
): Promise<ApiResponse<Posyandu>> => {
  return await api.post<ApiResponse<Posyandu>>("/posyandu", data);
};

/**
 * Update posyandu
 * PUT /api/v1/posyandu/:id
 * Roles: SUPER_ADMIN only
 */
export const updatePosyandu = async (
  id: number,
  data: UpdatePosyanduInput
): Promise<ApiResponse<Posyandu>> => {
  return await api.put<ApiResponse<Posyandu>>(`/posyandu/${id}`, data);
};

/**
 * Delete posyandu
 * DELETE /api/v1/posyandu/:id
 * Roles: SUPER_ADMIN only
 */
export const deletePosyandu = async (
  id: number
): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/posyandu/${id}`);
};
