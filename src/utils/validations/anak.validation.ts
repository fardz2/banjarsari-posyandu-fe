import * as z from "zod";

export const anakSchema = z.object({
  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK harus berupa angka"),
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]),
  tglLahir: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Tanggal lahir tidak valid"),
  bbLahir: z.number().optional(),
  tbLahir: z.number().optional(),
  posyanduId: z.number().min(1, "Pilih Posyandu"),
  
  // Ortu related fields
  ortuId: z.number().optional(),
});

export type AnakFormValues = z.infer<typeof anakSchema>;
