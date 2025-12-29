import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { queryKeys } from "../../lib/react-query";
import { getAllIbuHamil, getIbuHamilById } from "../../services";
import type { IbuHamil, PaginatedResponse, ApiResponse, PaginationParams } from "../../types";
    
/**
 * Hook untuk fetch semua data ibu hamil dengan pagination
 */
export const useIbuHamil = (
  params?: PaginationParams & { posyanduId?: number; rw?: string },
  options?: Omit<UseQueryOptions<PaginatedResponse<IbuHamil>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.ibuHamil.list(JSON.stringify(params || {})),
    queryFn: () => getAllIbuHamil(params),
    ...options,
  });
};

/**
 * Hook untuk fetch detail ibu hamil by ID
 */
export const useIbuHamilDetail = (
  id: number,
  options?: Omit<UseQueryOptions<ApiResponse<IbuHamil>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.ibuHamil.detail(id.toString()),
    queryFn: () => getIbuHamilById(id),
    enabled: !!id,
    ...options,
  });
};
