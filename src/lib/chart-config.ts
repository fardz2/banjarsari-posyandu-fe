import type { ChartConfig } from "../components/ui/chart";

// Custom color palette for charts
export const chartColors = {
  primary: "#2563eb", // Blue-600
  secondary: "#3b82f6", // Blue-500
  tertiary: "#93c5fd", // Blue-300
  success: "#10b981", // Green-500
  warning: "#f59e0b", // Amber-500
  danger: "#ef4444", // Red-500
  purple: "#8b5cf6", // Purple-500
  pink: "#ec4899", // Pink-500
};

// Gender chart configuration
export const genderChartConfig = {
  laki: {
    label: "Laki-laki",
    color: chartColors.primary,
  },
  perempuan: {
    label: "Perempuan",
    color: chartColors.secondary,
  },
} satisfies ChartConfig;

// Visit trends chart configuration
export const visitChartConfig = {
  visitors: {
    label: "Pengukuran",
    color: chartColors.primary,
  },
} satisfies ChartConfig;

// Nutritional status chart configuration
export const nutritionChartConfig = {
  count: {
    label: "Anak",
    color: chartColors.tertiary,
  },
  // Status Gizi (BB/TB)
  "gizi-buruk": {
    label: "Gizi Buruk",
    color: chartColors.danger,
  },
  "gizi-kurang": {
    label: "Gizi Kurang",
    color: chartColors.warning,
  },
  "gizi-baik": {
    label: "Gizi Baik",
    color: chartColors.success,
  },
  "risiko-gizi-lebih": {
    label: "Risiko Gizi Lebih",
    color: "#f59e0b", // amber-500
  },
  "gizi-lebih": {
    label: "Gizi Lebih",
    color: chartColors.secondary,
  },
  "obesitas": {
    label: "Obesitas",
    color: chartColors.purple,
  },
  
  // Status Tinggi Badan (TB/U)
  "sangat-pendek": {
    label: "Sangat Pendek",
    color: chartColors.danger,
  },
  "pendek": {
    label: "Pendek",
    color: chartColors.warning,
  },
  "tinggi": {
    label: "Tinggi",
    color: chartColors.secondary,
  },
  
  // Status Berat Badan (BB/U)
  "sangat-kurang": {
    label: "Sangat Kurang",
    color: chartColors.danger,
  },
  "kurang": {
    label: "Kurang",
    color: chartColors.warning,
  },
  "lebih": {
    label: "Lebih",
    color: chartColors.secondary,
  },
  
  // Status Lingkar Kepala (LK/U)
  "mikrosefalus-berat": {
    label: "Mikrosefalus Berat",
    color: chartColors.danger,
  },
  "mikrosefalus": {
    label: "Mikrosefalus",
    color: chartColors.warning,
  },
  "makrosefalus": {
    label: "Makrosefalus",
    color: chartColors.secondary,
  },
  "makrosefalus-berat": {
    label: "Makrosefalus Berat",
    color: chartColors.purple,
  },

  // Shared
  "normal": {
    label: "Normal",
    color: chartColors.success,
  }
} satisfies ChartConfig;

// Helper function to normalize nutritional status
export const normalizeStatus = (status: string): string => {
  const lowerStatus = status.toLowerCase();
  
  // Direct mappings based on new standardized strings
  
  // BB/TB
  if (lowerStatus === "gizi buruk") return "gizi-buruk";
  if (lowerStatus === "gizi kurang") return "gizi-kurang";
  if (lowerStatus === "gizi baik") return "gizi-baik";
  if (lowerStatus === "risiko gizi lebih") return "risiko-gizi-lebih";
  if (lowerStatus === "gizi lebih") return "gizi-lebih";
  if (lowerStatus === "obesitas") return "obesitas";

  // TB/U
  if (lowerStatus === "sangat pendek") return "sangat-pendek";
  if (lowerStatus === "pendek") return "pendek";
  if (lowerStatus === "tinggi") return "tinggi";

  // BB/U
  if (lowerStatus === "sangat kurang") return "sangat-kurang";
  if (lowerStatus === "kurang") return "kurang";
  if (lowerStatus === "lebih") return "lebih";

  // LK/U
  if (lowerStatus === "mikrosefalus berat") return "mikrosefalus-berat";
  if (lowerStatus === "mikrosefalus") return "mikrosefalus";
  if (lowerStatus === "makrosefalus") return "makrosefalus";
  if (lowerStatus === "makrosefalus berat") return "makrosefalus-berat";

  // Shared
  if (lowerStatus === "normal") return "normal";
  
  return "count"; // fallback
};
