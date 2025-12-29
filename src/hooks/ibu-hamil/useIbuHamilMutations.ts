import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse, IbuHamil } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { createIbuHamil, updateIbuHamil, deleteIbuHamil } from "../../services";

/**
 * Hook untuk create ibu hamil baru
 */
export const useCreateIbuHamil = (
  options?: Omit<UseMutationOptions<ApiResponse<IbuHamil>, Error, Partial<IbuHamil>>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IbuHamil>) => createIbuHamil(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
      toast.success("Data ibu hamil berhasil ditambahkan!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menambahkan data ibu hamil.");
    },
    ...options,
  });
};

/**
 * Hook untuk update ibu hamil
 */
export const useUpdateIbuHamil = (
  options?: Omit<UseMutationOptions<ApiResponse<IbuHamil>, Error, { id: string; data: Partial<IbuHamil> }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IbuHamil> }) => updateIbuHamil(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.detail(variables.id) });
      toast.success("Data ibu hamil berhasil diperbarui!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal memperbarui data ibu hamil.");
    },
    ...options,
  });
};

/**
 * Hook untuk delete ibu hamil
 */
export const useDeleteIbuHamil = (
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIbuHamil(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
      toast.success("Data ibu hamil berhasil dihapus!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menghapus data ibu hamil.");
    },
    ...options,
  });
};
