

/**
 * Posyandu Service
 * Service layer untuk mengelola data posyandu
 */

import api from "../lib/axios";
import type { ApiResponse, PaginatedResponse, PaginationParams, Posyandu } from "../types";

// Get all posyandu with pagination
export const getAllPosyandu = async (params?: PaginationParams): Promise<PaginatedResponse<Posyandu>> => {
  const response = await api.get<PaginatedResponse<Posyandu>>("/posyandu", { params });
  return response;
};

// Get posyandu by ID
export const getPosyanduById = async (id: string): Promise<ApiResponse<Posyandu>> => {
  const response = await api.get<ApiResponse<Posyandu>>(`/posyandu/${id}`);
  return response;
};

// Create new posyandu
export const createPosyandu = async (data: Partial<Posyandu>): Promise<ApiResponse<Posyandu>> => {
  const response = await api.post<ApiResponse<Posyandu>>("/posyandu", data);
  return response;
};

// Update posyandu
export const updatePosyandu = async (id: string, data: Partial<Posyandu>): Promise<ApiResponse<Posyandu>> => {
  const response = await api.put<ApiResponse<Posyandu>>(`/posyandu/${id}`, data);
  return response;
};

// Delete posyandu
export const deletePosyandu = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/posyandu/${id}`);
  return response;
};
