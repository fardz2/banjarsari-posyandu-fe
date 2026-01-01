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
  buruk: {
    label: "Gizi Buruk",
    color: chartColors.danger,
  },
  kurang: {
    label: "Gizi Kurang",
    color: chartColors.warning,
  },
  baik: {
    label: "Gizi Baik",
    color: chartColors.success,
  },
  berisiko: {
    label: "Berisiko Gizi Lebih",
    color: "#f59e0b", // amber-500
  },
  lebih: {
    label: "Gizi Lebih",
    color: chartColors.secondary,
  },
  obesitas: {
    label: "Obesitas",
    color: chartColors.purple,
  },
  // Status Tinggi Badan (TB/U)
  "sangat-pendek": {
    label: "Sangat Pendek",
    color: chartColors.danger,
  },
  pendek: {
    label: "Pendek",
    color: chartColors.warning,
  },
  normal: {
    label: "Normal",
    color: chartColors.success,
  },
  tinggi: {
    label: "Tinggi",
    color: chartColors.secondary,
  },
  // Status Berat Badan (BB/U)
  "sangat-kurang": {
    label: "Berat Badan Sangat Kurang",
    color: chartColors.danger,
  },
  "bb-kurang": {
    label: "Berat Badan Kurang",
    color: chartColors.warning,
  },
  "bb-normal": {
    label: "Berat Badan Normal",
    color: chartColors.success,
  },
  // Status Lingkar Kepala (LK/U)
  "mikrosefali-berat": {
    label: "Mikrosefali Berat",
    color: chartColors.danger,
  },
  mikrosefali: {
    label: "Mikrosefali",
    color: chartColors.warning,
  },
  makrosefali: {
    label: "Makrosefali",
    color: chartColors.secondary,
  },
} satisfies ChartConfig;

// Helper function to normalize nutritional status
export const normalizeStatus = (status: string): string => {
  const lowerStatus = status.toLowerCase();
  
  // Status Gizi (BB/TB)
  if (lowerStatus.includes("buruk")) return "buruk";
  if (lowerStatus.includes("kurang") && lowerStatus.includes("gizi")) return "kurang";
  if (lowerStatus.includes("berisiko")) return "berisiko";
  if (lowerStatus.includes("lebih")) return "lebih";
  if (lowerStatus.includes("obesitas")) return "obesitas";
  if (lowerStatus.includes("baik") || lowerStatus.includes("normal")) {
    // Distinguish between different "normal" statuses
    if (lowerStatus.includes("berat badan")) return "bb-normal";
    return "baik";
  }
  
  // Status Tinggi Badan (TB/U)
  if (lowerStatus.includes("sangat pendek") || lowerStatus.includes("severely stunted")) return "sangat-pendek";
  if (lowerStatus.includes("pendek") || lowerStatus.includes("stunted")) return "pendek";
  if (lowerStatus.includes("tinggi") && !lowerStatus.includes("badan")) return "tinggi";
  
  // Status Berat Badan (BB/U)
  if (lowerStatus.includes("sangat kurang")) return "sangat-kurang";
  if (lowerStatus.includes("berat badan kurang")) return "bb-kurang";
  if (lowerStatus.includes("berat badan normal")) return "bb-normal";
  
  // Status Lingkar Kepala (LK/U)
  if (lowerStatus.includes("mikrosefali berat")) return "mikrosefali-berat";
  if (lowerStatus.includes("mikrosefali")) return "mikrosefali";
  if (lowerStatus.includes("makrosefali")) return "makrosefali";
  
  // Default to "normal" or "baik" for unrecognized statuses
  if (lowerStatus.includes("normal")) return "normal";
  
  return "count"; // fallback
};
