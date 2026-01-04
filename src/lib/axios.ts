// src/lib/axios.ts
import axios, { 
  AxiosError, 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, // Gunakan ini untuk interceptor request
  type AxiosResponse 
} from 'axios';
import { toast } from 'sonner';

interface ApiErrorResponse {
  message?: string;
  success?: boolean;
  errors?: Record<string, string | string[]>;
  data?: any;
}

// Custom axios instance type that returns unwrapped data
interface CustomAxiosInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'patch' | 'delete'> {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
  put<T = any>(url: string, data?: any, config?: any): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: any): Promise<T>;
  delete<T = any>(url: string, config?: any): Promise<T>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api: CustomAxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY || '', // Tambahkan API Key dari env
  },
}) as CustomAxiosInstance;



// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (import.meta.env.DEV) {
      console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(`✅ [API Success] ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`);
    }

    // Return response.data which contains the ApiResponse structure
    return response.data;
  },

  async (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    let message = 'Terjadi kesalahan. Silakan coba lagi nanti.';

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else {
      switch (status) {
        case 400:
          message = 'Permintaan tidak valid';
          break;
        case 401:
          message = 'Sesi telah berakhir. Silakan login kembali.';
          // Auto-logout: redirect to login page with callback URL
          setTimeout(() => {
            const currentPath = window.location.pathname + window.location.search;
            const callbackUrl = encodeURIComponent(currentPath);
            window.location.href = `/login?callback=${callbackUrl}`;
          }, 1500); // Delay untuk memberi waktu user membaca toast
          break;
        case 403:
          message = 'Anda tidak memiliki izin untuk melakukan tindakan ini.';
          break;
        case 404:
          message = 'Data tidak ditemukan.';
          break;
        case 422:
          if (error.response?.data?.errors) {
            const firstError = Object.values(error.response.data.errors)[0];
            message = Array.isArray(firstError) ? firstError[0] : (firstError as string);
          } else {
            message = 'Validasi gagal';
          }
          break;
        case 429:
          message = 'Terlalu banyak permintaan. Coba lagi nanti.';
          break;
        case 500:
        case 502:
        case 503:
          message = 'Server sedang bermasalah. Mohon tunggu sebentar.';
          break;
        default:
          if (!navigator.onLine) {
            message = 'Tidak ada koneksi internet.';
          } else if (error.code === 'ECONNABORTED') {
            message = 'Permintaan timeout. Coba lagi.';
          }
          break;
      }
    }

    // Tampilkan toast error
    toast.error(message);

    if (import.meta.env.DEV) {
      console.error('❌ [API Error]', {
        url: error.config?.url,
        status,
        data: error.response?.data,
      });
    }

    // Menambahkan userMessage ke dalam error object agar bisa diakses di .catch()
    const customError = {
      ...error,
      userMessage: message
    };

    return Promise.reject(customError);
  }
);

export default api;