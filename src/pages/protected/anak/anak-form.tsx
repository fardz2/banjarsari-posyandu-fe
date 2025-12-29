"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { useAnakDetail } from "../../../hooks/anak/useAnak";
import {
  useCreateAnak,
  useUpdateAnak,
} from "../../../hooks/anak/useAnakMutations";
import { usePosyandu } from "../../../hooks/posyandu/usePosyandu";
import { anakSchema, type AnakFormValues } from "../../../utils/validations";

export default function AnakForm({
  nik,
  onSuccess,
}: {
  nik?: string;
  onSuccess?: () => void;
}) {
  const isEdit = !!nik;

  const { data: anakData, isLoading: isLoadingDetail } = useAnakDetail(
    nik || "",
    {
      enabled: isEdit,
    }
  );

  const { data: posyanduData } = usePosyandu({ limit: 100 });

  const createMutation = useCreateAnak();
  const updateMutation = useUpdateAnak();

  const form = useForm<AnakFormValues>({
    resolver: zodResolver(anakSchema),
    defaultValues: {
      nik: "",
      nama: "",
      jenisKelamin: "Laki-laki",
      tglLahir: new Date().toISOString().split("T")[0],
      bbLahir: undefined,
      tbLahir: undefined,
      posyanduId: 0,
    },
  });

  // Load data for edit
  useEffect(() => {
    if (anakData?.data) {
      const data = anakData.data;
      form.reset({
        nik: data.nik,
        nama: data.nama,
        jenisKelamin: data.jenisKelamin as "Laki-laki" | "Perempuan",
        tglLahir: new Date(data.tglLahir).toISOString().split("T")[0],
        bbLahir: data.bbLahir || undefined,
        tbLahir: data.tbLahir || undefined,
        posyanduId: data.posyanduId,
      });
    }
  }, [anakData, form]);

  const onSubmit = async (values: AnakFormValues) => {
    try {
      if (isEdit && nik) {
        await updateMutation.mutateAsync({
          nik: nik,
          data: values,
        });
        toast.success("Data anak berhasil diperbarui");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Data anak berhasil ditambahkan");
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data anak");
    }
  };

  const isLoading =
    createMutation.isPending || updateMutation.isPending || isLoadingDetail;

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="nik"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>NIK</FieldLabel>
                  <Input
                    placeholder="16 digit NIK"
                    {...field}
                    disabled={isEdit}
                    maxLength={16}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="nama"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Lengkap</FieldLabel>
                  <Input placeholder="Nama Anak" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="jenisKelamin"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Jenis Kelamin</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="tglLahir"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tanggal Lahir</FieldLabel>
                  <Input type="date" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="bbLahir"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Berat Lahir (kg)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="3.2"
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
              name="tbLahir"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Panjang Lahir (cm)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="50.0"
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

          <Controller
            control={form.control}
            name="posyanduId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Posyandu</FieldLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value ? field.value.toString() : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Posyandu" />
                  </SelectTrigger>
                  <SelectContent>
                    {posyanduData?.data?.map((posyandu) => (
                      <SelectItem
                        key={posyandu.id}
                        value={posyandu.id.toString()}
                      >
                        {posyandu.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
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
