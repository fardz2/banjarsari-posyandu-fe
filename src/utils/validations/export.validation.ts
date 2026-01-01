/**
 * Export Validation Schemas
 * Zod schemas for export form validation
 */

import { z } from "zod";

/**
 * Export Schema
 * Validates export filter parameters
 */
export const exportSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  posyanduId: z.string().optional(),
}).refine(
  (data) => {
    // If both dates are provided, start date must be before or equal to end date
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  {
    message: "Tanggal mulai harus sebelum atau sama dengan tanggal akhir",
    path: ["endDate"],
  }
);

export type ExportFormValues = z.infer<typeof exportSchema>;
