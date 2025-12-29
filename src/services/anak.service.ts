

/**
 * Anak Service
 * Service layer untuk mengelola data anak
 */

import api from "../lib/axios";
import type { Anak, ApiResponse, PaginatedResponse, PaginationParams, Pengukuran } from "../types";

// Get all anak with pagination
export const getAllAnak = async (params?: PaginationParams): Promise<PaginatedResponse<Anak>> => {
  const response = await api.get<PaginatedResponse<Anak>>("/anak", { params });
  return response;
};

// Get anak by ID
export const getAnakById = async (id: string): Promise<ApiResponse<Anak>> => {
  const response = await api.get<ApiResponse<Anak>>(`/anak/${id}`);
  return response;
};

// Create new anak
export const createAnak = async (data: Partial<Anak>): Promise<ApiResponse<Anak>> => {
  const response = await api.post<ApiResponse<Anak>>("/anak", data);
  return response;
};

// Update anak
export const updateAnak = async (id: string, data: Partial<Anak>): Promise<ApiResponse<Anak>> => {
  const response = await api.put<ApiResponse<Anak>>(`/anak/${id}`, data);
  return response;
};

// Delete anak
export const deleteAnak = async (id: string): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/anak/${id}`);
};

/**
 * Pengukuran Service
 * Service layer untuk mengelola data pengukuran anak
 */

// Get pengukuran by anak ID
export const getPengukuranByAnakId = async (anakId: string): Promise<ApiResponse<Pengukuran[]>> => {
  const response = await api.get<ApiResponse<Pengukuran[]>>(`/pengukuran/anak/${anakId}`);
  return response;
};

// Get pengukuran by ID
export const getPengukuranById = async (id: string): Promise<ApiResponse<Pengukuran>> => {
  const response = await api.get<ApiResponse<Pengukuran>>(`/pengukuran/${id}`);
  return response;
};

// Create new pengukuran
export const createPengukuran = async (data: Partial<Pengukuran>): Promise<ApiResponse<Pengukuran>> => {
  const response = await api.post<ApiResponse<Pengukuran>>("/pengukuran", data);
  return response;
};

// Update pengukuran
export const updatePengukuran = async (id: string, data: Partial<Pengukuran>): Promise<ApiResponse<Pengukuran>> => {
  const response = await api.put<ApiResponse<Pengukuran>>(`/pengukuran/${id}`, data);
  return response;
};

// Delete pengukuran
export const deletePengukuran = async (id: string): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/pengukuran/${id}`);
};
