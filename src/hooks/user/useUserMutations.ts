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
import type { CreateUserInput, UpdateUserInput, AssignRoleInput, User } from "../../types";

/**
 * Hook untuk update current user profile
 * PUT /api/v1/users/me
 */
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInput) => updateCurrentUser(data),
    
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.user.me() });
      const previousData = queryClient.getQueryData(queryKeys.user.me());

      queryClient.setQueryData(queryKeys.user.me(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, ...newData, updatedAt: new Date().toISOString() }
        };
      });

      return { previousData };
    },
    
    onError: (_error, _newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.user.me(), context.previousData);
      }
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
    },
    
    onSuccess: () => {
      toast.success("Profile berhasil diperbarui");
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
    
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.user.lists() });
      const previousData = queryClient.getQueryData(queryKeys.user.lists());

      queryClient.setQueryData(queryKeys.user.lists(), (old: any) => {
        if (!old) return old;
        const tempUser = {
          ...newUser,
          id: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return {
          ...old,
          data: [tempUser, ...old.data],
          meta: { ...old.meta, total: old.meta.total + 1 }
        };
      });

      return { previousData };
    },
    
    onError: (_error, _newUser, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.user.lists(), context.previousData);
      }
      toast.error("Gagal membuat user");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
    },
    
    onSuccess: () => {
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
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.user.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.user.detail(id) });

      const previousList = queryClient.getQueryData(queryKeys.user.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.user.detail(id));

      queryClient.setQueryData(queryKeys.user.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: User) =>
            item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      queryClient.setQueryData(queryKeys.user.detail(id), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, ...data, updatedAt: new Date().toISOString() }
        };
      });

      return { previousList, previousDetail };
    },
    
    onError: (_error, { id }, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.user.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.user.detail(id), context.previousDetail);
      }
      toast.error("Gagal memperbarui user");
    },
    
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.detail(id) });
    },
    
    onSuccess: () => {
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
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.user.lists() });
      const previousData = queryClient.getQueryData(queryKeys.user.lists());

      queryClient.setQueryData(queryKeys.user.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: User) => item.id !== id),
          meta: { ...old.meta, total: old.meta.total - 1 }
        };
      });

      return { previousData };
    },
    
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.user.lists(), context.previousData);
      }
      toast.error("Gagal menghapus user");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
    },
    
    onSuccess: () => {
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
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.user.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.user.detail(id) });

      const previousList = queryClient.getQueryData(queryKeys.user.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.user.detail(id));

      queryClient.setQueryData(queryKeys.user.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: User) =>
            item.id === id ? { ...item, role: data.role, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      queryClient.setQueryData(queryKeys.user.detail(id), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, role: data.role, updatedAt: new Date().toISOString() }
        };
      });

      return { previousList, previousDetail };
    },
    
    onError: (_error, { id }, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.user.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.user.detail(id), context.previousDetail);
      }
      toast.error("Gagal mengubah role");
    },
    
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.detail(id) });
    },
    
    onSuccess: () => {
      toast.success("Role berhasil diubah");
    },
  });
};
