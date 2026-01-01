import api from "../lib/axios";
import type { DashboardSummary, GenderStats, NutritionalStats, VisitTrend } from "../types/dashboard.types";
import type { ApiResponse } from "../types";

export const getDashboardSummary = async (): Promise<ApiResponse<DashboardSummary>> => {
  return await api.get<ApiResponse<DashboardSummary>>("/dashboard/summary");
};

export const getGenderStats = async (): Promise<ApiResponse<GenderStats[]>> => {
  return await api.get<ApiResponse<GenderStats[]>>("/dashboard/gender");
};

export const getNutritionalStats = async (): Promise<ApiResponse<NutritionalStats>> => {
  return await api.get<ApiResponse<NutritionalStats>>("/dashboard/nutrition");
};

export const getNutritionalStatsByPosyandu = async (): Promise<ApiResponse<any[]>> => {
  return await api.get<ApiResponse<any[]>>("/dashboard/nutrition-by-posyandu");
};

export const getVisitTrends = async (): Promise<ApiResponse<VisitTrend[]>> => {
  return await api.get<ApiResponse<VisitTrend[]>>("/dashboard/trends");
};
