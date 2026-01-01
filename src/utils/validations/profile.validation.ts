/**
 * Profile Validation Schemas
 * Zod schemas untuk validasi form profile dan change password
 */

import { z } from "zod";

/**
 * Schema untuk update profile (name & username)
 */
export const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(30, "Username maksimal 30 karakter")
    .optional(),
});

/**
 * Schema untuk change password di profile page
 */
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
export type ProfileChangePasswordFormValues = z.infer<typeof profileChangePasswordSchema>;
