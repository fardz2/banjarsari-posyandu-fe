import * as z from "zod";

export const posyanduSchema = z.object({
  nama: z.string().min(2, "Nama posyandu minimal 2 karakter"),
  desa: z.string().min(2, "Desa minimal 2 karakter"),
  kecamatan: z.string().min(2, "Kecamatan minimal 2 karakter"),
  puskesmas: z.string().min(2, "Puskesmas minimal 2 karakter"),
  rw: z.string().optional(),
});

export type PosyanduFormValues = z.infer<typeof posyanduSchema>;
