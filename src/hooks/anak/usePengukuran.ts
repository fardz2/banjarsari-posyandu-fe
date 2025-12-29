import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ApiResponse, Pengukuran, PaginatedResponse, PaginationParams } from "../../types";
import { queryKeys } from "../../lib/react-query";
import { getAllPengukuran, getPengukuranByAnakNik, getPengukuranById } from "../../services";


/**
 * Hook untuk fetch all pengukuran with filters
 */
export const usePengukuran = (
  params?: PaginationParams & { anakNik?: string; startDate?: string; endDate?: string },
  options?: Omit<UseQueryOptions<PaginatedResponse<Pengukuran>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pengukuran.list(JSON.stringify(params || {})),
    queryFn: () => getAllPengukuran(params),
    ...options,
  });
};

/**
 * Hook untuk fetch pengukuran by anak NIK
 */
export const usePengukuranByAnakNik = (
  nik: string,
  options?: Omit<UseQueryOptions<ApiResponse<Pengukuran[]>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pengukuran.list(nik),
    queryFn: () => getPengukuranByAnakNik(nik),
    enabled: !!nik,
    ...options,
  });
};

/**
 * Hook untuk fetch detail pengukuran by ID
 */
export const usePengukuranDetail = (
  id: number,
  options?: Omit<UseQueryOptions<ApiResponse<Pengukuran>>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.pengukuran.detail(id.toString()),
    queryFn: () => getPengukuranById(id),
    enabled: !!id,
    ...options,
  });
};
