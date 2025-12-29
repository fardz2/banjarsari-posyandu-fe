import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse, IbuHamil, CreateIbuHamilInput, UpdateIbuHamilInput } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { createIbuHamil, updateIbuHamil, deleteIbuHamil } from "../../services";

/**
 * Hook untuk create ibu hamil baru
 */
export const useCreateIbuHamil = (
  options?: Omit<UseMutationOptions<ApiResponse<IbuHamil>, Error, CreateIbuHamilInput>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIbuHamilInput) => createIbuHamil(data),
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
  options?: Omit<UseMutationOptions<ApiResponse<IbuHamil>, Error, { id: number; data: UpdateIbuHamilInput }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateIbuHamilInput }) => updateIbuHamil(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.ibuHamil.detail(variables.id.toString()) });
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
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, number>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteIbuHamil(id),
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
