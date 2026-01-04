import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Pengukuran, CreatePengukuranInput, UpdatePengukuranInput } from "../../types";
import { createPengukuran, deletePengukuran, updatePengukuran } from "../../services";
import { queryKeys } from "../../lib/react-query";


/**
 * Hook untuk create pengukuran baru
 */
export const useCreatePengukuran = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePengukuranInput) => createPengukuran(data),
    
    // Optimistic update
    onMutate: async (newPengukuran) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.pengukuran.lists() });

      const previousData = queryClient.getQueryData(queryKeys.pengukuran.lists());

      // Optimistically add to cache
      queryClient.setQueryData(queryKeys.pengukuran.lists(), (old: any) => {
        if (!old) return old;
        const tempPengukuran = {
          ...newPengukuran,
          id: Date.now(), // Temporary ID
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return {
          ...old,
          data: [tempPengukuran, ...old.data],
          meta: { ...old.meta, total: old.meta.total + 1 }
        };
      });

      return { previousData };
    },
    
    onError: (error: any, _newPengukuran, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.pengukuran.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menambahkan data pengukuran.");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data pengukuran berhasil ditambahkan!");
    },
  });
};

/**
 * Hook untuk update pengukuran
 */
export const useUpdatePengukuran = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePengukuranInput }) => updatePengukuran(id, data),
    
    // Optimistic update
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.pengukuran.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.pengukuran.detail(id) });

      const previousList = queryClient.getQueryData(queryKeys.pengukuran.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.pengukuran.detail(id));

      // Update list
      queryClient.setQueryData(queryKeys.pengukuran.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: Pengukuran) =>
            item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      // Update detail
      queryClient.setQueryData(queryKeys.pengukuran.detail(id), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, ...data, updatedAt: new Date().toISOString() }
        };
      });

      return { previousList, previousDetail };
    },
    
    onError: (error: any, { id }, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.pengukuran.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.pengukuran.detail(id), context.previousDetail);
      }
      toast.error(error.userMessage || "Gagal memperbarui data pengukuran.");
    },
    
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data pengukuran berhasil diperbarui!");
    },
  });
};

/**
 * Hook untuk delete pengukuran
 */
export const useDeletePengukuran = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePengukuran(id),
    
    // Optimistic update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.pengukuran.lists() });

      const previousData = queryClient.getQueryData(queryKeys.pengukuran.lists());

      // Optimistically remove from cache
      queryClient.setQueryData(queryKeys.pengukuran.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: Pengukuran) => item.id !== id),
          meta: { ...old.meta, total: old.meta.total - 1 }
        };
      });

      return { previousData };
    },
    
    onError: (error: any, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.pengukuran.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menghapus data pengukuran.");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data pengukuran berhasil dihapus!");
    },
  });
};
