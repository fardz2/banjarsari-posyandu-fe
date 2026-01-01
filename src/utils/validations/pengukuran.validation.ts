import { z } from "zod";

// Schema untuk create pengukuran
export const createPengukuranSchema = z.object({
  anakNik: z.string().length(16, "NIK harus 16 digit"),
  tglUkur: z.date({ message: "Tanggal pengukuran wajib diisi" }),
  berat: z.number().positive("Berat badan harus lebih dari 0").max(50, "Berat badan tidak valid"),
  tinggi: z.number().positive("Tinggi badan harus lebih dari 0").max(200, "Tinggi badan tidak valid"),
  lila: z.number().positive().optional(),
  lingkarKepala: z.number().positive("Lingkar kepala harus positif").optional(),
  caraUkur: z.string().optional(),
  usiaSaatUkur: z.string().optional(),
  status_bb_u: z.string().optional(),
  zs_bb_u: z.number().optional(),
  status_tb_u: z.string().optional(),
  zs_tb_u: z.number().optional(),
  status_bb_tb: z.string().optional(),
  zs_bb_tb: z.number().optional(),
  status_lk_u: z.string().optional(),
  zs_lk_u: z.number().optional(),
  naikBeratBadan: z.string().optional(),
});

// Schema untuk update pengukuran
export const updatePengukuranSchema = z.object({
  tglUkur: z.date().optional(),
  berat: z.number().positive("Berat badan harus lebih dari 0").max(50).optional(),
  tinggi: z.number().positive("Tinggi badan harus lebih dari 0").max(200).optional(),
  lila: z.number().positive().optional(),
  lingkarKepala: z.number().positive().optional(),
  caraUkur: z.string().optional(),
  usiaSaatUkur: z.string().optional(),
  status_bb_u: z.string().optional(),
  zs_bb_u: z.number().optional(),
  status_tb_u: z.string().optional(),
  zs_tb_u: z.number().optional(),
  status_bb_tb: z.string().optional(),
  zs_bb_tb: z.number().optional(),
  status_lk_u: z.string().optional(),
  zs_lk_u: z.number().optional(),
  naikBeratBadan: z.string().optional(),
});

// Type inference
export type CreatePengukuranFormValues = z.infer<typeof createPengukuranSchema>;
export type UpdatePengukuranFormValues = z.infer<typeof updatePengukuranSchema>;
