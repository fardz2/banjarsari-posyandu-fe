import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ApiResponse, Pengukuran } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { getPengukuranByAnakId, getPengukuranById } from "../../services";


/**
 * Hook untuk fetch pengukuran by anak ID
 */
export const usePengukuranByAnakId = (
  anakId: string,
  options?: Omit<UseQueryOptions<ApiResponse<Pengukuran[]>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pengukuran.list(anakId),
    queryFn: () => getPengukuranByAnakId(anakId),
    enabled: !!anakId,
    ...options,
  });
};

/**
 * Hook untuk fetch detail pengukuran by ID
 */
export const usePengukuranDetail = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<Pengukuran>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pengukuran.detail(id),
    queryFn: () => getPengukuranById(id),
    enabled: !!id,
    ...options,
  });
};
