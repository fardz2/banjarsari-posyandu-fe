

/**
 * Ibu Hamil Service
 * Service layer untuk mengelola data ibu hamil
 */

import api from "../lib/axios";
import type { ApiResponse, IbuHamil, PaginatedResponse, PaginationParams, PemeriksaanIbuHamil } from "../types";

// Get all ibu hamil with pagination
export const getAllIbuHamil = async (params?: PaginationParams): Promise<PaginatedResponse<IbuHamil>> => {
  const response = await api.get<PaginatedResponse<IbuHamil>>("/ibu-hamil", { params });
  return response;
};

// Get ibu hamil by ID
export const getIbuHamilById = async (id: string): Promise<ApiResponse<IbuHamil>> => {
  const response = await api.get<ApiResponse<IbuHamil>>(`/ibu-hamil/${id}`);
  return response;
};

// Create new ibu hamil
export const createIbuHamil = async (data: Partial<IbuHamil>): Promise<ApiResponse<IbuHamil>> => {
  const response = await api.post<ApiResponse<IbuHamil>>("/ibu-hamil", data);
  return response;
};

// Update ibu hamil
export const updateIbuHamil = async (id: string, data: Partial<IbuHamil>): Promise<ApiResponse<IbuHamil>> => {
  const response = await api.put<ApiResponse<IbuHamil>>(`/ibu-hamil/${id}`, data);
  return response;
};

// Delete ibu hamil
export const deleteIbuHamil = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/ibu-hamil/${id}`);
  return response;
};

/**
 * Pemeriksaan Ibu Hamil Service
 * Service layer untuk mengelola data pemeriksaan ibu hamil
 */

// Get pemeriksaan by ibu hamil ID
export const getPemeriksaanByIbuHamilId = async (ibuHamilId: string): Promise<ApiResponse<PemeriksaanIbuHamil[]>> => {
  const response = await api.get<ApiResponse<PemeriksaanIbuHamil[]>>(`/pemeriksaan-ibu-hamil/ibu-hamil/${ibuHamilId}`);
  return response;
};

// Get pemeriksaan by ID
export const getPemeriksaanIbuHamilById = async (id: string): Promise<ApiResponse<PemeriksaanIbuHamil>> => {
  const response = await api.get<ApiResponse<PemeriksaanIbuHamil>>(`/pemeriksaan-ibu-hamil/${id}`);
  return response;
};

// Create new pemeriksaan
export const createPemeriksaanIbuHamil = async (data: Partial<PemeriksaanIbuHamil>): Promise<ApiResponse<PemeriksaanIbuHamil>> => {
  const response = await api.post<ApiResponse<PemeriksaanIbuHamil>>("/pemeriksaan-ibu-hamil", data);
  return response;
};

// Update pemeriksaan
export const updatePemeriksaanIbuHamil = async (id: string, data: Partial<PemeriksaanIbuHamil>): Promise<ApiResponse<PemeriksaanIbuHamil>> => {
  const response = await api.put<ApiResponse<PemeriksaanIbuHamil>>(`/pemeriksaan-ibu-hamil/${id}`, data);
  return response;
};

// Delete pemeriksaan
export const deletePemeriksaanIbuHamil = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/pemeriksaan-ibu-hamil/${id}`);
  return response;
};
