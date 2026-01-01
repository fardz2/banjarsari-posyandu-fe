/**
 * Export Dialog Component
 * Dialog for exporting data with date range and posyandu filters
 */

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldGroup, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { exportSchema, type ExportFormValues } from "../../utils/validations";
import { exportPengukuran, exportAnak } from "../../services/export.service";
import { authClient } from "../../lib/auth-client";
import type { Posyandu } from "../../types";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "pengukuran" | "anak";
  posyandu?: Posyandu[]; // For SUPER_ADMIN
}

export function ExportDialog({
  open,
  onOpenChange,
  type,
  posyandu = [],
}: ExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { data: session } = authClient.useSession();
  const isSuperAdmin = (session?.user as any)?.role === "SUPER_ADMIN";

  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      posyanduId: "",
    },
  });

  async function onSubmit(values: ExportFormValues) {
    setIsExporting(true);

    try {
      const filters = {
        startDate: values.startDate || undefined,
        endDate: values.endDate || undefined,
        posyanduId: values.posyanduId || undefined,
      };

      if (type === "pengukuran") {
        await exportPengukuran(filters);
        toast.success("Data pengukuran berhasil diexport");
      } else {
        await exportAnak(filters);
        toast.success("Data anak berhasil diexport");
      }

      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Export error:", error);
      toast.error(error.message || "Gagal export data");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Export Data {type === "pengukuran" ? "Pengukuran" : "Anak"}
          </DialogTitle>
          <DialogDescription>
            Pilih rentang tanggal dan posyandu (opsional) untuk export data ke
            Excel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} id="export-form">
          <FieldGroup>
            {/* Start Date */}
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="startDate">
                    Tanggal Mulai (Opsional)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="startDate"
                    type="date"
                    disabled={isExporting}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* End Date */}
            <Controller
              name="endDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endDate">
                    Tanggal Akhir (Opsional)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="endDate"
                    type="date"
                    disabled={isExporting}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Posyandu Selector (SUPER_ADMIN only) */}
            {isSuperAdmin && posyandu.length > 0 && (
              <Controller
                name="posyanduId"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="posyanduId">
                      Posyandu (Opsional)
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isExporting}
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

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
          >
            Batal
          </Button>
          <Button type="submit" form="export-form" disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export ke Excel
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
