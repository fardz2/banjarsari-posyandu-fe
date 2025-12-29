/**
 * Better Auth Type Extensions
 * Extends Better Auth types to include custom fields
 */

import type { Role } from "./posyandu.types";

declare module "better-auth" {
  export interface Session {
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
      name: string;
      username: string;
      displayUsername?: string;
      role: Role;
      posyanduId: number | null;
      image: string | null;
      createdAt: string;
      updatedAt: string;
    };
  }
}

// This is required for the module augmentation to work
export {};
