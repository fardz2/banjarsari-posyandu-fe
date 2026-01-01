# 📚 Usage Examples - Posyandu Frontend

Contoh penggunaan untuk arsitektur baru dengan validations, types, services, dan custom hooks.

---

## 📝 Form Validation

### Login Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/utils/validations";

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data); // Type-safe!
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

---

## 🔍 Data Fetching (Queries)

### Fetch List of Anak

```tsx
import { useAnak } from "@/hooks";

function AnakList() {
  const { data, isLoading, error } = useAnak({
    page: 1,
    limit: 10,
    search: "budi",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      {data?.data.map((anak) => (
        <div key={anak.id}>{anak.namaLengkap}</div>
      ))}
      <p>Total: {data?.meta.total}</p>
    </div>
  );
}
```

### Fetch Detail Anak

```tsx
import { useAnakDetail } from "@/hooks";

function AnakDetail({ id }: { id: string }) {
  const { data, isLoading } = useAnakDetail(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.data?.namaLengkap}</h1>
      <p>NIK: {data?.data?.nik}</p>
      <p>Tanggal Lahir: {data?.data?.tanggalLahir}</p>
    </div>
  );
}
```

### Fetch Pengukuran by Anak ID

```tsx
import { usePengukuranByAnakId } from "@/hooks";

function PengukuranList({ anakId }: { anakId: string }) {
  const { data, isLoading } = usePengukuranByAnakId(anakId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.data?.map((pengukuran) => (
        <div key={pengukuran.id}>
          <p>Tanggal: {pengukuran.tanggalPengukuran}</p>
          <p>Berat: {pengukuran.beratBadan} kg</p>
          <p>Tinggi: {pengukuran.tinggiBadan} cm</p>
        </div>
      ))}
    </div>
  );
}
```

---

## ✏️ Data Mutation (Create, Update, Delete)

### Create Anak

```tsx
import { useCreateAnak } from "@/hooks";
import { toast } from "sonner";

function CreateAnakForm() {
  const createAnak = useCreateAnak({
    onSuccess: () => {
      // Custom success handler (opsional)
      console.log("Anak berhasil ditambahkan!");
      // Toast sudah otomatis ditampilkan oleh hook
    },
  });

  const handleSubmit = () => {
    createAnak.mutate({
      nik: "1234567890123456",
      namaLengkap: "Budi Santoso",
      jenisKelamin: "L",
      tanggalLahir: "2023-01-15",
      tempatLahir: "Jakarta",
      beratBadanLahir: 3.2,
      panjangBadanLahir: 50,
      anakKe: 1,
      namaIbu: "Siti",
      namaAyah: "Ahmad",
      alamat: "Jl. Merdeka No. 123",
      posyanduId: "posyandu-123",
    });
  };

  return (
    <button onClick={handleSubmit} disabled={createAnak.isPending}>
      {createAnak.isPending ? "Menyimpan..." : "Simpan"}
    </button>
  );
}
```

### Update Anak

```tsx
import { useUpdateAnak } from "@/hooks";

function EditAnakForm({ anakId }: { anakId: string }) {
  const updateAnak = useUpdateAnak();

  const handleUpdate = () => {
    updateAnak.mutate({
      id: anakId,
      data: {
        namaLengkap: "Budi Santoso Updated",
        alamat: "Jl. Baru No. 456",
      },
    });
  };

  return (
    <button onClick={handleUpdate} disabled={updateAnak.isPending}>
      {updateAnak.isPending ? "Memperbarui..." : "Update"}
    </button>
  );
}
```

### Delete Anak

```tsx
import { useDeleteAnak } from "@/hooks";

function DeleteAnakButton({ anakId }: { anakId: string }) {
  const deleteAnak = useDeleteAnak({
    onSuccess: () => {
      // Redirect atau close modal
      console.log("Data berhasil dihapus");
    },
  });

  const handleDelete = () => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      deleteAnak.mutate(anakId);
    }
  };

  return (
    <button onClick={handleDelete} disabled={deleteAnak.isPending}>
      {deleteAnak.isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
```

---

## 🤰 Ibu Hamil & Pemeriksaan

### Fetch List Ibu Hamil

```tsx
import { useIbuHamil } from "@/hooks";

function IbuHamilList() {
  const { data, isLoading } = useIbuHamil({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.data.map((ibu) => (
        <div key={ibu.id}>
          <h3>{ibu.namaLengkap}</h3>
          <p>HPL: {ibu.hpl}</p>
          <p>Kehamilan ke-{ibu.kehamilanKe}</p>
        </div>
      ))}
    </div>
  );
}
```

### Create Pemeriksaan Ibu Hamil

```tsx
import { useCreatePemeriksaanIbuHamil } from "@/hooks";

function TambahPemeriksaan({ ibuHamilId }: { ibuHamilId: string }) {
  const createPemeriksaan = useCreatePemeriksaanIbuHamil();

  const handleSubmit = () => {
    createPemeriksaan.mutate({
      ibuHamilId,
      tanggalPemeriksaan: "2024-01-15",
      usiaKehamilan: 20,
      beratBadan: 65,
      tekananDarah: "120/80",
      lingkarLenganAtas: 28,
      tinggiFundus: 18,
      denyutJantungJanin: 140,
      keluhan: "Tidak ada",
    });
  };

  return (
    <button onClick={handleSubmit} disabled={createPemeriksaan.isPending}>
      Simpan Pemeriksaan
    </button>
  );
}
```

---

## 🏥 Posyandu

### Fetch All Posyandu

```tsx
import { usePosyandu } from "@/hooks";

function PosyanduList() {
  const { data, isLoading } = usePosyandu();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.data.map((posyandu) => (
        <div key={posyandu.id}>
          <h3>{posyandu.nama}</h3>
          <p>{posyandu.alamat}</p>
          <p>
            {posyandu.kelurahan}, {posyandu.kecamatan}
          </p>
        </div>
      ))}
    </div>
  );
}
```

### Create Posyandu

```tsx
import { useCreatePosyandu } from "@/hooks";

function CreatePosyanduForm() {
  const createPosyandu = useCreatePosyandu();

  const handleSubmit = () => {
    createPosyandu.mutate({
      nama: "Posyandu Melati",
      alamat: "Jl. Kenanga No. 10",
      kelurahan: "Banjarsari",
      kecamatan: "Banjarsari",
      kota: "Surakarta",
      provinsi: "Jawa Tengah",
      kodePos: "57131",
      nomorTelepon: "0271-123456",
      jadwalBuka: "Setiap Rabu, 08:00-12:00",
    });
  };

  return (
    <button onClick={handleSubmit} disabled={createPosyandu.isPending}>
      Simpan Posyandu
    </button>
  );
}
```

---

## 🔄 Advanced: Optimistic Updates

```tsx
import { useUpdateAnak } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query";

function OptimisticUpdateExample({ anakId }: { anakId: string }) {
  const queryClient = useQueryClient();

  const updateAnak = useUpdateAnak({
    // Optimistic update: update UI sebelum API response
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.anak.detail(anakId) });

      // Snapshot previous value
      const previousAnak = queryClient.getQueryData(queryKeys.anak.detail(anakId));

      // Optimistically update
      queryClient.setQueryData(queryKeys.anak.detail(anakId), (old: any) => ({
        ...old,
        data: { ...old.data, ...variables.data },
      }));

      return { previousAnak };
    },
    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousAnak) {
        queryClient.setQueryData(
          queryKeys.anak.detail(anakId),
          context.previousAnak
        );
      }
    },
  });

  return <button onClick={() => updateAnak.mutate({ id: anakId, data: { ... } })}>Update</button>;
}
```

---

## 🎯 Best Practices

### 1. **Gunakan Custom Hooks**

```tsx
// ✅ Good
import { useAnak } from "@/hooks";

// ❌ Bad - jangan langsung call service
import { getAllAnak } from "@/services";
```

### 2. **Type Safety**

```tsx
// ✅ Good - gunakan inferred types
import type { Anak } from "@/types";
const anak: Anak = data?.data;

// ✅ Good - gunakan validation types
import type { LoginFormValues } from "@/utils/validations";
```

### 3. **Error Handling**

```tsx
const { data, error, isError } = useAnak();

if (isError) {
  // Error sudah ditampilkan via toast dari axios interceptor
  // Tambahan UI feedback di sini
  return <ErrorComponent message={error.message} />;
}
```

### 4. **Loading States**

```tsx
const { data, isLoading, isFetching } = useAnak();

// isLoading: true saat pertama kali fetch
// isFetching: true saat background refetch

return (
  <div>
    {isLoading && <Skeleton />}
    {isFetching && !isLoading && <RefreshIndicator />}
    {data && <DataDisplay data={data} />}
  </div>
);
```

### 5. **Mutation Callbacks**

```tsx
const createAnak = useCreateAnak({
  onSuccess: (data) => {
    // Navigate atau close modal
    navigate(`/anak/${data.data.id}`);
  },
  onError: (error) => {
    // Custom error handling
    console.error(error);
  },
});
```

---

## 🔧 React Query DevTools

DevTools sudah terintegrasi di development mode:

```tsx
// Sudah ada di main.tsx
<ReactQueryDevtools initialIsOpen={false} />
```

**Cara menggunakan:**

1. Buka aplikasi di browser
2. Klik icon React Query di pojok kanan bawah
3. Monitor queries, mutations, dan cache

---

## 📦 Import Patterns

### Barrel Exports

```tsx
// ✅ Good - gunakan barrel exports
import { useAnak, useCreateAnak, useUpdateAnak } from "@/hooks";
import { Anak, Pengukuran, IbuHamil } from "@/types";
import { loginSchema, registerSchema } from "@/utils/validations";

// ❌ Bad - jangan import langsung dari file
import { useAnak } from "@/hooks/anak/useAnak";
```

### Path Aliases

```tsx
// ✅ Good - gunakan @ alias
import { useAnak } from "@/hooks";
import api from "@/lib/axios";

// ❌ Bad - relative imports
import { useAnak } from "../../hooks/anak/useAnak";
```

---

## 🚀 Quick Start Checklist

- [ ] Import validation schema dari `@/utils/validations`
- [ ] Import types dari `@/types`
- [ ] Gunakan custom hooks dari `@/hooks` untuk data fetching
- [ ] Gunakan mutations untuk create/update/delete
- [ ] Handle loading dan error states
- [ ] Leverage automatic cache invalidation
- [ ] Use React Query DevTools untuk debugging

---

## 🔐 Security Operations

### Rotating API Key

Jika API Key bocor atau perlu dirotasi secara berkala, ikuti langkah berikut:

1.  **Generate Key Baru**: Buat string acak yang aman (bisa gunakan password manager atau command `openssl rand -hex 32`).
2.  **Update Backend (Zero-Downtime)**:
    - Edit file `posyandu-be/.env`
    - Tambahkan key baru dengan pemisah koma: `API_KEY=key-lama,key-baru`
    - Restart backend. Sekarang kedua key valid.
3.  **Update Frontend**:
    - Edit file `posyandu-fe/.env`
    - Ganti `VITE_API_KEY=key-baru`
    - Restart frontend.
4.  **Cleanup (Opsional)**:
    - Setelah semua user load frontend baru, hapus key lama di backend: `API_KEY=key-baru`
    - Restart backend lagi.
5.  **Restart Servers**:
    - Restart server backend (`npm run dev` atau `pm2 restart`)
    - Restart server frontend
6.  **Verifikasi**:
    - Coba login atau refresh halaman dashboard
    - Pastikan request API berjalan normal (tidak ada error 403)

---

## 🚀 Deployment Guide (Vercel)

### 1. Frontend (`posyandu-fe`)

Frontend sudah siap deploy. Pastikan Environment Variables di Vercel Dashboard sudah diset:

- `VITE_API_BASE_URL`: URL Backend produksi (misal: `https://posyandu-be.vercel.app`)
- `VITE_API_KEY`: API Key rahasia (harus sama dengan backend)

### 2. Backend (`posyandu-be`)

Backend sudah dikonfigurasi untuk Vercel (Serverless).

**Langkah Deploy:**

1.  Pastikan file `vercel.json` dan `api/index.ts` sudah ada (sudah dibuatkan otomatis).
2.  Di Vercel Dashboard, import project `posyandu-be`.
3.  **Build Settings**:
    - Framework Preset: `Other`
    - Build Command: `npm install && npx prisma generate` (PENTING! agar Prisma Client ter-generate)
    - Output Directory: `dist`
4.  **Environment Variables** (Wajib):
    - `DATABASE_URL`: Connection string PostgreSQL database (harus bisa diakses internet, misal Supabase/Neon/Railway).
    - `BETTER_AUTH_SECRET`: Secret key random.
    - `BETTER_AUTH_URL`: URL backend (misal: `https://posyandu-be.vercel.app`).
    - `API_KEY`: Key rahasia.

**Catatan Database Vercel**:
Karena serverless, koneksi database bisa cepat habis. Disarankan menggunakan **Connection Pooling** (misal Supabase Transaction Mode atau Neon Pooling) pada `DATABASE_URL` Anda.
