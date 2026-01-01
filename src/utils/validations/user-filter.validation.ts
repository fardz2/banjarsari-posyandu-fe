/**
 * User Filter Validation Schema
 * Zod schema untuk validasi filter user
 */

import { z } from "zod";

export const userFilterSchema = z.object({
  role: z
    .enum([
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
      "ORANG_TUA",
    ])
    .optional(),
  posyanduId: z.string().optional(),
});

export type UserFilterFormValues = z.infer<typeof userFilterSchema>;
