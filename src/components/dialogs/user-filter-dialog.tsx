/**
 * User Filter Dialog Component
 * Dialog untuk filter user berdasarkan role dan posyandu (SUPER_ADMIN only)
 */

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldGroup } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  userFilterSchema,
  type UserFilterFormValues,
} from "../../utils/validations/user-filter.validation";
import type { Posyandu, Role } from "../../types";

const ROLES: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "TENAGA_KESEHATAN",
  "KADER_POSYANDU",
  "ORANG_TUA",
];

interface UserFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: UserFilterFormValues) => void;
  posyandu?: Posyandu[]; // For SUPER_ADMIN
  currentFilters?: UserFilterFormValues;
}

export function UserFilterDialog({
  open,
  onOpenChange,
  onApplyFilters,
  posyandu = [],
  currentFilters,
}: UserFilterDialogProps) {
  const form = useForm<UserFilterFormValues>({
    resolver: zodResolver(userFilterSchema),
    defaultValues: currentFilters || {
      role: undefined,
      posyanduId: undefined,
    },
  });

  function onSubmit(values: UserFilterFormValues) {
    onApplyFilters(values);
    onOpenChange(false);
  }

  function handleClearFilters() {
    form.reset({
      role: undefined,
      posyanduId: undefined,
    });
    onApplyFilters({});
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filter Users
          </DialogTitle>
          <DialogDescription>
            Filter daftar user berdasarkan role dan posyandu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} id="filter-form">
          <FieldGroup>
            {/* Role Filter */}
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="role">Role (Opsional)</FieldLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) =>
                      field.onChange(value || undefined)
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Semua Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {/* Posyandu Filter (SUPER_ADMIN only) */}
            {posyandu.length > 0 && (
              <Controller
                name="posyanduId"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="posyanduId">
                      Posyandu (Opsional)
                    </FieldLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) =>
                        field.onChange(value || undefined)
                      }
                    >
                      <SelectTrigger id="posyanduId">
                        <SelectValue placeholder="Semua Posyandu" />
                      </SelectTrigger>
                      <SelectContent>
                        {posyandu.map((p) => (
                          <SelectItem key={p.id} value={String(p.id)}>
                            {p.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            )}
          </FieldGroup>
        </form>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
          <Button type="submit" form="filter-form" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
