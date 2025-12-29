import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse, Pengukuran, CreatePengukuranInput, UpdatePengukuranInput } from "../../types";
import { createPengukuran, deletePengukuran, updatePengukuran } from "../../services";
import { queryKeys } from "../../lib/react-query";


/**
 * Hook untuk create pengukuran baru
 */
export const useCreatePengukuran = (
  options?: Omit<UseMutationOptions<ApiResponse<Pengukuran>, Error, CreatePengukuranInput>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePengukuranInput) => createPengukuran(data),
    onSuccess: (_data, variables) => {
      // Invalidate pengukuran list untuk anak terkait
      if (variables.anakNik) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.list(variables.anakNik) });
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
  options?: Omit<UseMutationOptions<ApiResponse<Pengukuran>, Error, { id: number; data: UpdatePengukuranInput }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePengukuranInput }) => updatePengukuran(id, data),
    onSuccess: (_data, variables) => {
      // Invalidate detail dan list
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.detail(variables.id.toString()) });
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.lists() });
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
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, number>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePengukuran(id),
    onSuccess: () => {
      // Invalidate pengukuran list
      queryClient.invalidateQueries({ queryKey: queryKeys.pengukuran.lists() });
      toast.success("Data pengukuran berhasil dihapus!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menghapus data pengukuran.");
    },
    ...options,
  });
};
