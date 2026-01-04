import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { IbuHamil, CreateIbuHamilInput, UpdateIbuHamilInput } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { createIbuHamil, updateIbuHamil, deleteIbuHamil } from "../../services";

/**
 * Hook untuk create ibu hamil baru
 */
export const useCreateIbuHamil = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIbuHamilInput) => createIbuHamil(data),
    
    onMutate: async (newIbuHamil) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ibuHamil.lists() });
      const previousData = queryClient.getQueryData(queryKeys.ibuHamil.lists());

      queryClient.setQueryData(queryKeys.ibuHamil.lists(), (old: any) => {
        if (!old) return old;
        const tempIbuHamil = {
          ...newIbuHamil,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return {
          ...old,
          data: [tempIbuHamil, ...old.data],
          meta: { ...old.meta, total: old.meta.total + 1 }
        };
      });

      return { previousData };
    },
    
    onError: (error: any, _newIbuHamil, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.ibuHamil.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menambahkan data ibu hamil.");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data ibu hamil berhasil ditambahkan!");
    },
  });
};

/**
 * Hook untuk update ibu hamil
 */
export const useUpdateIbuHamil = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateIbuHamilInput }) => updateIbuHamil(id, data),
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ibuHamil.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.ibuHamil.detail(id.toString()) });

      const previousList = queryClient.getQueryData(queryKeys.ibuHamil.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.ibuHamil.detail(id.toString()));

      queryClient.setQueryData(queryKeys.ibuHamil.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: IbuHamil) =>
            item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      queryClient.setQueryData(queryKeys.ibuHamil.detail(id.toString()), (old: any) => {
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
        queryClient.setQueryData(queryKeys.ibuHamil.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.ibuHamil.detail(id.toString()), context.previousDetail);
      }
      toast.error(error.userMessage || "Gagal memperbarui data ibu hamil.");
    },
    
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.detail(id.toString()) });
    },
    
    onSuccess: () => {
      toast.success("Data ibu hamil berhasil diperbarui!");
    },
  });
};

/**
 * Hook untuk delete ibu hamil
 */
export const useDeleteIbuHamil = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteIbuHamil(id),
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ibuHamil.lists() });
      const previousData = queryClient.getQueryData(queryKeys.ibuHamil.lists());

      queryClient.setQueryData(queryKeys.ibuHamil.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: IbuHamil) => item.id !== id),
          meta: { ...old.meta, total: old.meta.total - 1 }
        };
      });

      return { previousData };
    },
    
    onError: (error: any, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.ibuHamil.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menghapus data ibu hamil.");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
    },
    
    onSuccess: () => {
      toast.success("Data ibu hamil berhasil dihapus!");
    },
  });
};
