/**
 * User Filter Validation Schema
 * Zod schema untuk validasi filter user dengan multiselect
 */

import { z } from "zod";

export const userFilterSchema = z.object({
  roles: z
    .array(
      z.enum([
        "SUPER_ADMIN",
        "ADMIN",
        "TENAGA_KESEHATAN",
        "KADER_POSYANDU",
        "ORANG_TUA",
      ])
    )
    .optional(),
  posyanduIds: z.array(z.string()).optional(),
});

export type UserFilterFormValues = z.infer<typeof userFilterSchema>;
