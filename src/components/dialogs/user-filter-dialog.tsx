/**
 * User Filter Dialog Component
 * Dialog untuk filter user berdasarkan role dan posyandu (multiselect)
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
import { MultiSelect } from "../ui/multi-select";
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
      roles: [],
      posyanduIds: [],
    },
  });

  function onSubmit(values: UserFilterFormValues) {
    onApplyFilters(values);
    onOpenChange(false);
  }

  function handleClearFilters() {
    form.reset({
      roles: [],
      posyanduIds: [],
    });
    onApplyFilters({});
    onOpenChange(false);
  }

  const selectedRoles = form.watch("roles") || [];
  const selectedPosyanduIds = form.watch("posyanduIds") || [];

  // Convert roles to options
  const roleOptions = ROLES.map((role) => ({
    label: role,
    value: role,
  }));

  // Convert posyandu to options
  const posyanduOptions = posyandu.map((p) => ({
    label: p.nama,
    value: String(p.id),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filter Pengguna
          </DialogTitle>
          <DialogDescription>
            Filter daftar pengguna berdasarkan role dan posyandu. Kosongkan
            untuk menampilkan semua.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} id="filter-form">
          <FieldGroup>
            {/* Role Filter (Multiselect) */}
            <Controller
              name="roles"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>
                    Role{" "}
                    {selectedRoles.length > 0 && (
                      <span className="text-muted-foreground text-xs font-normal">
                        ({selectedRoles.length} dipilih)
                      </span>
                    )}
                  </FieldLabel>
                  <MultiSelect
                    options={roleOptions}
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder="Pilih role..."
                    emptyText="Role tidak ditemukan."
                    searchPlaceholder="Cari role..."
                  />
                </Field>
              )}
            />

            {/* Posyandu Filter (Multiselect - SUPER_ADMIN only) */}
            {posyandu.length > 0 && (
              <Controller
                name="posyanduIds"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>
                      Posyandu{" "}
                      {selectedPosyanduIds.length > 0 && (
                        <span className="text-muted-foreground text-xs font-normal">
                          ({selectedPosyanduIds.length} dipilih)
                        </span>
                      )}
                    </FieldLabel>
                    <MultiSelect
                      options={posyanduOptions}
                      selected={field.value || []}
                      onChange={field.onChange}
                      placeholder="Pilih posyandu..."
                      emptyText="Posyandu tidak ditemukan."
                      searchPlaceholder="Cari posyandu..."
                    />
                  </Field>
                )}
              />
            )}
          </FieldGroup>
        </form>

        <DialogFooter className="space-x-2 sm:gap-0">
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
