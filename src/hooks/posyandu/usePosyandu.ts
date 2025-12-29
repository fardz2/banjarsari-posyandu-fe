import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { getAllPosyandu, getPosyanduById, createPosyandu, updatePosyandu, deletePosyandu } from "../../services";
import type { Posyandu, CreatePosyanduInput, UpdatePosyanduInput, PaginatedResponse, ApiResponse, PaginationParams } from "../../types";

/**
 * Hook untuk fetch semua posyandu dengan pagination
 */
export const usePosyandu = (
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<PaginatedResponse<Posyandu>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.posyandu.list(JSON.stringify(params || {})),
    queryFn: () => getAllPosyandu(params),
    ...options,
  });
};

/**
 * Hook untuk fetch detail posyandu by ID
 */
export const usePosyanduDetail = (
  id: number,
  options?: Omit<UseQueryOptions<ApiResponse<Posyandu>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.posyandu.detail(id.toString()),
    queryFn: () => getPosyanduById(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * Hook untuk create posyandu baru
 */
export const useCreatePosyandu = (
  options?: Omit<UseMutationOptions<ApiResponse<Posyandu>, Error, CreatePosyanduInput>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePosyanduInput) => createPosyandu(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posyandu.lists() });
      toast.success("Data posyandu berhasil ditambahkan!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menambahkan data posyandu.");
    },
    ...options,
  });
};

/**
 * Hook untuk update posyandu
 */
export const useUpdatePosyandu = (
  options?: Omit<UseMutationOptions<ApiResponse<Posyandu>, Error, { id: number; data: UpdatePosyanduInput }>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePosyanduInput }) => updatePosyandu(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posyandu.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.posyandu.detail(variables.id.toString()) });
      toast.success("Data posyandu berhasil diperbarui!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal memperbarui data posyandu.");
    },
    ...options,
  });
};

/**
 * Hook untuk delete posyandu
 */
export const useDeletePosyandu = (
  options?: Omit<UseMutationOptions<ApiResponse<void>, Error, number>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePosyandu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posyandu.lists() });
      toast.success("Data posyandu berhasil dihapus!");
    },
    onError: (error: any) => {
      toast.error(error.userMessage || "Gagal menghapus data posyandu.");
    },
    ...options,
  });
};
