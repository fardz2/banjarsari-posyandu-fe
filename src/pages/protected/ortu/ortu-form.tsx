import { useEffect, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { DialogFooter } from "../../../components/ui/dialog";
import { FormSkeleton } from "../../../components/skeletons/form-skeleton";

import {
  useCreateOrtu,
  useUpdateOrtu,
} from "../../../hooks/ortu/useOrtuMutations";
import { useUsers, useUserDetail } from "../../../hooks/user/useUser";
import {
  ortuSchema,
  type OrtuFormValues,
} from "../../../utils/validations/ortu.validation";
import type { Ortu } from "../../../types";

interface OrtuFormProps {
  initialData?: Ortu;
  onSuccess?: (newOrtu?: Ortu) => void;
  onCancel?: () => void;
  isDialog?: boolean;
}

export default function OrtuForm({
  initialData,
  onSuccess,
  onCancel,
  isDialog = false,
}: OrtuFormProps) {
  const isEdit = !!initialData;

  const createMutation = useCreateOrtu();
  const updateMutation = useUpdateOrtu();

  // 1a. Fetch Unassigned Ayah Candidates (Male)
  const { data: ayahCandidatesData, isLoading: isAyahListLoading } = useUsers({
    role: "ORANG_TUA",
    limit: 100,
    unassignedOrtu: true,
    jenisKelamin: "Laki-laki",
  });

  // 1b. Fetch Unassigned Ibu Candidates (Female)
  const { data: ibuCandidatesData, isLoading: isIbuListLoading } = useUsers({
    role: "ORANG_TUA",
    limit: 100,
    unassignedOrtu: true,
    jenisKelamin: "Perempuan",
  });

  // 2. Fetch Current Ayah (if editing)
  const { data: currentAyahData, isLoading: isAyahDetailLoading } =
    useUserDetail(initialData?.userAyahId || "", !!initialData?.userAyahId);

  // 3. Fetch Current Ibu (if editing)
  const { data: currentIbuData, isLoading: isIbuDetailLoading } = useUserDetail(
    initialData?.userIbuId || "",
    !!initialData?.userIbuId
  );

  const ayahUsers = useMemo(() => {
    const list = [...(ayahCandidatesData?.data || [])];
    if (currentAyahData?.data) {
      // Ensure current ayah is in the list even if no longer unassigned (he is assigned to THIS record)
      if (!list.find((u) => u.id === currentAyahData.data?.id))
        list.push(currentAyahData.data);
    }
    return list;
  }, [ayahCandidatesData, currentAyahData]);

  const ibuUsers = useMemo(() => {
    const list = [...(ibuCandidatesData?.data || [])];
    if (currentIbuData?.data) {
      // Ensure current ibu is in the list
      if (!list.find((u) => u.id === currentIbuData.data?.id))
        list.push(currentIbuData.data);
    }
    return list;
  }, [ibuCandidatesData, currentIbuData]);

  const isUsersLoading =
    isAyahListLoading ||
    isIbuListLoading ||
    isAyahDetailLoading ||
    isIbuDetailLoading;

  const form = useForm<OrtuFormValues>({
    resolver: zodResolver(ortuSchema),
    defaultValues: {
      userAyahId: "none",
      userIbuId: "none",
    },
  });

  // Load data for edit
  useEffect(() => {
    if (initialData) {
      form.reset({
        userAyahId: initialData.userAyahId || "none",
        userIbuId: initialData.userIbuId || "none",
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: OrtuFormValues) => {
    const payload: any = { ...values };

    if (values.userAyahId === "none" || !values.userAyahId) {
      delete payload.userAyahId;
    }
    if (values.userIbuId === "none" || !values.userIbuId) {
      delete payload.userIbuId;
    }

    const promise =
      isEdit && initialData
        ? updateMutation.mutateAsync({ id: initialData.id, data: payload })
        : createMutation.mutateAsync(payload);

    toast.promise(promise, {
      loading: isEdit
        ? "Memperbarui data orang tua..."
        : "Menambahkan data orang tua...",
      success: isEdit
        ? "Data orang tua berhasil diperbarui!"
        : "Data orang tua berhasil ditambahkan!",
      error: (err) => err?.message || "Gagal menyimpan data orang tua",
    });

    try {
      const response = await promise;
      const result = isEdit ? undefined : response?.data;
      onSuccess?.(result);
    } catch (error) {
      // Error handled by toast.promise
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Show skeleton while loading users data
  if (isUsersLoading) {
    return <FormSkeleton fieldCount={2} />;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div
        className={isDialog ? "space-y-4" : "space-y-6 border p-4 rounded-md"}
      >
        {!isDialog && (
          <h3 className="font-semibold text-lg">
            {isEdit ? "Edit Orang Tua" : "Tambah Orang Tua"}
          </h3>
        )}

        <p className="text-sm text-muted-foreground mb-4">
          Pilih User untuk Ayah dan/atau Ibu. Nama dan data lain akan diambil
          dari akun User.
        </p>

        <FieldGroup>
          {/* User Account Linking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="userAyahId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>User Ayah</FieldLabel>
                  <Select
                    key={field.value} // Force re-render when value changes
                    onValueChange={(val) => {
                      field.onChange(val);
                    }}
                    defaultValue={field.value || "none"}
                    disabled={isUsersLoading}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isUsersLoading ? "Memuat..." : "Pilih Akun User"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- Tidak Ada --</SelectItem>
                      {ayahUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.username})
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
              name="userIbuId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>User Ibu</FieldLabel>
                  <Select
                    key={field.value} // Force re-render when value changes
                    onValueChange={(val) => {
                      field.onChange(val);
                    }}
                    defaultValue={field.value || "none"}
                    disabled={isUsersLoading}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isUsersLoading ? "Memuat..." : "Pilih Akun User"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- Tidak Ada --</SelectItem>
                      {ibuUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.username})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </div>

      {isDialog ? (
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Simpan Perubahan" : "Tambah Data"}
          </Button>
        </DialogFooter>
      ) : (
        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>
              Batal
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Simpan Perubahan" : "Tambah Data"}
          </Button>
        </div>
      )}
    </form>
  );
}
