/**
 * Ortu Query Hooks
 * Custom hooks untuk data fetching ortu menggunakan TanStack Query
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/react-query";
import { 
  getCurrentOrtu, 
  getAllOrtu, 
  getOrtuById 
} from "../../services";
import type { PaginationParams } from "../../types";

/**
 * Hook untuk get current ortu profile
 * GET /api/v1/ortu/me
 */
export const useCurrentOrtu = () => {
  return useQuery({
    queryKey: queryKeys.ortu.me(),
    queryFn: getCurrentOrtu,
  });
};

/**
 * Hook untuk get all ortu
 * GET /api/v1/ortu
 */
export const useOrtu = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.ortu.list(JSON.stringify(params || {})),
    queryFn: () => getAllOrtu(params),
  });
};

/**
 * Hook untuk get ortu by ID
 * GET /api/v1/ortu/:id
 */
export const useOrtuDetail = (id: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.ortu.detail(id.toString()),
    queryFn: () => getOrtuById(id),
    enabled: enabled && !!id,
  });
};
