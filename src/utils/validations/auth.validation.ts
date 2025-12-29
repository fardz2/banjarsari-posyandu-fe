import { z } from "zod";

/**
 * Login Form Validation Schema
 * Validates username/email and password input
 */
export const loginSchema = z.object({
  identifier: z.string().min(3, "Username atau email minimal 3 karakter."),
  password: z.string().min(6, "Password minimal 6 karakter."),
  rememberMe: z.boolean(), // ✅ Fixed: Removed .optional()
});

/**
 * Register Form Validation Schema
 * Validates registration form with username, email, name, and password
 */
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter.")
    .max(20, "Username maksimal 20 karakter.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh mengandung huruf, angka, dan underscore."
    ),
  email: z.string().email("Email tidak valid."),
  name: z.string().min(3, "Nama minimal 3 karakter."),
  password: z.string().min(6, "Password minimal 6 karakter."),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok.",
  path: ["confirmPassword"],
});

/**
 * Forgot Password Validation Schema
 * Validates email for password reset request
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid."),
});

/**
 * Reset Password Validation Schema
 * Validates new password and confirmation
 */
export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password minimal 6 karakter."),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok.",
  path: ["confirmPassword"],
});

/**
 * Change Password Validation Schema
 * Validates old password, new password, and confirmation
 */
export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password lama minimal 6 karakter."),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter."),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password baru tidak cocok.",
  path: ["confirmPassword"],
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: "Password baru harus berbeda dengan password lama.",
  path: ["newPassword"],
});

/**
 * Update Profile Validation Schema
 * Validates user profile update
 */
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter."),
  email: z.string().email("Email tidak valid."),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter.")
    .max(20, "Username maksimal 20 karakter.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh mengandung huruf, angka, dan underscore."
    ),
  bio: z.string().max(500, "Bio maksimal 500 karakter.").optional(),
  phone: z.string().regex(/^[0-9+\-\s()]*$/, "Nomor telepon tidak valid.").optional(),
});

// ============================================================
// TYPE INFERENCE FROM SCHEMAS
// ============================================================

/**
 * Inferred types from validation schemas
 * These types ensure type safety throughout your application
 */
export type LoginFormValues = z.infer<typeof loginSchema>;
// Result: { identifier: string; password: string; rememberMe: boolean }

export type RegisterFormValues = z.infer<typeof registerSchema>;
// Result: { username: string; email: string; name: string; password: string; confirmPassword: string }

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
// Result: { email: string }

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
// Result: { password: string; confirmPassword: string }

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
// Result: { oldPassword: string; newPassword: string; confirmPassword: string }

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;