# 📋 Posyandu Frontend - Project Context

> **Sistem Informasi Posyandu (Pos Pelayanan Terpadu)** - Aplikasi web untuk manajemen layanan kesehatan ibu dan anak di tingkat posyandu.

---

## 🎯 Project Overview

Aplikasi frontend untuk sistem informasi posyandu yang mengelola data kesehatan ibu hamil, balita, dan layanan posyandu. Dibangun dengan React dan TypeScript untuk memberikan pengalaman pengguna yang modern dan responsif.

---

## 🛠️ Tech Stack

### Core Framework & Build Tools

- **React 19.2.0** - Library UI utama dengan fitur terbaru
- **TypeScript 5.9.3** - Type safety dan developer experience yang lebih baik
- **Vite 7.2.4** - Build tool modern dengan HMR yang cepat
- **React Router 7.11.0** - Routing dan navigasi aplikasi

### Styling & UI

- **TailwindCSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/vite** - Plugin Vite untuk TailwindCSS v4
- **tw-animate-css** - Animasi CSS untuk Tailwind
- **Radix UI** - Komponen UI primitif yang accessible:
  - `@radix-ui/react-accordion`
  - `@radix-ui/react-label`
  - `@radix-ui/react-separator`
  - `@radix-ui/react-slot`
- **class-variance-authority (CVA)** - Utility untuk variant-based styling
- **clsx** & **tailwind-merge** - Utility untuk menggabungkan class names
- **lucide-react** - Icon library modern
- **next-themes** - Theme management (dark/light mode)

### State Management & Data Fetching

- **@tanstack/react-query 5.90.12** - Server state management dan caching
- **Axios 1.13.2** - HTTP client dengan interceptors

### Form Management

- **react-hook-form 7.69.0** - Form state management yang performant
- **@hookform/resolvers** - Resolvers untuk validasi schema
- **Zod 4.2.1** - Schema validation dan type inference

### Authentication

- **better-auth 1.4.9** - Authentication library modern
  - Menggunakan plugin `usernameClient` untuk username-based auth
  - Cookie-based session management

### UI Feedback

- **sonner 2.0.7** - Toast notifications yang modern dan customizable

### Development Tools

- **ESLint 9.39.1** - Linting dengan konfigurasi modern
- **TypeScript ESLint** - TypeScript-specific linting rules
- **@vitejs/plugin-react** - Plugin React untuk Vite dengan Fast Refresh

---

## 📁 Project Structure

```
posyandu-fe/
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # React components
│   │   ├── landing/         # Landing page components
│   │   │   ├── feature.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── registration-flow.tsx
│   │   │   └── service.tsx
│   │   ├── dialogs/         # Reusable dialog components
│   │   │   ├── confirm-dialog.tsx  # Confirmation dialog wrapper
│   │   │   ├── export-dialog.tsx   # Export data dialog
│   │   │   ├── form-dialog.tsx     # Form dialog wrapper
│   │   │   ├── forum-filter-dialog.tsx # Forum filter dialog (TENAGA_KESEHATAN & SUPER_ADMIN)
│   │   │   ├── user-filter-dialog.tsx # User filter dialog
│   │   │   └── index.ts            # Barrel export
│   │   ├── layout/          # Layout components
│   │   │   ├── list-page-layout.tsx
│   │   │   └── protected/
│   │   │       ├── protected-layout.tsx
│   │   │       └── dashboard-layout.tsx
│   │   ├── skeletons/       # Loading skeletons
│   │   │   ├── card-grid-skeleton.tsx  # Card grid skeleton for list pages
│   │   │   ├── chart-skeleton.tsx      # Chart skeleton for dashboard
│   │   │   ├── dashboard-layout-skeleton.tsx
│   │   │   ├── dashboard-skeleton.tsx
│   │   │   ├── detail-skeleton.tsx
│   │   │   ├── form-skeleton.tsx
│   │   │   ├── profile-skeleton.tsx
│   │   │   └── table-skeleton.tsx
│   │   └── ui/              # Reusable UI primitives (shadcn/ui style)
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx  # Base alert dialog primitive
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx      # Checkbox component (Radix UI)
│   │       ├── dialog.tsx        # Base dialog primitive
│   │       ├── empty.tsx
│   │       ├── field.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx         # Sheet/Drawer component
│   │       ├── sidebar.tsx       # Sidebar navigation component
│   │       ├── skeleton.tsx      # Loading skeleton
│   │       ├── sonner.tsx
│   │       ├── table.tsx         # Data table component
│   │       └── tooltip.tsx       # Tooltip component
│   ├── hooks/               # Custom React hooks (TanStack Query)
│   │   ├── anak/            # Anak-related hooks
│   │   │   ├── index.ts     # Barrel export
│   │   │   ├── useAnak.ts   # Query hooks
│   │   │   ├── useAnakMutations.ts
│   │   │   ├── usePengukuran.ts
│   │   │   └── usePengukuranMutations.ts
│   │   ├── ibu-hamil/       # Ibu hamil hooks
│   │   │   ├── index.ts
│   │   │   ├── useIbuHamil.ts
│   │   │   ├── useIbuHamilMutations.ts
│   │   │   ├── usePemeriksaanIbuHamil.ts
│   │   │   └── usePemeriksaanIbuHamilMutations.ts
│   │   ├── posyandu/        # Posyandu hooks
│   │   │   ├── index.ts
│   │   │   └── usePosyandu.ts
│   │   ├── user/            # User hooks
│   │   │   └── index.ts
│   │   ├── ortu/            # Ortu hooks
│   │   │   └── index.ts
│   │   └── index.ts         # Main barrel export
│   ├── lib/                 # Utility libraries dan configurations
│   │   ├── auth-client.ts   # Better-auth client configuration
│   │   ├── axios.ts         # Axios instance dengan interceptors
│   │   ├── react-query.ts   # TanStack Query config & query keys
│   │   └── utils.ts         # Utility functions (cn, etc.)
│   ├── pages/               # Page components
│   │   ├── auth/            # Authentication pages
│   │   │   └── login.tsx
│   │   ├── protected/       # Protected pages (requires auth)
│   │   │   └── dashboard/
│   │   │       └── dashboard.tsx
│   │   │   └── dashboard-layout.tsx
│   │   ├── public/          # Public pages
│   │   │   └── landing.tsx
│   │   └── not-found.tsx    # 404 page
│   ├── routes/              # Routing configuration
│   │   └── router.tsx       # React Router setup
│   ├── services/            # API service layer
│   │   ├── anak.service.ts  # Anak & Pengukuran API calls
│   │   ├── ibu-hamil.service.ts
│   │   ├── ortu.service.ts
│   │   ├── posyandu.service.ts
│   │   ├── user.service.ts
│   │   └── index.ts         # Barrel export
│   ├── types/               # TypeScript type definitions
│   │   ├── api.types.ts     # Generic API response types
│   │   ├── auth.types.ts    # Auth-related types
│   │   ├── better-auth.d.ts # Better Auth types
│   │   ├── posyandu.types.ts # Domain types (Anak, IbuHamil, User, Ortu, etc.)
│   │   └── index.ts         # Barrel export
│   ├── utils/               # Utility functions and schemas
│   │   └── validations/     # Zod validation schemas
│   │       ├── auth.validation.ts
│   │       ├── profile.validation.ts
│   │       ├── posyandu.validation.ts
│   │       ├── user-filter.validation.ts
│   │       ├── anak.validation.ts
│   │       ├── pengukuran.validation.ts
│   │       ├── forum-filter.validation.ts
│   │       └── index.ts     # Barrel export
│   ├── index.css            # Global styles dan Tailwind config
│   └── main.tsx             # Application entry point
├── public/                  # Public static files
├── .env                     # Environment variables
├── CONTEXT.md               # Project documentation (this file)
├── USAGE_EXAMPLES.md        # Code usage examples
├── components.json          # shadcn/ui configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies dan scripts
├── tsconfig.json            # TypeScript configuration (root)
├── tsconfig.app.json        # TypeScript config untuk app
├── tsconfig.node.json       # TypeScript config untuk Node
└── vite.config.ts           # Vite configuration
```

---

## 🎨 Styling System

### TailwindCSS v4 Configuration

Project ini menggunakan **TailwindCSS v4** dengan konfigurasi inline di `src/index.css`:

#### Custom Variants

```css
@custom-variant dark (&:is(.dark *));
```

#### Design Tokens

- **Border Radius**: `--radius` dengan variants (sm, md, lg, xl, 2xl, 3xl, 4xl)
- **Color System**: Menggunakan OKLCH color space untuk konsistensi warna
  - Background, Foreground
  - Card, Popover
  - Primary, Secondary, Muted, Accent
  - Destructive, Border, Input, Ring
  - Chart colors (1-5)
  - Sidebar colors

#### Theme Support

- **Light Mode**: Default theme dengan warna terang
- **Dark Mode**: Automatic dark mode dengan `.dark` class
- Managed by `next-themes` untuk seamless switching

### Component Styling Pattern

Menggunakan **CVA (Class Variance Authority)** untuk variant-based components:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "...",
      destructive: "...",
    },
    size: {
      default: "...",
      sm: "...",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

### Utility Functions

**`cn()` function** di `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Digunakan untuk menggabungkan class names dengan conflict resolution.

---

## 🔐 Authentication System

### Better-Auth Configuration

**File**: `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  plugins: [usernameClient()],
  fetchOptions: {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY || "",
    },
  },
  credentials: "include",
  cookiePrefix: "banjarsari",
});
```

### Authentication Flow

1. **Login**: Username/password authentication via `authClient`
2. **Session**: Cookie-based session management with cross-origin support
3. **Protected Routes**: Menggunakan loader-based authentication dengan `getSession()`
4. **Auto-redirect**: Redirect ke login jika tidak authenticated

### Loader-Based Authentication Pattern

**File**: `src/lib/auth-loaders.ts`

Project ini menggunakan **loader-based authentication** untuk melakukan pengecekan autentikasi sebelum route di-render:

```typescript
import { redirect } from "react-router";
import { authClient } from "./auth-client";

// Protected Loader - untuk route yang memerlukan autentikasi
export const protectedLoader = async ({ request }: { request: Request }) => {
  const session = await authClient.getSession();

  if (!session?.data) {
    const url = new URL(request.url);
    const callbackUrl = url.pathname + url.search;
    throw redirect(`/login?callback=${encodeURIComponent(callbackUrl)}`);
  }

  return { session: session.data };
};

// Auth Loader - untuk halaman login/register
export const authLoader = async ({ request }: { request: Request }) => {
  const session = await authClient.getSession();

  if (session?.data) {
    const callbackUrl = new URL(request.url).searchParams.get("callback");
    throw redirect(callbackUrl || "/dashboard");
  }

  return null;
};
```

**Router Configuration**:

```typescript
// router.tsx
// Auth routes
{
  path: "/login",
  element: <Login />,
  loader: authLoader, // Redirect to dashboard if already authenticated
}

// Protected routes
{
  element: <DashboardLayout />,
  loader: protectedLoader, // Check authentication before rendering
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    // Other protected routes...
  ],
}
```

**Key Points**:

- ✅ Uses `getSession()` instead of `useSession()` (no React hooks in loaders)
- ✅ Authentication check happens before component render
- ✅ No flash of content before redirect
- ✅ Callback URL preserved for post-login navigation

### Security Configuration

#### API Key Protection (Double Protection)

Untuk keamanan tambahan, backend mewajibkan header `x-api-key` di setiap request. Konfigurasi ini diterapkan di:

1.  **Axios (`src/lib/axios.ts`)**: Header `x-api-key` ditambahkan otomatis ke semua request API.
2.  **Better Auth (`src/lib/auth-client.ts`)**: Header `x-api-key` ditambahkan via `fetchOptions` untuk request autentikasi.

**Environment Variable**:
Pastikan `VITE_API_KEY` diset di `.env`:

```env
VITE_API_KEY=your-secure-api-key
```

### RBAC Components

#### `<Can />` Component

Untuk mengontrol visibilitas elemen UI berdasarkan role user.

**Props**:

- `allowedRoles`: Array role yang diizinkan (e.g. `["ADMIN", "KADER_POSYANDU"]`)
- `redirectTo`: (Optional) URL redirect jika tidak punya akses (default: `/dashboard`)
- `hideOnly`: (Optional) Boolean. Jika `true`, komponen hanya disembunyikan tanpa redirect.

**Usage**:

```tsx
// Redirect jika tidak punya akses
<Can allowedRoles={["SUPER_ADMIN"]}>
  <AdminPage />
</Can>

// Sembunyikan tombol (tanpa redirect)
<Can allowedRoles={["ADMIN"]} hideOnly>
  <Button>Add</Button>
</Can>
```

---

## 🌐 API Integration

### Axios Configuration

**File**: `src/lib/axios.ts`

#### Base Setup

```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
```

#### Request Interceptor

- Logging request di development mode
- Format: `🚀 [API Request] METHOD URL`

#### Response Interceptor

- **Success**: Unwrap data dari response format `{ success: true, data: ... }`
- **Error Handling**: Comprehensive error handling dengan user-friendly messages
  - 400: Permintaan tidak valid
  - 401: Sesi berakhir, redirect ke login
  - 403: Tidak ada izin
  - 404: Data tidak ditemukan
  - 422: Validasi gagal (menampilkan error pertama)
  - 429: Rate limit exceeded
  - 500/502/503: Server error
  - Network errors: Offline detection, timeout handling

#### Toast Notifications

Semua error otomatis ditampilkan via `toast.error()` dari Sonner.

### API Response Format

**Expected Backend Response**:

```typescript
{
  success: boolean;
  data?: any;
  message?: string;
  errors?: Record<string, string | string[]>;
}
```

### Usage Pattern

```typescript
import api from "@/lib/axios";

// GET request
const data = await api.get("/endpoint");

// POST request
const result = await api.post("/endpoint", { payload });

// Error handling
try {
  const data = await api.get("/endpoint");
} catch (error: any) {
  // error.userMessage tersedia dari interceptor
  console.error(error.userMessage);
}
```

### Available API Endpoints

Backend menyediakan endpoint berikut yang dapat diakses dari frontend:

#### Authentication (`/api/auth/*`)

Dihandle otomatis oleh Better Auth:

- `POST /api/auth/sign-up/email` - Registrasi user baru
- `POST /api/auth/sign-in/email` - Login dengan email & password
- `POST /api/auth/sign-out` - Logout user
- `GET /api/auth/session` - Mendapatkan session user saat ini

#### API Version 1 (`/api/v1`)

**Base URL**: `http://localhost:3001/api/v1`

- **Users** (`/api/v1/users/*`) - User management dan profile
- **Posyandu** (`/api/v1/posyandu/*`) - Data posyandu
- **Anak** (`/api/v1/anak/*`) - Data anak/balita
- **Pengukuran** (`/api/v1/pengukuran/*`) - Pengukuran antropometri anak
- **Ibu Hamil** (`/api/v1/ibu-hamil/*`) - Data ibu hamil
- **Ortu** (`/api/v1/ortu/*`) - Data orang tua
- **Forum** (`/api/v1/forum/*`) - Forum tanya jawab dengan tenaga kesehatan
  - Supports filtering by `status` (OPEN/ANSWERED/CLOSED) and `posyanduId`
  - Filter available for TENAGA_KESEHATAN & SUPER_ADMIN roles

> **Note**: Untuk detail lengkap endpoint, parameter, permission matrix, dan response format, lihat [Backend CONTEXT.md](../posyandu-be/CONTEXT.md#2-endpoint-yang-sudah-ada).

---

## � Localization & Language Support

### Indonesian Language (Bahasa Indonesia)

Aplikasi ini menggunakan **Bahasa Indonesia** sebagai bahasa utama untuk meningkatkan user experience bagi pengguna lokal.

#### Localized Pages

**Dashboard Page** (`src/pages/protected/dashboard/dashboard.tsx`):

- Welcome message: "Selamat datang kembali"
- Statistics cards: "Pengguna", "Lokasi posyandu aktif", "Ibu hamil terdaftar", dll.
- Quick actions: "Aksi Cepat", "Tambah Anak Baru", "Catat Pengukuran", "Daftar Ibu Hamil"
- Descriptions: Semua deskripsi dalam bahasa Indonesia

**Users Page** (`src/pages/protected/users/users-list.tsx`):

- Page title: "Pengguna"
- Actions: "Tambah Pengguna", "Edit Pengguna", "Hapus"
- Dialogs: "Apakah Anda yakin?", "Tetapkan Peran"
- Descriptions: "Kelola akun pengguna dan izin akses"

#### Routing Simplification

**Orang Tua Route**:

- ❌ Removed: `/dashboard/my-children` (duplicate route)
- ✅ Unified: Orang Tua menggunakan `/dashboard/anak` yang sama dengan role lainnya
- RBAC handling dilakukan di level component, bukan routing

**Benefits**:

- Simplified routing structure
- Consistent URL patterns across all roles
- Easier maintenance and navigation

---

## �🏗️ Architecture & Code Organization

### Layered Architecture

Project ini menggunakan **layered architecture** dengan separation of concerns:

1. **Service Layer** (`src/services/`) - API calls
2. **Custom Hooks** (`src/hooks/`) - TanStack Query hooks
3. **Types** (`src/types/`) - TypeScript definitions
4. **Validations** (`src/utils/validations/`) - Zod schemas
5. **Components** (`src/components/`) - UI components
6. **Pages** (`src/pages/`) - Page components

### Barrel Export Pattern

Menggunakan `index.ts` files untuk clean imports:

```typescript
// ✅ With barrel exports (from a page component)
import { useAnak, useCreateAnak } from "../../hooks";
import type { Anak, ApiResponse } from "../../types";
import { loginSchema, type LoginFormValues } from "../../utils/validations";

// From a hook file
import { getAllAnak } from "../../services";
import type { PaginationParams } from "../../types";
import { queryKeys } from "../../lib/react-query";
```

---

## 🔧 Service Layer

**Location**: `src/services/`

Service layer untuk HTTP requests ke backend API:

```typescript
// src/services/anak.service.ts
import api from "../lib/axios";
import type { Anak, ApiResponse, PaginatedResponse } from "../types";

export const getAllAnak = async (
  params?: PaginationParams
): Promise<PaginatedResponse<Anak>> => {
  return await api.get<PaginatedResponse<Anak>>("/anak", { params });
};

export const getAnakById = async (id: string): Promise<ApiResponse<Anak>> => {
  return await api.get<ApiResponse<Anak>>(`/anak/${id}`);
};

export const createAnak = async (
  data: Partial<Anak>
): Promise<ApiResponse<Anak>> => {
  return await api.post<ApiResponse<Anak>>("/anak", data);
};

export const updateAnak = async (
  id: string,
  data: Partial<Anak>
): Promise<ApiResponse<Anak>> => {
  return await api.put<ApiResponse<Anak>>(`/anak/${id}`, data);
};

export const deleteAnak = async (id: string): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`/anak/${id}`);
};
```

**Import Pattern**:

```typescript
// From a page component (src/pages/auth/login.tsx)
import { getAllAnak, createAnak } from "../../services";

// From a hook (src/hooks/anak/useAnak.ts)
import { getAllAnak, getAnakById } from "../../services";
```

---

## 🎣 Custom Hooks Layer

**Location**: `src/hooks/`

Custom hooks menggunakan **TanStack Query** untuk data fetching dan mutations.

### Query Hooks (GET)

```typescript
// src/hooks/anak/useAnak.ts
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/react-query";
import { getAllAnak, getAnakById } from "../../services";

export const useAnak = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.anak.list(JSON.stringify(params || {})),
    queryFn: () => getAllAnak(params),
  });
};

export const useAnakDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.anak.detail(id),
    queryFn: () => getAnakById(id),
    enabled: !!id,
  });
};
```

### Mutation Hooks (POST/PUT/DELETE)

**All mutations now use Optimistic Updates** for instant UI feedback:

```typescript
// src/hooks/anak/useAnakMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { createAnak, updateAnak, deleteAnak } from "../../services";

export const useCreateAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnakInput) => createAnak(data),

    // Optimistic update - instant UI feedback
    onMutate: async (newAnak) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.lists() });
      const previousData = queryClient.getQueryData(queryKeys.anak.lists());

      // Update cache optimistically
      queryClient.setQueryData(queryKeys.anak.lists(), (old: any) => {
        if (!old) return old;
        const tempAnak = {
          ...newAnak,
          nik: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        return {
          ...old,
          data: [tempAnak, ...old.data],
          meta: { ...old.meta, total: old.meta.total + 1 },
        };
      });

      return { previousData };
    },

    // Rollback on error
    onError: (error: any, _newAnak, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.anak.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menambahkan data anak.");
    },

    // Sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
    },

    onSuccess: () => {
      toast.success("Data anak berhasil ditambahkan!");
    },
  });
};

export const useUpdateAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nik, data }: { nik: string; data: UpdateAnakInput }) =>
      updateAnak(nik, data),

    onMutate: async ({ nik, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.detail(nik) });

      const previousList = queryClient.getQueryData(queryKeys.anak.lists());
      const previousDetail = queryClient.getQueryData(
        queryKeys.anak.detail(nik)
      );

      // Update both list and detail
      queryClient.setQueryData(queryKeys.anak.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: Anak) =>
            item.nik === nik ? { ...item, ...data } : item
          ),
        };
      });

      queryClient.setQueryData(queryKeys.anak.detail(nik), (old: any) => {
        if (!old) return old;
        return { ...old, data: { ...old.data, ...data } };
      });

      return { previousList, previousDetail };
    },

    onError: (error: any, { nik }, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.anak.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(
          queryKeys.anak.detail(nik),
          context.previousDetail
        );
      }
      toast.error(error.userMessage || "Gagal memperbarui data anak.");
    },

    onSettled: (_data, _error, { nik }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.detail(nik) });
    },

    onSuccess: () => {
      toast.success("Data anak berhasil diperbarui!");
    },
  });
};

export const useDeleteAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nik: string) => deleteAnak(nik),

    onMutate: async (nik) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.lists() });
      const previousData = queryClient.getQueryData(queryKeys.anak.lists());

      // Remove from cache immediately
      queryClient.setQueryData(queryKeys.anak.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: Anak) => item.nik !== nik),
          meta: { ...old.meta, total: old.meta.total - 1 },
        };
      });

      return { previousData };
    },

    onError: (error: any, _nik, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.anak.lists(), context.previousData);
      }
      toast.error(error.userMessage || "Gagal menghapus data anak.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
    },

    onSuccess: () => {
      toast.success("Data anak berhasil dihapus!");
    },
  });
};
```

**Optimistic Updates Pattern**:

1. **`onMutate`**: Cancel queries, snapshot previous data, update cache optimistically
2. **`onError`**: Rollback to previous data if request fails
3. **`onSettled`**: Invalidate queries to sync with server
4. **`onSuccess`**: Show success toast

**Benefits**:

- ✅ Instant UI feedback - users see changes immediately
- ✅ Automatic rollback - changes revert if request fails
- ✅ Better UX - application feels more responsive
- ✅ Eventual consistency - data syncs with server after mutation

**Modules with Optimistic Updates**:

- Anak mutations (create, update, delete)
- Pengukuran mutations (create, update, delete)
- Forum mutations (create, update, delete, add comment)
- Ibu Hamil mutations (create, update, delete)
- Ortu mutations (update, delete)
- User mutations (create, update, delete, assign role)

  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: (id: string) => deleteAnak(id),
  onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
  toast.success("Data anak berhasil dihapus");
  },
  });
  };

````

### Usage in Components

```typescript
import { useAnak, useCreateAnak, useDeleteAnak } from "../../hooks";

function AnakList() {
  const { data, isLoading } = useAnak({ page: 1, limit: 10 });
  const createMutation = useCreateAnak();
  const deleteMutation = useDeleteAnak();

  const handleCreate = async (formData: Partial<Anak>) => {
    await createMutation.mutateAsync(formData);
  };

  if (isLoading) return <div>Loading...</div>;

  return <div>{/* Render data */}</div>;
}
````

---

## 📦 Types System

**Location**: `src/types/`

Centralized TypeScript type definitions.

### API Types

```typescript
// src/types/api.types.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string | string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UserFilterParams {
  role?: string;
  posyanduId?: string;
}
```

### Domain Types

```typescript
// src/types/posyandu.types.ts
export interface Anak {
  id: string;
  nik: string;
  nama: string;
  jenisKelamin: "L" | "P";
  tanggalLahir: string;
  // ...
}

export interface IbuHamil {
  id: string;
  nik: string;
  nama: string;
  // ...
}
```

**Import Pattern**:

```typescript
// From a service file (src/services/anak.service.ts)
import type { Anak, ApiResponse, PaginatedResponse } from "../types";

// From a hook (src/hooks/anak/useAnak.ts)
import type { Anak, ApiResponse, PaginationParams } from "../../types";

// From a page component (src/pages/dashboard/anak.tsx)
import type { Anak, IbuHamil } from "../../types";
```

---

## 👤 Profile Management Feature

**Location**: `src/pages/protected/profile/profile.tsx`

### Overview

Complete profile management page using **Better Auth** for authentication and profile updates. Allows users to update their personal information and change password securely.

### Features

#### 1. Profile Information Update

- Update name (required)
- Update username (optional, 3-30 characters)
- Form validation with Zod schema
- Uses Better Auth's `updateUser()` method

#### 2. Account Details Display

Read-only display of:

- Email address
- User role (formatted)
- Posyandu assignment (if applicable)
- Member since date (Indonesian format)

#### 3. Change Password

- Current password verification
- New password (minimum 6 characters)
- Password confirmation with validation
- Uses Better Auth's `changePassword()` method

### Better Auth Integration

```typescript
// Get current user session
const { data: session, isPending } = authClient.useSession();

// Update user profile
await authClient.updateUser({
  name: values.name,
  username: values.username,
});

// Change password
await authClient.changePassword({
  currentPassword: values.currentPassword,
  newPassword: values.newPassword,
  revokeOtherSessions: false,
});
```

### Validation Schemas

**File**: `src/utils/validations/profile.validation.ts`

```typescript
// Profile update schema
export const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(30, "Username maksimal 30 karakter")
    .optional(),
});

// Change password schema
export const profileChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

// Type inference
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ProfileChangePasswordFormValues = z.infer<
  typeof profileChangePasswordSchema
>;
```

### Loading Skeleton

**File**: `src/components/skeletons/profile-skeleton.tsx`

Dedicated skeleton component matching profile page layout:

- Header skeleton
- Profile information card skeleton
- Account details card skeleton
- Change password card skeleton

### Usage Example

```typescript
import {
  profileSchema,
  profileChangePasswordSchema,
} from "../../../utils/validations";
import { ProfileSkeleton } from "../../../components/skeletons/profile-skeleton";
import { authClient } from "../../../lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <ProfileSkeleton />;
  }

  // Render profile forms...
}
```

### Route Configuration

```typescript
// router.tsx
{
  path: "/dashboard/profile",
  element: <ProfilePage />,
}
```

### Navigation

Profile link available in sidebar navigation for all authenticated users:

- Icon: `UserCircle` from lucide-react
- Path: `/dashboard/profile`
- Label: "Profile"

### Benefits of Better Auth Approach

1. **Simplified Architecture**: No custom API endpoints needed
2. **Automatic Session Sync**: Session updates automatically after changes
3. **Built-in Security**: Better Auth handles password hashing and validation
4. **Consistent Auth Flow**: All auth operations use same library
5. **Type Safety**: TypeScript types provided out of the box

---

## ✅ Validation System

**Location**: `src/utils/validations/`

Zod schemas untuk form validation.

```typescript
// src/utils/validations/auth.validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(3, "Username atau email minimal 3 karakter."),
  password: z.string().min(6, "Password minimal 6 karakter."),
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email("Email tidak valid."),
    name: z.string().min(3, "Nama minimal 3 karakter."),
    password: z.string().min(6, "Password minimal 6 karakter."),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

// Type inference
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
```

**Usage with React Hook Form**:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../../utils/validations";

const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    identifier: "",
    password: "",
    rememberMe: false,
  },
});
```

---

## 🔄 TanStack Query Configuration

**File**: `src/lib/react-query.ts`

### Query Client

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Query Keys Factory

```typescript
export const queryKeys = {
  anak: {
    all: ["anak"] as const,
    lists: () => [...queryKeys.anak.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.anak.lists(), { filters }] as const,
    details: () => [...queryKeys.anak.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.anak.details(), id] as const,
  },
  pengukuran: {
    all: ["pengukuran"] as const,
    lists: () => [...queryKeys.pengukuran.all, "list"] as const,
    list: (anakId: string) =>
      [...queryKeys.pengukuran.lists(), { anakId }] as const,
    details: () => [...queryKeys.pengukuran.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.pengukuran.details(), id] as const,
  },
  // ... other query keys
} as const;
```

**Benefits**:

- Type-safe query keys
- Centralized key management
- Easy invalidation

```typescript
// Invalidate all anak queries
queryClient.invalidateQueries({ queryKey: queryKeys.anak.all });

// Invalidate only lists
queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });

// Invalidate specific detail
queryClient.invalidateQueries({ queryKey: queryKeys.anak.detail("123") });
```

---

## 📋 Import Patterns

### Complete Import Example

```typescript
// ===== EXAMPLE: src/pages/auth/login.tsx =====

// External libraries
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";

// Lib & utilities
import { authClient } from "../../lib/auth-client";
import { cn } from "../../lib/utils";

// Types
import type { Anak, ApiResponse } from "../../types";

// Validations
import { loginSchema, type LoginFormValues } from "../../utils/validations";

// Hooks (rarely import services directly, use hooks instead)
import { useAnak, useCreateAnak } from "../../hooks";

// Components
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
```

### Barrel Export Benefits

```typescript
// ❌ Without barrel exports
import { useAnak } from "../../hooks/anak/useAnak";
import { useCreateAnak } from "../../hooks/anak/useAnakMutations";
import { getAllAnak } from "../../services/anak.service";

// ✅ With barrel exports
import { useAnak, useCreateAnak } from "../../hooks";
import { getAllAnak } from "../../services";
```

### Relative Imports

Project ini menggunakan **relative imports** untuk semua file internal:

```typescript
// ✅ Correct - Relative imports
import { Button } from "../../components/ui/button";
import { useAnak } from "../../hooks";
import type { Anak } from "../../types";

// Note: Path alias @/ dikonfigurasi di tsconfig tapi tidak digunakan
// Gunakan relative imports (../) untuk consistency
```

---

## 📝 Form Management

### React Hook Form + Zod Pattern

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define schema
const loginSchema = z.object({
  identifier: z.string().min(1, "Username/email wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

// 2. Setup form
const form = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    identifier: "",
    password: "",
    rememberMe: false,
  },
});

// 3. Handle submit
const onSubmit = async (data: LoginForm) => {
  // Handle form submission
};
```

### Field Component Pattern

Menggunakan custom `Field` component untuk form fields:

```typescript
<Field label="Username" error={errors.identifier?.message} required>
  <Input {...register("identifier")} />
</Field>
```

---

## 🗂️ Component Organization

### UI Components (shadcn/ui style)

**Location**: `src/components/ui/`

Komponen reusable yang mengikuti pola shadcn/ui:

- Menggunakan Radix UI primitives
- Styled dengan TailwindCSS
- Type-safe dengan TypeScript
- Accessible by default

**Example**: `button.tsx`

```typescript
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(/* ... */);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### Feature Components

**Location**: `src/components/landing/`, etc.

Komponen spesifik untuk fitur tertentu:

- `hero.tsx` - Hero section landing page
- `feature.tsx` - Feature showcase
- `service.tsx` - Service information
- `registration-flow.tsx` - Registration flow visualization
- `footer.tsx` - Footer component

### Dialog Components

**Location**: `src/components/dialogs/`

Reusable dialog wrappers yang menyederhanakan implementasi dialog di seluruh aplikasi.

#### ConfirmDialog

Wrapper untuk confirmation dialogs (delete, destructive actions, etc.).

**Props**:

```typescript
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string; // Default: "Confirm"
  cancelText?: string; // Default: "Cancel"
  onConfirm: () => void | Promise<void>;
  variant?: "default" | "destructive"; // Default: "default"
  loading?: boolean; // External loading state (optional)
}
```

**Usage Example**:

```typescript
import { ConfirmDialog } from "../../components/dialogs";

function MyListPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeleteItem();

  return (
    <>
      {/* Your list content */}

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Data?"
        description="Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen."
        confirmText="Hapus"
        cancelText="Batal"
        variant="destructive"
        onConfirm={() => deleteMutation.mutate(deleteId!)}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
```

**Features**:

- ✅ Automatic loading state management (internal or external)
- ✅ Disabled buttons during async operations
- ✅ Error handling via parent component
- ✅ Automatic dialog close on success
- ✅ Destructive variant with red styling

#### FormDialog

Wrapper untuk form dialogs (create, edit, etc.).

**Props**:

```typescript
interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitText?: string; // Default: "Submit"
  cancelText?: string; // Default: "Cancel"
  onSubmit?: () => void | Promise<void>; // Optional, form can handle its own submission
  loading?: boolean; // External loading state (optional)
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl"; // Default: "sm"
  hideFooter?: boolean; // Default: false
}
```

**Usage Example**:

```typescript
import { FormDialog } from "../../components/dialogs";

function MyListPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <>
      <Button
        onClick={() => {
          setEditingId(null);
          setIsDialogOpen(true);
        }}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Tambah Item
      </Button>

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingId ? "Edit Item" : "Tambah Item Baru"}
        maxWidth="md"
        hideFooter // Form handles its own submission
      >
        <ItemForm
          id={editingId || undefined}
          onSuccess={() => setIsDialogOpen(false)}
        />
      </FormDialog>
    </>
  );
}
```

**Features**:

- ✅ Flexible footer (can be hidden if form handles submission)
- ✅ Multiple width options (sm, md, lg, xl, 2xl)
- ✅ Optional description
- ✅ Automatic loading state management
- ✅ Optional `onSubmit` handler (if not using form's own handler)

**Best Practices**:

1. Use `hideFooter={true}` when form component handles its own submission
2. Pass `onSuccess` callback to form to close dialog after successful submission
3. Use `maxWidth` to control dialog size based on form complexity
4. For delete confirmations, always use `ConfirmDialog` with `variant="destructive"`
5. Keep dialog trigger buttons outside of dialog component (not using `DialogTrigger`)

**Migration from Raw Dialogs**:

```typescript
// ❌ Before - Raw AlertDialog (verbose)
<AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
      <AlertDialogDescription>
        Tindakan ini tidak dapat dibatalkan...
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
        {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// ✅ After - ConfirmDialog (concise)
<ConfirmDialog
  open={deleteId !== null}
  onOpenChange={(open) => !open && setDeleteId(null)}
  title="Hapus Data?"
  description="Tindakan ini tidak dapat dibatalkan..."
  confirmText="Hapus"
  cancelText="Batal"
  variant="destructive"
  onConfirm={() => deleteMutation.mutate(deleteId!)}
  loading={deleteMutation.isPending}
/>
```

**Current Usage**:
All list pages (`*-list.tsx`) in the application use these dialog components:

- ✅ `posyandu-list.tsx` - ConfirmDialog, FormDialog
- ✅ `anak-list.tsx` - ConfirmDialog, FormDialog
- ✅ `ibu-hamil-list.tsx` - ConfirmDialog, FormDialog
- ✅ `ortu-list.tsx` - ConfirmDialog, FormDialog
- ✅ `pengukuran-list.tsx` - ConfirmDialog
- ✅ `users-list.tsx` - ConfirmDialog, FormDialog

### Layout Components

**Location**: `src/components/layout/`

- `protected-layout.tsx` - Layout untuk protected routes dengan auth check

---

## 🚀 Routing System

### React Router v7 Configuration

**File**: `src/routes/router.tsx`

```typescript
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },

  // Protected Routes
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      // Add more protected routes here
    ],
  },

  // Utility Routes
  { path: "", element: <Navigate to="/" replace /> },
  { path: "*", element: <NotFound /> },
]);
```

### Route Categories

1. **Public Routes**: Accessible tanpa authentication

   - `/` - Landing page
   - `/login` - Login page

2. **Protected Routes**: Requires authentication

   - `/dashboard` - Dashboard utama
   - (Tambahkan rute protected lainnya di sini)

3. **Utility Routes**:
   - Empty path redirects to `/`
   - `*` (404) menampilkan NotFound page

---

## 🔧 Development Workflow

### Environment Variables

**File**: `.env`

```env
# Base URL untuk Better Auth
VITE_BASE_URL=http://localhost:3001

# Base URL untuk API calls (digunakan oleh axios)
VITE_API_BASE_URL=http://localhost:3001
```

### Available Scripts

```bash
# Development server dengan HMR
npm run dev

# Type-check dan build untuk production
npm run build

# Lint codebase
npm run lint

# Preview production build
npm run preview
```

### TypeScript Configuration

**Path Alias Configured**: `@/*` → `./src/*` (dikonfigurasi di `tsconfig.json`)

**Note**: Meskipun path alias `@/*` sudah dikonfigurasi, project ini menggunakan **relative imports** untuk consistency.

```typescript
// ✅ Gunakan relative imports
import { Button } from "../../components/ui/button";
import api from "../../lib/axios";
import { cn } from "../../lib/utils";

// ❌ Jangan gunakan path alias @/
// import { Button } from "@/components/ui/button";
```

### ESLint Configuration

Modern flat config di `eslint.config.js` dengan:

- TypeScript support
- React hooks rules
- React refresh rules

---

## 📐 Coding Conventions

### File Naming

- **Components**: PascalCase (`Button.tsx`, `LoginForm.tsx`)
- **Utilities**: kebab-case (`auth-client.ts`, `axios.ts`)
- **Pages**: kebab-case atau PascalCase (`login.tsx`, `dashboard.tsx`)

### Component Structure

```typescript
// 1. Imports
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

// 3. Component
export default function Component({ title, onSubmit }: ComponentProps) {
  // 3a. Hooks
  const form = useForm();

  // 3b. Handlers
  const handleClick = () => {
    // ...
  };

  // 3c. Render
  return <div>{/* JSX */}</div>;
}
```

### TypeScript Best Practices

1. **Type Inference**: Gunakan `z.infer<typeof schema>` untuk form types
2. **Explicit Types**: Define interfaces untuk props dan API responses
3. **Type Safety**: Avoid `any`, gunakan `unknown` jika perlu
4. **Generics**: Gunakan untuk reusable components

### Import Organization

```typescript
// 1. External libraries
import React from "react";
import { useForm } from "react-hook-form";

// 2. Internal utilities
import { cn } from "@/lib/utils";
import api from "@/lib/axios";

// 3. Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 4. Types
import type { User } from "@/types/user";

// 5. Styles (if any)
import "./styles.css";
```

### CSS/Styling Conventions

1. **Prefer Tailwind**: Gunakan utility classes untuk styling
2. **Component Variants**: Gunakan CVA untuk variant-based styling
3. **Custom Classes**: Minimal, hanya untuk complex animations atau global styles
4. **Class Merging**: Selalu gunakan `cn()` untuk menggabungkan classes

```typescript
// ✅ Good
<div className={cn("base-class", variant === "primary" && "primary-class", className)} />

// ❌ Bad
<div className={`base-class ${variant === "primary" ? "primary-class" : ""} ${className}`} />
```

### State Management Patterns

1. **Local State**: `useState` untuk component-level state
2. **Form State**: `react-hook-form` untuk form management
3. **Server State**: `@tanstack/react-query` untuk API data
4. **Global State**: Context API atau Zustand (jika diperlukan)

### Error Handling

```typescript
// API calls
try {
  const data = await api.get("/endpoint");
  // Handle success
} catch (error) {
  // Error sudah ditampilkan via toast dari interceptor
  // Tambahan handling jika diperlukan
}

// Form validation
const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
```

---

## 🎯 Best Practices

### Performance

1. **Code Splitting**: Gunakan lazy loading untuk routes

   ```typescript
   const Dashboard = lazy(() => import("@/pages/protected/dashboard"));
   ```

2. **Memoization**: Gunakan `useMemo` dan `useCallback` untuk expensive operations
3. **React Query**: Leverage caching dan background refetching

### Accessibility

1. **Semantic HTML**: Gunakan elemen HTML yang sesuai
2. **ARIA Labels**: Tambahkan untuk interactive elements
3. **Keyboard Navigation**: Pastikan semua interactive elements accessible via keyboard
4. **Radix UI**: Sudah accessible by default

### Security

1. **Environment Variables**: Jangan commit sensitive data
2. **XSS Prevention**: React sudah escape by default
3. **CSRF Protection**: `withCredentials: true` di axios
4. **Input Validation**: Selalu validate di client dan server

### Code Quality

1. **TypeScript Strict Mode**: Enable untuk type safety maksimal
2. **ESLint**: Fix semua warnings sebelum commit
3. **Consistent Formatting**: Gunakan Prettier (recommended)
4. **Code Review**: Review sebelum merge

---

## 🔄 Common Patterns

### Data Fetching dengan React Query

```typescript
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await api.get("/users");
      return data;
    },
  });
}

// Usage
function UserList() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return <div>{/* Render users */}</div>;
}
```

### Form Submission Pattern

```typescript
const onSubmit = async (data: FormData) => {
  try {
    const result = await api.post("/endpoint", data);
    toast.success("Berhasil!");
    // Handle success (redirect, reset form, etc.)
  } catch (error) {
    // Error sudah ditampilkan via toast
    // Tambahan handling jika diperlukan
  }
};
```

### Protected Component Pattern

```typescript
// ProtectedLayout.tsx
import { Navigate, Outlet } from "react-router";
import { authClient } from "@/lib/auth-client";

export default function ProtectedLayout() {
  const { data: session, isLoading } = authClient.useSession();

  if (isLoading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
}
```

---

## 📚 Additional Resources

### Documentation Links

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
- [React Router v7](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [TanStack Query](https://tanstack.com/query/latest)
- [Better Auth](https://www.better-auth.com)
- [Radix UI](https://www.radix-ui.com)
- [shadcn/ui](https://ui.shadcn.com)

### Related Projects

- **Backend API**: Pastikan backend mengikuti response format yang sesuai
- **Design System**: Dokumentasi komponen UI di Storybook (jika ada)

---

## 🤝 Contributing Guidelines

### Adding New Features

1. **Create Feature Branch**: `git checkout -b feature/nama-fitur`
2. **Follow Conventions**: Ikuti coding conventions di atas
3. **Add Types**: Tambahkan TypeScript types untuk semua new code
4. **Test Thoroughly**: Test di browser sebelum commit
5. **Update Documentation**: Update CONTEXT.md jika ada perubahan signifikan

### Adding New Components

1. **UI Components**: Tambahkan di `src/components/ui/`
2. **Feature Components**: Tambahkan di `src/components/[feature-name]/`
3. **Export Pattern**: Export sebagai named atau default export
4. **Documentation**: Tambahkan JSDoc comments untuk complex components

### Adding New Pages

1. **Create Page**: Di `src/pages/[category]/`
2. **Add Route**: Update `src/routes/router.tsx`
3. **Protected Route**: Wrap dengan `ProtectedLayout` jika perlu auth
4. **SEO**: Tambahkan page title dan meta tags

---

---

## 🔐 Role-Based Access Control (RBAC)

### Overview

The application implements comprehensive role-based access control to ensure users only access features and data appropriate to their role.

### Roles

| Role               | Description            | Access Level                                             |
| ------------------ | ---------------------- | -------------------------------------------------------- |
| `SUPER_ADMIN`      | System administrator   | Full access to all features and data across all posyandu |
| `ADMIN`            | Posyandu administrator | Full CRUD access within assigned posyandu                |
| `TENAGA_KESEHATAN` | Healthcare worker      | CRUD medical data within assigned posyandu               |
| `KADER_POSYANDU`   | Posyandu cadre         | CRUD medical data within assigned posyandu               |
| `ORANG_TUA`        | Parent                 | Read-only access to own children's data                  |

### Can Component

**Location**: `src/components/auth/can.tsx`

A reusable component for role-based access control that wraps content and controls visibility/access based on user roles.

#### Props

```typescript
interface CanProps {
  allowedRoles: Role[]; // Array of roles that can access the content
  children: React.ReactNode; // Content to protect
  redirectTo?: string; // Redirect path if unauthorized (default: "/dashboard")
  hideOnly?: boolean; // If true, only hide content without redirect/toast
}
```

#### Usage Examples

**Protecting Entire Pages**:

```tsx
import { Can } from "../../../components/auth";

export default function UsersListPage() {
  return (
    <Can allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
      <ListPageLayout>{/* Page content */}</ListPageLayout>
    </Can>
  );
}
```

**Hiding Dashboard Cards** (no redirect):

```tsx
<Can allowedRoles={["SUPER_ADMIN", "ADMIN"]} hideOnly>
  <Card>{/* Card content */}</Card>
</Can>
```

#### Behavior

- **Default Mode**: Redirects unauthorized users with toast notification
- **Hide Only Mode** (`hideOnly={true}`): Only hides content, no redirect/toast
- Returns `null` while loading session

### Protected Pages

| Page            | Path                     | Allowed Roles                                        |
| --------------- | ------------------------ | ---------------------------------------------------- |
| Users List      | `/dashboard/users`       | SUPER_ADMIN, ADMIN                                   |
| Posyandu List   | `/dashboard/posyandu`    | SUPER_ADMIN, ADMIN                                   |
| Anak List       | `/dashboard/anak`        | SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU |
| Pengukuran List | `/dashboard/pengukuran`  | SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU |
| My Children     | `/dashboard/my-children` | ORANG_TUA                                            |

### Dashboard Summary Cards

Summary cards use Can component with `hideOnly` mode for seamless UX:

- **Users**: SUPER_ADMIN, ADMIN
- **Posyandu**: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN
- **Anak**: All roles (data scoped by backend)
- **Ibu Hamil**: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU
- **Pengukuran**: All roles (data scoped by backend)
- **Orang Tua**: SUPER_ADMIN, ADMIN, TENAGA_KESEHATAN, KADER_POSYANDU

### Data Scoping

Backend services automatically scope data based on user role:

- **SUPER_ADMIN**: All data across all posyandu
- **ADMIN/TENAGA_KESEHATAN/KADER_POSYANDU**: Data within assigned `posyanduId`
- **ORANG_TUA**: Only own children's data

---

## 🐛 Troubleshooting

### Common Issues

**1. Module not found errors**

- Check import path menggunakan `@/` alias
- Pastikan file exists di lokasi yang benar

**2. TypeScript errors**

- Run `npm run build` untuk full type checking
- Check `tsconfig.json` configuration

**3. Styling tidak muncul**

- Pastikan TailwindCSS classes valid
- Check `index.css` sudah di-import di `main.tsx`
- Clear browser cache

**4. API calls failing**

- Check `.env` file dan `VITE_BASE_URL`
- Verify backend server running
- Check browser console untuk error details
- Verify CORS configuration di backend

**5. Authentication issues**

- Check cookies di browser DevTools
- Verify `withCredentials: true` di axios config
- Check backend session configuration

---

## 📞 Support

Untuk pertanyaan atau issues:

1. Check dokumentasi ini terlebih dahulu
2. Review code examples di project
3. Konsultasi dengan tim development

---

**Last Updated**: 2026-01-01  
**Version**: 1.1.0  
**Maintainer**: Prof Adi Team

**Recent Updates**:

- ✅ Added profile management feature using Better Auth
- ✅ Created profile validation schemas (`profile.validation.ts`)
- ✅ Created profile skeleton component (`profile-skeleton.tsx`)
- ✅ Implemented profile update and change password functionality
- ✅ Added reusable dialog components (`ConfirmDialog`, `FormDialog`)
- ✅ Refactored all list pages to use dialog components
- ✅ Reduced ~150 lines of boilerplate code across 6 list pages
- ✅ Improved code consistency and maintainability
