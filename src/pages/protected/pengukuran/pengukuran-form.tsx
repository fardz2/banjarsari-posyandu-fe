import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  createPengukuranSchema,
  type CreatePengukuranFormValues,
} from "../../../utils/validations";
import { AnakCombobox } from "../../../components/form/anak-combobox";
import {
  useCreatePengukuran,
  useUpdatePengukuran,
  useAnak,
} from "../../../hooks";
import type { Pengukuran } from "../../../types";

interface PengukuranFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pengukuran?: Pengukuran;
}

export default function PengukuranForm({
  open,
  onOpenChange,
  pengukuran,
}: PengukuranFormProps) {
  const isEditing = !!pengukuran;
  const createMutation = useCreatePengukuran();
  const updateMutation = useUpdatePengukuran();
  const { data: anakData } = useAnak({ limit: 1000 });

  const form = useForm<CreatePengukuranFormValues>({
    resolver: zodResolver(createPengukuranSchema),
    defaultValues: {
      anakNik: pengukuran?.anakNik || "",
      tglUkur: pengukuran?.tglUkur ? new Date(pengukuran.tglUkur) : new Date(),
      berat: pengukuran?.berat || 0,
      tinggi: pengukuran?.tinggi || 0,
      lila: pengukuran?.lila || undefined,
      lingkarKepala: pengukuran?.lingkarKepala || undefined,
    },
  });

  React.useEffect(() => {
    if (pengukuran) {
      form.reset({
        anakNik: pengukuran.anakNik,
        tglUkur: new Date(pengukuran.tglUkur),
        berat: pengukuran.berat,
        tinggi: pengukuran.tinggi,
        lila: pengukuran.lila || undefined,
        lingkarKepala: pengukuran.lingkarKepala || undefined,
      });
    } else {
      form.reset({
        anakNik: "",
        tglUkur: new Date(),
        berat: 0,
        tinggi: 0,
        lila: undefined,
        lingkarKepala: undefined,
      });
    }
  }, [pengukuran, form]);

  const onSubmit = async (data: CreatePengukuranFormValues) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: pengukuran.id,
          data: {
            tglUkur: data.tglUkur,
            berat: data.berat,
            tinggi: data.tinggi,
            lila: data.lila,
            lingkarKepala: data.lingkarKepala,
          },
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving pengukuran:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Pengukuran" : "Tambah Pengukuran"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Perbarui data pengukuran anak"
              : "Tambahkan data pengukuran baru untuk anak"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            {/* Select Anak */}
            <Controller
              name="anakNik"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="anakNik">Anak *</FieldLabel>
                  <AnakCombobox
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isEditing}
                    options={anakData?.data?.map((a) => ({
                      nik: a.nik,
                      nama: a.nama,
                    }))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Tanggal Ukur */}
            <Controller
              name="tglUkur"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tglUkur">Tanggal Ukur *</FieldLabel>
                  <Input
                    type="date"
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Berat Badan */}
            <Controller
              name="berat"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="berat">Berat Badan (kg) *</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="5.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Tinggi Badan */}
            <Controller
              name="tinggi"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tinggi">Tinggi Badan (cm) *</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="75.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Lingkar Kepala */}
            <Controller
              name="lingkarKepala"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lingkarKepala">
                    Lingkar Kepala (cm)
                  </FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="45.5"
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* LILA */}
            <Controller
              name="lila"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lila">LILA (cm)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="12.5"
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Menyimpan..."
                : isEditing
                ? "Perbarui"
                : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
