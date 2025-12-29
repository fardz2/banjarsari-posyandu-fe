import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Anak, ApiResponse, PaginatedResponse, PaginationParams } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { getAllAnak, getAnakByNik, getMyChildren } from "../../services";


/**
 * Hook untuk fetch my children (untuk ORANG_TUA role)
 */
export const useMyChildren = (
  options?: Omit<UseQueryOptions<ApiResponse<Anak[]>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [...queryKeys.anak.all, "my-children"],
    queryFn: getMyChildren,
    ...options,
  });
};

/**
 * Hook untuk fetch semua data anak dengan pagination
 */
export const useAnak = (
  params?: PaginationParams & { posyanduId?: number; rw?: string },
  options?: Omit<UseQueryOptions<PaginatedResponse<Anak>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.anak.list(JSON.stringify(params || {})),
    queryFn: () => getAllAnak(params),
    ...options,
  });
};

/**
 * Hook untuk fetch detail anak by NIK
 */
export const useAnakDetail = (
  nik: string,
  options?: Omit<UseQueryOptions<ApiResponse<Anak>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.anak.detail(nik),
    queryFn: () => getAnakByNik(nik),
    enabled: !!nik, // Only run query if nik exists
    ...options,
  });
};
