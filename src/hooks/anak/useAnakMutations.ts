import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Anak, CreateAnakInput, UpdateAnakInput, ApiResponse } from "../../types";
import { createAnak, deleteAnak, updateAnak } from "../../services";
import { queryKeys } from "../../lib/react-query";


/**
 * Hook untuk create anak baru
 */
export const useCreateAnak = (
  options?: Omit<UseMutationOptions<ApiResponse<Anak>, Error, CreateAnakInput>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnakInput) => createAnak(data),
    onSuccess: () => {
      // Invalidate anak list untuk refresh data
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      toast.success("Data anak berhasil ditambahkan!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menambahkan data anak.");
    },
    ...options,
  });
};

/**
 * Hook untuk update data anak
 */
export const useUpdateAnak = (
  options?: Omit<UseMutationOptions<ApiResponse<Anak>, Error, { nik: string; data: UpdateAnakInput }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nik, data }: { nik: string; data: UpdateAnakInput }) => updateAnak(nik, data),
    onSuccess: (_data, variables) => {
      // Invalidate list dan detail
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.detail(variables.nik) });
      toast.success("Data anak berhasil diperbarui!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal memperbarui data anak.");
    },
    ...options,
  });
};

/**
 * Hook untuk delete anak
 */
export const useDeleteAnak = (
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nik: string) => deleteAnak(nik),
    onSuccess: () => {
      // Invalidate anak list
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      toast.success("Data anak berhasil dihapus!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menghapus data anak.");
    },
    ...options,
  });
};
