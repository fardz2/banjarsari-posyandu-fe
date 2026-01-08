import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
import { FormSkeleton } from "../../../components/skeletons/form-skeleton";
import { OrtuCombobox } from "../../../components/form/ortu-combobox";

import { useAnakDetail } from "../../../hooks/anak/useAnak";
import {
  useCreateAnak,
  useUpdateAnak,
} from "../../../hooks/anak/useAnakMutations";
import { usePosyandu } from "../../../hooks/posyandu/usePosyandu";
import { useOrtu } from "../../../hooks/ortu/useOrtu";
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

  const { data: posyanduData, isLoading: isLoadingPosyandu } = usePosyandu({
    limit: 100,
  });
  const { data: ortuData, isLoading: isLoadingOrtu } = useOrtu({ limit: 100 });

  const createMutation = useCreateAnak();
  const updateMutation = useUpdateAnak();

  const form = useForm<AnakFormValues>({
    resolver: zodResolver(anakSchema),
    defaultValues: {
      nik: "",
      nama: "",
      jenisKelamin: "Laki-laki",
      tglLahir: "",
      bbLahir: undefined,
      tbLahir: undefined,
      posyanduId: 0,
      ortuId: undefined,
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
        ortuId: data.ortuId || undefined,
      });
    }
  }, [anakData, form]);

  const onSubmit = async (values: AnakFormValues) => {
    const payload = { ...values };

    const promise =
      isEdit && nik
        ? updateMutation.mutateAsync({ nik, data: payload })
        : createMutation.mutateAsync(payload);

    toast.promise(promise, {
      loading: isEdit ? "Memperbarui data anak..." : "Menambahkan data anak...",
      success: isEdit
        ? "Data anak berhasil diperbarui!"
        : "Data anak berhasil ditambahkan!",
      error: (err) => err?.message || "Gagal menyimpan data anak",
    });

    try {
      await promise;
      onSuccess?.();
    } catch (error) {
      // Error handled by toast.promise
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Show skeleton while loading data for edit mode
  if (isEdit && isLoadingDetail) {
    return <FormSkeleton fieldCount={8} />;
  }

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
                  <Input placeholder="Nama anak" {...field} />
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
                    key={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
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
                    placeholder="3.5"
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
                  key={field.value} // Force re-render when value changes
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field.value ? field.value.toString() : ""}
                  disabled={isLoadingPosyandu}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingPosyandu
                          ? "Memuat data posyandu..."
                          : "Pilih Posyandu"
                      }
                    />
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

          <Controller
            control={form.control}
            name="ortuId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Orang Tua</FieldLabel>
                <OrtuCombobox
                  value={field.value}
                  onChange={field.onChange}
                  options={ortuData?.data}
                  disabled={isLoadingOrtu}
                  placeholder={
                    isLoadingOrtu
                      ? "Memuat data orang tua..."
                      : "Pilih Orang Tua"
                  }
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Simpan Perubahan" : "Tambah Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}
