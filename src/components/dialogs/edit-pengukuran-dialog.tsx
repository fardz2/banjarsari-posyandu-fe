/**
 * Edit Pengukuran Dialog
 * Context-aware edit dialog for pengukuran from detail page
 */

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { FormDialog } from "./form-dialog";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useUpdatePengukuran } from "../../hooks/anak/usePengukuranMutations";
import {
  pengukuranFormSchema,
  type PengukuranFormValues,
} from "../../utils/validations/pengukuran.validation";
import type { Pengukuran } from "../../types";

interface EditPengukuranDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pengukuran: Pengukuran | null;
  onSuccess?: () => void;
}

export function EditPengukuranDialog({
  open,
  onOpenChange,
  pengukuran,
  onSuccess,
}: EditPengukuranDialogProps) {
  const updateMutation = useUpdatePengukuran();

  const form = useForm<PengukuranFormValues>({
    resolver: zodResolver(pengukuranFormSchema),
    defaultValues: {
      tglUkur: "",
      berat: undefined,
      tinggi: undefined,
      lingkarKepala: undefined,
      lila: undefined,
    },
  });

  // Load pengukuran data when dialog opens
  useEffect(() => {
    if (open && pengukuran) {
      form.reset({
        tglUkur: format(new Date(pengukuran.tglUkur), "yyyy-MM-dd"),
        berat: pengukuran.berat,
        tinggi: pengukuran.tinggi,
        lingkarKepala: pengukuran.lingkarKepala || undefined,
        lila: pengukuran.lila || undefined,
      });
    }
  }, [open, pengukuran, form]);

  const onSubmit = async (values: PengukuranFormValues) => {
    if (!pengukuran) return;

    try {
      await updateMutation.mutateAsync({
        id: pengukuran.id,
        data: {
          tglUkur: values.tglUkur,
          berat: values.berat,
          tinggi: values.tinggi,
          lingkarKepala: values.lingkarKepala,
          lila: values.lila,
        },
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error updating pengukuran:", error);
    }
  };

  if (!pengukuran) return null;

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Pengukuran"
      description={`Ubah data pengukuran tanggal ${format(
        new Date(pengukuran.tglUkur),
        "d MMMM yyyy"
      )}`}
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
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </FormDialog>
  );
}
