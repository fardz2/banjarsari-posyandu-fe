import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Anak, ApiResponse, PaginatedResponse, PaginationParams } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { getAllAnak, getAnakById } from "../../services";


/**
 * Hook untuk fetch semua data anak dengan pagination
 */
export const useAnak = (
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<PaginatedResponse<Anak>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.anak.list(JSON.stringify(params || {})),
    queryFn: () => getAllAnak(params),
    ...options,
  });
};

/**
 * Hook untuk fetch detail anak by ID
 */
export const useAnakDetail = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<Anak>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.anak.detail(id),
    queryFn: () => getAnakById(id),
    enabled: !!id, // Only run query if id exists
    ...options,
  });
};
