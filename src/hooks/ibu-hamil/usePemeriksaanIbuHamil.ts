import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ApiResponse, PemeriksaanIbuHamil } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { getPemeriksaanByIbuHamilId, getPemeriksaanIbuHamilById } from "../../services";


/**
 * Hook untuk fetch pemeriksaan by ibu hamil ID
 */
export const usePemeriksaanByIbuHamilId = (
  ibuHamilId: string,
  options?: Omit<UseQueryOptions<ApiResponse<PemeriksaanIbuHamil[]>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pemeriksaanIbuHamil.list(ibuHamilId),
    queryFn: () => getPemeriksaanByIbuHamilId(ibuHamilId),
    enabled: !!ibuHamilId,
    ...options,
  });
};

/**
 * Hook untuk fetch detail pemeriksaan by ID
 */
export const usePemeriksaanIbuHamilDetail = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<PemeriksaanIbuHamil>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pemeriksaanIbuHamil.detail(id),
    queryFn: () => getPemeriksaanIbuHamilById(id),
    enabled: !!id,
    ...options,
  });
};
