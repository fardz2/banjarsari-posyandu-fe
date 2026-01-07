import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { FormSkeleton } from "../../../components/skeletons/form-skeleton";
import {
  usePosyanduDetail,
  useCreatePosyandu,
  useUpdatePosyandu,
} from "../../../hooks/posyandu/usePosyandu";
import {
  posyanduSchema,
  type PosyanduFormValues,
} from "../../../utils/validations";

export default function PosyanduForm({
  posyanduId,
  onSuccess,
}: {
  posyanduId?: number;
  onSuccess?: () => void;
}) {
  const isEdit = !!posyanduId;

  const { data: posyanduData, isLoading: isLoadingDetail } = usePosyanduDetail(
    posyanduId || 0,
    {
      enabled: isEdit,
    }
  );

  const createMutation = useCreatePosyandu();
  const updateMutation = useUpdatePosyandu();

  const form = useForm<PosyanduFormValues>({
    resolver: zodResolver(posyanduSchema),
    defaultValues: {
      nama: "",
      desa: "",
      kecamatan: "",
      puskesmas: "",
      rw: "",
    },
  });

  // Load data for edit
  useEffect(() => {
    if (posyanduData?.data) {
      const { nama, desa, kecamatan, puskesmas, rw } = posyanduData.data;
      form.reset({
        nama,
        desa,
        kecamatan,
        puskesmas,
        rw: rw || "",
      });
    }
  }, [posyanduData, form]);

  const onSubmit = async (values: PosyanduFormValues) => {
    try {
      if (isEdit && posyanduId) {
        await updateMutation.mutateAsync({
          id: posyanduId,
          data: values,
        });
        toast.success("Posyandu berhasil diperbarui");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Posyandu berhasil ditambahkan");
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data posyandu");
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Show skeleton while loading data for edit mode
  if (isEdit && isLoadingDetail) {
    return <FormSkeleton fieldCount={5} />;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="nama"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nama Posyandu</FieldLabel>
                <Input placeholder="Contoh: Mawar 1" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="desa"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Desa/Kelurahan</FieldLabel>
                  <Input placeholder="Nama Desa" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="kecamatan"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kecamatan</FieldLabel>
                  <Input placeholder="Nama Kecamatan" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="puskesmas"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Puskesmas Pembina</FieldLabel>
                  <Input placeholder="Nama Puskesmas" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="rw"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>RW</FieldLabel>
                  <Input placeholder="Nomor RW (Opsional)" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        </FieldGroup>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
