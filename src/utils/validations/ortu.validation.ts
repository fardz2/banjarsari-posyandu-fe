import { z } from "zod";

export const ortuSchema = z.object({
  userAyahId: z.string().optional(),
  userIbuId: z.string().optional(),
}).refine((data) => {
  const hasAyah = data.userAyahId && data.userAyahId !== "none" && data.userAyahId !== "";
  const hasIbu = data.userIbuId && data.userIbuId !== "none" && data.userIbuId !== "";
  return hasAyah || hasIbu;
}, {
  message: "Minimal User Ayah atau User Ibu wajib dipilih",
  path: ["userAyahId"],
});

export type OrtuFormValues = z.infer<typeof ortuSchema>;
