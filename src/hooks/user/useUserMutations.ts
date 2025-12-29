/**
 * User Mutation Hooks
 * Custom hooks untuk mutations user menggunakan TanStack Query
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { 
  updateCurrentUser,
  createUser,
  updateUser, 
  deleteUser, 
  assignRole 
} from "../../services";
import type { CreateUserInput, UpdateUserInput, AssignRoleInput } from "../../types";

/**
 * Hook untuk update current user profile
 * PUT /api/v1/users/me
 */
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInput) => updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
      toast.success("Profile berhasil diperbarui");
    },
    onError: () => {
      // Error already handled by axios interceptor
    },
  });
};

/**
 * Hook untuk create user (admin)
 * POST /api/v1/users
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      toast.success("User berhasil dibuat");
    },
  });
};

/**
 * Hook untuk update user (admin)
 * PUT /api/v1/users/:id
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.detail(variables.id),
      });
      toast.success("User berhasil diperbarui");
    },
  });
};

/**
 * Hook untuk delete user (admin)
 * DELETE /api/v1/users/:id
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      toast.success("User berhasil dihapus");
    },
  });
};

/**
 * Hook untuk assign role to user (super admin only)
 * PATCH /api/v1/users/:id/role
 */
export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssignRoleInput }) =>
      assignRole(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.detail(variables.id),
      });
      toast.success("Role berhasil diubah");
    },
  });
};
