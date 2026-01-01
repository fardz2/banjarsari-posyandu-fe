/**
 * Export Service
 * API calls for data export functionality
 * Backend handles Excel generation
 */

export interface ExportFilters {
  startDate?: string;
  endDate?: string;
  posyanduId?: string;
}

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
  
  // Make request with responseType blob to get file
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/export/pengukuran?${params.toString()}`,
    {
      method: "GET",
      credentials: "include", // Include cookies for auth
      headers: {
        "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Gagal export data");
  }

  // Get filename from Content-Disposition header
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = "Pengukuran.xlsx";
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }

  // Download file
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
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
  
  // Make request with responseType blob to get file
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/export/anak?${params.toString()}`,
    {
      method: "GET",
      credentials: "include", // Include cookies for auth
      headers: {
        "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Gagal export data");
  }

  // Get filename from Content-Disposition header
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = "Data_Anak.xlsx";
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }

  // Download file
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
