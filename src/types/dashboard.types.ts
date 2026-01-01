export interface DashboardSummary {
  users: number;
  posyandu: number;
  anak: number;
  ibuHamil: number;
  pengukuran: number;
  ortu: number;
}

export interface GenderStats {
  gender: 'Laki-laki' | 'Perempuan';
  count: number;
}

export interface NutritionalStatusItem {
  status: string | null;
  count: number;
}

export interface NutritionalStats {
  bb_u: NutritionalStatusItem[];
  tb_u: NutritionalStatusItem[];
  gizi: NutritionalStatusItem[]; // status_bb_tb
  lk_u: NutritionalStatusItem[]; // status_lk_u
}

export interface VisitTrend {
  month: string; // YYYY-MM
  count: number;
}

export interface NutritionalStatsByPosyandu {
  posyandu: string;
  stats: NutritionalStats;
}

export interface VisitTrend {
  month: string; // YYYY-MM
  count: number;
}
