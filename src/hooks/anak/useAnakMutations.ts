import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Anak, CreateAnakInput, UpdateAnakInput } from "../../types";
import { createAnak, deleteAnak, updateAnak } from "../../services";
import { queryKeys } from "../../lib/react-query";


/**
 * Hook untuk create anak baru
 */
export const useCreateAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnakInput) => createAnak(data),
    
    // Optimistic update
    onMutate: async (newAnak) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.lists() });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(queryKeys.anak.lists());

      // Optimistically update cache
      queryClient.setQueryData(queryKeys.anak.lists(), (old: any) => {
        if (!old) return old;
        const tempAnak = { 
          ...newAnak, 
          nik: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return {
          ...old,
          data: [tempAnak, ...old.data],
          meta: { ...old.meta, total: old.meta.total + 1 }
        };
      });

      return { previousData };
    },
    
    // Rollback on error
    onError: (error: any, _newAnak, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.anak.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menambahkan data anak.");
    },
    
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data anak berhasil ditambahkan!");
    },
  });
};

/**
 * Hook untuk update data anak
 */
export const useUpdateAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nik, data }: { nik: string; data: UpdateAnakInput }) => updateAnak(nik, data),
    
    // Optimistic update
    onMutate: async ({ nik, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.detail(nik) });

      const previousList = queryClient.getQueryData(queryKeys.anak.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.anak.detail(nik));

      // Update list
      queryClient.setQueryData(queryKeys.anak.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: Anak) =>
            item.nik === nik ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      // Update detail
      queryClient.setQueryData(queryKeys.anak.detail(nik), (old: any) => {
        if (!old) return old;
        return { 
          ...old, 
          data: { ...old.data, ...data, updatedAt: new Date().toISOString() } 
        };
      });

      return { previousList, previousDetail };
    },
    
    // Rollback on error
    onError: (error: any, { nik }, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.anak.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.anak.detail(nik), context.previousDetail);
      }
      toast.error(error.userMessage || "Gagal memperbarui data anak.");
    },
    
    // Always refetch after error or success
    onSettled: (_data, _error, { nik }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.detail(nik) });
    },
    
    onSuccess: () => {
      toast.success("Data anak berhasil diperbarui!");
    },
  });
};

/**
 * Hook untuk delete anak
 */
export const useDeleteAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nik: string) => deleteAnak(nik),
    
    // Optimistic update
    onMutate: async (nik) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.lists() });

      const previousData = queryClient.getQueryData(queryKeys.anak.lists());

      // Optimistically remove from cache
      queryClient.setQueryData(queryKeys.anak.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: Anak) => item.nik !== nik),
          meta: { ...old.meta, total: old.meta.total - 1 }
        };
      });

      return { previousData };
    },
    
    // Rollback on error
    onError: (error: any, _nik, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.anak.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menghapus data anak.");
    },
    
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data anak berhasil dihapus!");
    },
  });
};
