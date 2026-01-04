/**
 * Export Service
 * API calls for data export functionality
 * Backend handles Excel generation
 */

import axios from "axios";

export interface ExportFilters {
  startDate?: string;
  endDate?: string;
  posyanduId?: string;
}

// Create axios instance specifically for file downloads
const fileApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true,
  timeout: 30000, // Longer timeout for file downloads
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY || '',
  },
});

/**
 * Export Pengukuran Data
 * GET /api/v1/export/pengukuran
 * Downloads Excel file from backend
 */
export const exportPengukuran = async (
  filters: ExportFilters
): Promise<void> => {
  const params = new URLSearchParams();
  
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.posyanduId) params.append("posyanduId", filters.posyanduId);
  
  try {
    const response = await fileApi.get(`/export/pengukuran?${params.toString()}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });

    // Get filename from Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = "Pengukuran.xlsx";
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Download file
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Gagal export data pengukuran";
    throw new Error(message);
  }
};

/**
 * Export Anak Data
 * GET /api/v1/export/anak
 * Downloads Excel file from backend
 */
export const exportAnak = async (
  filters: ExportFilters
): Promise<void> => {
  const params = new URLSearchParams();
  
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.posyanduId) params.append("posyanduId", filters.posyanduId);
  
  try {
    const response = await fileApi.get(`/export/anak?${params.toString()}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });

    // Get filename from Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = "Data_Anak.xlsx";
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Download file
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Gagal export data anak";
    throw new Error(message);
  }
};
