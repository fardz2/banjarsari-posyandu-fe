/**
 * Ibu Hamil Service
 * Service layer untuk mengelola data ibu hamil
 */

import api from "../lib/axios";
import type { 
  IbuHamil,
  CreateIbuHamilInput,
  UpdateIbuHamilInput,
  ApiResponse, 
  PaginatedResponse, 
  PaginationParams 
} from "../types";

// ============================================================================
// IBU HAMIL ENDPOINTS
// ============================================================================

/**
 * Get all ibu hamil with pagination and filters
 * GET /api/v1/ibu-hamil
 * Query params: posyanduId, rw
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const getAllIbuHamil = async (
  params?: PaginationParams & { posyanduId?: number; rw?: string }
): Promise<PaginatedResponse<IbuHamil>> => {
  return await api.get<PaginatedResponse<IbuHamil>>("/ibu-hamil", { params });
};

/**
 * Get ibu hamil by ID
 * GET /api/v1/ibu-hamil/:id
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const getIbuHamilById = async (
  id: number
): Promise<ApiResponse<IbuHamil>> => {
  return await api.get<ApiResponse<IbuHamil>>(`/ibu-hamil/${id}`);
};

/**
 * Create new ibu hamil
 * POST /api/v1/ibu-hamil
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const createIbuHamil = async (
  data: CreateIbuHamilInput
): Promise<ApiResponse<IbuHamil>> => {
  return await api.post<ApiResponse<IbuHamil>>("/ibu-hamil", data);
};

/**
 * Update ibu hamil
 * PUT /api/v1/ibu-hamil/:id
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const updateIbuHamil = async (
  id: number,
  data: UpdateIbuHamilInput
): Promise<ApiResponse<IbuHamil>> => {
  return await api.put<ApiResponse<IbuHamil>>(`/ibu-hamil/${id}`, data);
};

/**
 * Delete ibu hamil
 * DELETE /api/v1/ibu-hamil/:id
 * Roles: SUPER_ADMIN, ADMIN
 */
export const deleteIbuHamil = async (
  id: number
): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/ibu-hamil/${id}`);
};

// Note: Pemeriksaan Ibu Hamil endpoints will be added when backend implements them
