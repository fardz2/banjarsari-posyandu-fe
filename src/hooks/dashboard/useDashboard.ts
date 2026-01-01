import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/react-query";
import {
  getDashboardSummary,
  getGenderStats,
  getNutritionalStats,
  getNutritionalStatsByPosyandu,
  getVisitTrends,
} from "../../services/dashboard.service";

export const useDashboardSummary = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: getDashboardSummary,
    enabled: options?.enabled,
  });
};

export const useGenderStats = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.dashboard.gender(),
    queryFn: getGenderStats,
    enabled: options?.enabled,
  });
};

export const useNutritionalStats = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.dashboard.nutrition(),
    queryFn: getNutritionalStats,
    enabled: options?.enabled,
  });
};

export const useNutritionalStatsByPosyandu = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["dashboard", "nutrition", "posyandu"],
    queryFn: getNutritionalStatsByPosyandu,
    enabled: options?.enabled,
  });
};

export const useVisitTrends = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.dashboard.trends(),
    queryFn: getVisitTrends,
    enabled: options?.enabled,
  });
};
