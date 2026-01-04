/**
 * Forum Filter Dialog Component
 * Dialog untuk filter forum berdasarkan status dan posyandu (TENAGA_KESEHATAN & SUPER_ADMIN only)
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
  forumFilterSchema,
  type ForumFilterFormValues,
} from "../../utils/validations/forum-filter.validation";
import type { Posyandu, ForumStatus } from "../../types";

const FORUM_STATUSES: { value: ForumStatus; label: string }[] = [
  { value: "OPEN", label: "Belum Dijawab" },
  { value: "ANSWERED", label: "Sudah Dijawab" },
  { value: "CLOSED", label: "Ditutup" },
];

interface ForumFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: ForumFilterFormValues) => void;
  posyandu?: Posyandu[]; // For TENAGA_KESEHATAN & SUPER_ADMIN
  currentFilters?: ForumFilterFormValues;
}

export function ForumFilterDialog({
  open,
  onOpenChange,
  onApplyFilters,
  posyandu = [],
  currentFilters,
}: ForumFilterDialogProps) {
  const form = useForm<ForumFilterFormValues>({
    resolver: zodResolver(forumFilterSchema),
    defaultValues: currentFilters || {
      status: undefined,
      posyanduId: undefined,
    },
  });

  function onSubmit(values: ForumFilterFormValues) {
    onApplyFilters(values);
    onOpenChange(false);
  }

  function handleClearFilters() {
    form.reset({
      status: undefined,
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
            Filter Forum
          </DialogTitle>
          <DialogDescription>
            Filter daftar forum berdasarkan status dan posyandu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} id="filter-form">
          <FieldGroup>
            {/* Status Filter */}
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="status">Status (Opsional)</FieldLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) =>
                      field.onChange(value || undefined)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {FORUM_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {/* Posyandu Filter */}
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
