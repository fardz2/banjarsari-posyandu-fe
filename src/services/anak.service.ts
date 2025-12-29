/**
 * Anak Service
 * Service layer untuk mengelola data anak dan pengukuran
 */

import api from "../lib/axios";
import type { 
  Anak, 
  CreateAnakInput,
  UpdateAnakInput,
  Pengukuran,
  CreatePengukuranInput,
  UpdatePengukuranInput,
  ApiResponse, 
  PaginatedResponse, 
  PaginationParams 
} from "../types";

// ============================================================================
// ANAK ENDPOINTS
// ============================================================================

/**
 * Get my children (for ORANG_TUA role)
 * GET /api/v1/anak/my-children
 */
export const getMyChildren = async (): Promise<ApiResponse<Anak[]>> => {
  return await api.get<ApiResponse<Anak[]>>("/anak/my-children");
};

/**
 * Get all anak with pagination and filters
 * GET /api/v1/anak
 * Query params: posyanduId, rw
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const getAllAnak = async (
  params?: PaginationParams & { posyanduId?: number; rw?: string }
): Promise<PaginatedResponse<Anak>> => {
  return await api.get<PaginatedResponse<Anak>>("/anak", { params });
};

/**
 * Get anak by NIK
 * GET /api/v1/anak/:nik
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const getAnakByNik = async (nik: string): Promise<ApiResponse<Anak>> => {
  return await api.get<ApiResponse<Anak>>(`/anak/${nik}`);
};

/**
 * Create new anak
 * POST /api/v1/anak
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const createAnak = async (
  data: CreateAnakInput
): Promise<ApiResponse<Anak>> => {
  return await api.post<ApiResponse<Anak>>("/anak", data);
};

/**
 * Update anak
 * PUT /api/v1/anak/:nik
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const updateAnak = async (
  nik: string,
  data: UpdateAnakInput
): Promise<ApiResponse<Anak>> => {
  return await api.put<ApiResponse<Anak>>(`/anak/${nik}`, data);
};

/**
 * Delete anak
 * DELETE /api/v1/anak/:nik
 * Roles: SUPER_ADMIN, ADMIN
 */
export const deleteAnak = async (nik: string): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/anak/${nik}`);
};

// ============================================================================
// PENGUKURAN ENDPOINTS
// ============================================================================

/**
 * Get all pengukuran with filters
 * GET /api/v1/pengukuran
 * Query params: anakNik, startDate, endDate
 */
export const getAllPengukuran = async (
  params?: PaginationParams & { 
    anakNik?: string; 
    startDate?: string; 
    endDate?: string;
  }
): Promise<PaginatedResponse<Pengukuran>> => {
  return await api.get<PaginatedResponse<Pengukuran>>("/pengukuran", { params });
};

/**
 * Get pengukuran by anak NIK
 * GET /api/v1/pengukuran/anak/:nik
 */
export const getPengukuranByAnakNik = async (
  nik: string
): Promise<ApiResponse<Pengukuran[]>> => {
  return await api.get<ApiResponse<Pengukuran[]>>(`/pengukuran/anak/${nik}`);
};

/**
 * Get pengukuran by ID
 * GET /api/v1/pengukuran/:id
 */
export const getPengukuranById = async (
  id: number
): Promise<ApiResponse<Pengukuran>> => {
  return await api.get<ApiResponse<Pengukuran>>(`/pengukuran/${id}`);
};

/**
 * Create new pengukuran
 * POST /api/v1/pengukuran
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const createPengukuran = async (
  data: CreatePengukuranInput
): Promise<ApiResponse<Pengukuran>> => {
  return await api.post<ApiResponse<Pengukuran>>("/pengukuran", data);
};

/**
 * Update pengukuran
 * PUT /api/v1/pengukuran/:id
 * Roles: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
 */
export const updatePengukuran = async (
  id: number,
  data: UpdatePengukuranInput
): Promise<ApiResponse<Pengukuran>> => {
  return await api.put<ApiResponse<Pengukuran>>(`/pengukuran/${id}`, data);
};

/**
 * Delete pengukuran
 * DELETE /api/v1/pengukuran/:id
 * Roles: SUPER_ADMIN, ADMIN
 */
export const deletePengukuran = async (
  id: number
): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/pengukuran/${id}`);
};
