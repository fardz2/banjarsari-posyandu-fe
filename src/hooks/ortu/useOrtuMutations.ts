/**
 * Ortu Mutation Hooks
 * Custom hooks untuk mutations ortu menggunakan TanStack Query
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { 
  updateCurrentOrtu,
  updateOrtu, 
  deleteOrtu 
} from "../../services";
import type { UpdateOrtuInput } from "../../types";

/**
 * Hook untuk update current ortu profile
 * PUT /api/v1/ortu/me
 */
export const useUpdateCurrentOrtu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrtuInput) => updateCurrentOrtu(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.me() });
      toast.success("Profile orang tua berhasil diperbarui");
    },
  });
};

/**
 * Hook untuk update ortu
 * PUT /api/v1/ortu/:id
 */
export const useUpdateOrtu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrtuInput }) =>
      updateOrtu(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ortu.detail(variables.id.toString()),
      });
      toast.success("Data orang tua berhasil diperbarui");
    },
  });
};

/**
 * Hook untuk delete ortu
 * DELETE /api/v1/ortu/:id
 */
export const useDeleteOrtu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteOrtu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ortu.lists() });
      toast.success("Data orang tua berhasil dihapus");
    },
  });
};
