import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse, PemeriksaanIbuHamil } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { createPemeriksaanIbuHamil, updatePemeriksaanIbuHamil, deletePemeriksaanIbuHamil } from "../../services";

/**
 * Hook untuk create pemeriksaan ibu hamil baru
 */
export const useCreatePemeriksaanIbuHamil = (
  options?: Omit<UseMutationOptions<ApiResponse<PemeriksaanIbuHamil>, Error, Partial<PemeriksaanIbuHamil>>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<PemeriksaanIbuHamil>) => createPemeriksaanIbuHamil(data),
    onSuccess: (_data, variables) => {
      if (variables.ibuHamilId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pemeriksaanIbuHamil.list(variables.ibuHamilId) });
      }
      toast.success("Data pemeriksaan berhasil ditambahkan!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menambahkan data pemeriksaan.");
    },
    ...options,
  });
};

/**
 * Hook untuk update pemeriksaan ibu hamil
 */
export const useUpdatePemeriksaanIbuHamil = (
  options?: Omit<UseMutationOptions<ApiResponse<PemeriksaanIbuHamil>, Error, { id: string; data: Partial<PemeriksaanIbuHamil> }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PemeriksaanIbuHamil> }) => updatePemeriksaanIbuHamil(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pemeriksaanIbuHamil.detail(variables.id) });
      if (variables.data.ibuHamilId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pemeriksaanIbuHamil.list(variables.data.ibuHamilId) });
      }
      toast.success("Data pemeriksaan berhasil diperbarui!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal memperbarui data pemeriksaan.");
    },
    ...options,
  });
};

/**
 * Hook untuk delete pemeriksaan ibu hamil
 */
export const useDeletePemeriksaanIbuHamil = (
  ibuHamilId?: string,
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePemeriksaanIbuHamil(id),
    onSuccess: () => {
      if (ibuHamilId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.pemeriksaanIbuHamil.list(ibuHamilId) });
      }
      toast.success("Data pemeriksaan berhasil dihapus!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menghapus data pemeriksaan.");
    },
    ...options,
  });
};
