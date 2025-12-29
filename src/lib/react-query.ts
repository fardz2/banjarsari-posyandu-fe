import { QueryClient } from "@tanstack/react-query";

/**
 * TanStack Query Client Configuration
 * 
 * Default configuration untuk semua queries dan mutations
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus (default: true)
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect (default: true)
      refetchOnReconnect: true,
      
      // Retry failed requests (default: 3)
      retry: 1,
      
      // Stale time: data dianggap fresh selama 5 menit
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache time: data disimpan di cache selama 10 menit
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      // Retry failed mutations (default: 0)
      retry: 0,
      
      // Error handling untuk mutations
      onError: (error: any) => {
        console.error("Mutation error:", error);
        // Error sudah di-handle oleh axios interceptor
        // Tambahan handling bisa ditambahkan di sini jika diperlukan
      },
    },
  },
});

/**
 * Query Keys Factory
 * 
 * Centralized query keys untuk consistency dan type safety
 */
export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },
  
  // Anak (Children)
  anak: {
    all: ["anak"] as const,
    lists: () => [...queryKeys.anak.all, "list"] as const,
    list: (filters: string) => [...queryKeys.anak.lists(), { filters }] as const,
    details: () => [...queryKeys.anak.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.anak.details(), id] as const,
  },
  
  // Pengukuran (Measurements)
  pengukuran: {
    all: ["pengukuran"] as const,
    lists: () => [...queryKeys.pengukuran.all, "list"] as const,
    list: (anakId: string) => [...queryKeys.pengukuran.lists(), { anakId }] as const,
    details: () => [...queryKeys.pengukuran.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.pengukuran.details(), id] as const,
  },
  
  // Ibu Hamil
  ibuHamil: {
    all: ["ibuHamil"] as const,
    lists: () => [...queryKeys.ibuHamil.all, "list"] as const,
    list: (filters: string) => [...queryKeys.ibuHamil.lists(), { filters }] as const,
    details: () => [...queryKeys.ibuHamil.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.ibuHamil.details(), id] as const,
  },
  
  // Pemeriksaan Ibu Hamil
  pemeriksaanIbuHamil: {
    all: ["pemeriksaanIbuHamil"] as const,
    lists: () => [...queryKeys.pemeriksaanIbuHamil.all, "list"] as const,
    list: (ibuHamilId: string) => [...queryKeys.pemeriksaanIbuHamil.lists(), { ibuHamilId }] as const,
    details: () => [...queryKeys.pemeriksaanIbuHamil.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.pemeriksaanIbuHamil.details(), id] as const,
  },
  
  // Posyandu
  posyandu: {
    all: ["posyandu"] as const,
    lists: () => [...queryKeys.posyandu.all, "list"] as const,
    list: (filters: string) => [...queryKeys.posyandu.lists(), { filters }] as const,
    details: () => [...queryKeys.posyandu.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.posyandu.details(), id] as const,
  },
} as const;
