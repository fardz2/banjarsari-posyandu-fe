/**
 * User Service
 * Service layer untuk mengelola data user dan profile
 */

import api from "../lib/axios";
import type { 
  User, 
  CreateUserInput,
  UpdateUserInput, 
  AssignRoleInput,
  ApiResponse, 
  PaginatedResponse, 
  PaginationParams 
} from "../types";

// ============================================================================
// CURRENT USER (ME) ENDPOINTS
// ============================================================================

/**
 * Get current user profile
 * GET /api/v1/users/me
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return await api.get<ApiResponse<User>>("/users/me");
};

/**
 * Update current user profile
 * PUT /api/v1/users/me
 */
export const updateCurrentUser = async (
  data: UpdateUserInput
): Promise<ApiResponse<User>> => {
  return await api.put<ApiResponse<User>>("/users/me", data);
};

// ============================================================================
// USER MANAGEMENT ENDPOINTS (ADMIN)
// ============================================================================

/**
 * Get all users (filtered by access)
 * GET /api/v1/users
 * Roles: SUPER_ADMIN, ADMIN
 */
export const getAllUsers = async (
  params?: PaginationParams
): Promise<PaginatedResponse<User>> => {
  return await api.get<PaginatedResponse<User>>("/users", { params });
};

/**
 * Get user by ID
 * GET /api/v1/users/:id
 * Roles: SUPER_ADMIN, ADMIN
 */
export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  return await api.get<ApiResponse<User>>(`/users/${id}`);
};


/**
 * Create new user
 * POST /api/v1/users
 * Roles: SUPER_ADMIN, ADMIN
 */
export const createUser = async (
  data: CreateUserInput
): Promise<ApiResponse<User>> => {
  return await api.post<ApiResponse<User>>("/users", data);
};

/**
 * Update user
 * PUT /api/v1/users/:id
 * Roles: SUPER_ADMIN, ADMIN
 */
export const updateUser = async (
  id: string,
  data: UpdateUserInput
): Promise<ApiResponse<User>> => {
  return await api.put<ApiResponse<User>>(`/users/${id}`, data);
};

/**
 * Delete user
 * DELETE /api/v1/users/:id
 * Roles: SUPER_ADMIN, ADMIN
 */
export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/users/${id}`);
};

/**
 * Assign role to user
 * PATCH /api/v1/users/:id/role
 * Roles: SUPER_ADMIN only
 */
export const assignRole = async (
  id: string,
  data: AssignRoleInput
): Promise<ApiResponse<User>> => {
  return await api.patch<ApiResponse<User>>(`/users/${id}/role`, data);
};
