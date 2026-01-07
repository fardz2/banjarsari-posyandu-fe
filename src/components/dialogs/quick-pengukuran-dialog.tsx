/**
 * Quick Pengukuran Dialog
 * Fast input dialog for batch pengukuran operations from list page
 */

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, differenceInMonths } from "date-fns";

import { FormDialog } from "./form-dialog";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useCreatePengukuran } from "../../hooks/anak/usePengukuranMutations";
import {
  pengukuranFormSchema,
  type PengukuranFormValues,
} from "../../utils/validations/pengukuran.validation";
import type { Anak } from "../../types";

interface QuickPengukuranDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anak: Anak | null;
  onSuccess?: () => void;
}

export function QuickPengukuranDialog({
  open,
  onOpenChange,
  anak,
  onSuccess,
}: QuickPengukuranDialogProps) {
  const createMutation = useCreatePengukuran();

  const form = useForm<PengukuranFormValues>({
    resolver: zodResolver(pengukuranFormSchema),
    defaultValues: {
      tglUkur: format(new Date(), "yyyy-MM-dd"),
      berat: undefined,
      tinggi: undefined,
      lingkarKepala: undefined,
      lila: undefined,
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        tglUkur: format(new Date(), "yyyy-MM-dd"),
        berat: undefined,
        tinggi: undefined,
        lingkarKepala: undefined,
        lila: undefined,
      });
    }
  }, [open, form]);

  const onSubmit = async (values: PengukuranFormValues) => {
    if (!anak) return;

    try {
      await createMutation.mutateAsync({
        anakNik: anak.nik,
        tglUkur: values.tglUkur,
        berat: values.berat,
        tinggi: values.tinggi,
        lingkarKepala: values.lingkarKepala,
        lila: values.lila,
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating pengukuran:", error);
    }
  };

  if (!anak) return null;

  // Calculate age in months
  const ageInMonths = differenceInMonths(new Date(), new Date(anak.tglLahir));
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  const ageText =
    years > 0 ? `${years} tahun ${months} bulan` : `${months} bulan`;

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Input Pengukuran Cepat"
      description={`${anak.nama} • ${ageText}`}
      maxWidth="md"
      hideFooter
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="tglUkur"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tanggal Pengukuran</FieldLabel>
                <Input type="date" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="berat"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Berat Badan (kg)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="9.5"
                    autoFocus
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="tinggi"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tinggi Badan (cm)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="75.0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="lingkarKepala"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Lingkar Kepala (cm)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="45.0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="lila"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>LILA (cm)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="13.5"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        </FieldGroup>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </FormDialog>
  );
}
