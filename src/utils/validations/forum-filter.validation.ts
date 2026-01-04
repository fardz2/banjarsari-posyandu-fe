import { z } from "zod";

export const forumFilterSchema = z.object({
  status: z.enum(["OPEN", "ANSWERED", "CLOSED"]).optional(),
  posyanduId: z.string().optional(),
});

export type ForumFilterFormValues = z.infer<typeof forumFilterSchema>;
