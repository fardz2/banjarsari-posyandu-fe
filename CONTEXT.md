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
│   │   ├── layout/          # Layout components
│   │   │   └── protected/
│   │   │       └── protected-layout.tsx
│   │   └── ui/              # Reusable UI components (shadcn/ui style)
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx  # Alert dialog for confirmations
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx      # Checkbox component (Radix UI)
│   │       ├── dialog.tsx        # Dialog for modals
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
│   │   ├── public/          # Public pages
│   │   │   └── landing.tsx
│   │   └── not-found.tsx    # 404 page
│   ├── routes/              # Routing configuration
│   │   └── router.tsx       # React Router setup
│   ├── services/            # API service layer
│   │   ├── anak.service.ts  # Anak & Pengukuran API calls
│   │   ├── ibu-hamil.service.ts
│   │   ├── posyandu.service.ts
│   │   └── index.ts         # Barrel export
│   ├── types/               # TypeScript type definitions
│   │   ├── api.types.ts     # Generic API response types
│   │   ├── auth.types.ts    # Auth-related types
│   │   ├── posyandu.types.ts # Domain types (Anak, IbuHamil, etc.)
│   │   └── index.ts         # Barrel export
│   ├── utils/               # Utility functions and schemas
│   │   └── validations/     # Zod validation schemas
│   │       ├── auth.validation.ts
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
});
```

### Authentication Flow

1. **Login**: Username/password authentication via `authClient`
2. **Session**: Cookie-based session management
3. **Protected Routes**: Menggunakan `ProtectedLayout` wrapper
4. **Auto-redirect**: Redirect ke login jika tidak authenticated

### Protected Route Pattern

```typescript
// router.tsx
{
  element: <ProtectedLayout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    // Tambahkan rute protected lainnya di sini
  ],
}
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

> **Note**: Untuk detail lengkap endpoint, parameter, permission matrix, dan response format, lihat [Backend CONTEXT.md](../posyandu-be/CONTEXT.md#2-endpoint-yang-sudah-ada).

---

## 🏗️ Architecture & Code Organization

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

```typescript
// src/hooks/anak/useAnakMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { createAnak, updateAnak, deleteAnak } from "../../services";

export const useCreateAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Anak>) => createAnak(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      toast.success("Data anak berhasil ditambahkan");
    },
  });
};

export const useUpdateAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Anak> }) =>
      updateAnak(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.anak.detail(variables.id),
      });
      toast.success("Data anak berhasil diperbarui");
    },
  });
};

export const useDeleteAnak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAnak(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anak.lists() });
      toast.success("Data anak berhasil dihapus");
    },
  });
};
```

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
```

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

**Last Updated**: 2025-12-29  
**Version**: 1.0.0  
**Maintainer**: Prof Adi Team
