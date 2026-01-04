/**
 * Ortu Mutation Hooks
 * Custom hooks untuk mutations ortu menggunakan TanStack Query
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { 
  updateCurrentOrtu,
  updateOrtu, 
  deleteOrtu 
} from "../../services";
import type { UpdateOrtuInput, Ortu } from "../../types";

/**
 * Hook untuk update current ortu profile
 * PUT /api/v1/ortu/me
 */
export const useUpdateCurrentOrtu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrtuInput) => updateCurrentOrtu(data),
    
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ortu.me() });
      const previousData = queryClient.getQueryData(queryKeys.ortu.me());

      queryClient.setQueryData(queryKeys.ortu.me(), (old: any) => {
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
        queryClient.setQueryData(queryKeys.ortu.me(), context.previousData);
      }
      toast.error("Gagal memperbarui profile orang tua");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.me() });
    },
    
    onSuccess: () => {
      toast.success("Profile orang tua berhasil diperbarui");
    },
  });
};

/**
 * Hook untuk update ortu
 * PUT /api/v1/ortu/:id
 */
export const useUpdateOrtu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrtuInput }) =>
      updateOrtu(id, data),
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ortu.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.ortu.detail(id.toString()) });

      const previousList = queryClient.getQueryData(queryKeys.ortu.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.ortu.detail(id.toString()));

      queryClient.setQueryData(queryKeys.ortu.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: Ortu) =>
            item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      queryClient.setQueryData(queryKeys.ortu.detail(id.toString()), (old: any) => {
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
        queryClient.setQueryData(queryKeys.ortu.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.ortu.detail(id.toString()), context.previousDetail);
      }
      toast.error("Gagal memperbarui data orang tua");
    },
    
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.detail(id.toString()) });
    },
    
    onSuccess: () => {
      toast.success("Data orang tua berhasil diperbarui");
    },
  });
};

/**
 * Hook untuk delete ortu
 * DELETE /api/v1/ortu/:id
 */
export const useDeleteOrtu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteOrtu(id),
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ortu.lists() });
      const previousData = queryClient.getQueryData(queryKeys.ortu.lists());

      queryClient.setQueryData(queryKeys.ortu.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: Ortu) => item.id !== id),
          meta: { ...old.meta, total: old.meta.total - 1 }
        };
      });

      return { previousData };
    },
    
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.ortu.lists(), context.previousData);
      }
      toast.error("Gagal menghapus data orang tua");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data orang tua berhasil dihapus");
    },
  });
};
