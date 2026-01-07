/**
 * User Query Hooks
 * Custom hooks untuk data fetching user menggunakan TanStack Query
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/react-query";
import { 
  getCurrentUser, 
  getAllUsers, 
  getUserById 
} from "../../services";
import type { PaginationParams, UserFilterParams } from "../../types";

/**
 * Hook untuk get current user profile
 * GET /api/v1/users/me
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.user.me(),
    queryFn: getCurrentUser,
  });
};

/**
 * Hook untuk get all users (admin only)
 * GET /api/v1/users
 */
export const useUsers = (params?: PaginationParams & UserFilterParams) => {
  return useQuery({
    queryKey: queryKeys.user.list(JSON.stringify(params || {})),
    queryFn: () => getAllUsers(params),
  });
};
/**
 * Hook untuk get user by ID
 * GET /api/v1/users/:id
 */
export const useUserDetail = (id: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.user.detail(id),
    queryFn: () => getUserById(id),
    enabled: enabled && !!id,
  });
};
