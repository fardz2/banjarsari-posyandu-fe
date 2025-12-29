import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse, Pengukuran } from "../../types";
import { createPengukuran, deletePengukuran, updatePengukuran } from "../../services";
import { queryKeys } from "../../lib/react-query";


/**
 * Hook untuk create pengukuran baru
 */
export const useCreatePengukuran = (
  options?: Omit<UseMutationOptions<ApiResponse<Pengukuran>, Error, Partial<Pengukuran>>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Pengukuran>) => createPengukuran(data),
    onSuccess: (_data, variables) => {
      // Invalidate pengukuran list untuk anak terkait
      if (variables.anakId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.list(variables.anakId) });
      }
      toast.success("Data pengukuran berhasil ditambahkan!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menambahkan data pengukuran.");
    },
    ...options,
  });
};

/**
 * Hook untuk update pengukuran
 */
export const useUpdatePengukuran = (
  options?: Omit<UseMutationOptions<ApiResponse<Pengukuran>, Error, { id: string; data: Partial<Pengukuran> }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pengukuran> }) => updatePengukuran(id, data),
    onSuccess: (_data, variables) => {
      // Invalidate detail dan list
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.detail(variables.id) });
      if (variables.data.anakId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.list(variables.data.anakId) });
      }
      toast.success("Data pengukuran berhasil diperbarui!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal memperbarui data pengukuran.");
    },
    ...options,
  });
};

/**
 * Hook untuk delete pengukuran
 */
export const useDeletePengukuran = (
  anakId?: string,
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePengukuran(id),
    onSuccess: () => {
      // Invalidate pengukuran list
      if (anakId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.list(anakId) });
      }
      toast.success("Data pengukuran berhasil dihapus!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menghapus data pengukuran.");
    },
    ...options,
  });
};
