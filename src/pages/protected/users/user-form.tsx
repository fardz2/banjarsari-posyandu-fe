"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
import {
  useCreateUser,
  useUpdateUser,
} from "../../../hooks/user/useUserMutations";
import { useCurrentUser } from "../../../hooks";
import { usePosyandu } from "../../../hooks/posyandu/usePosyandu";
import type { User, Role } from "../../../types";

const ROLES: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "TENAGA_KESEHATAN",
  "KADER_POSYANDU",
  "ORANG_TUA",
];

const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]).optional(),
  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN",
    "TENAGA_KESEHATAN",
    "KADER_POSYANDU",
    "ORANG_TUA",
  ]),
  posyanduId: z.string().optional(), // We'll convert to number on submit
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User; // If provided, we are in Edit mode
  onSuccess: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const isEditing = !!user;
  const { data: userData } = useCurrentUser();
  const currentUser = userData?.data as any; // Simplified for now
  const isKader = currentUser?.role === "KADER_POSYANDU";

  // Form definition
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      jenisKelamin:
        (user?.jenisKelamin as "Laki-laki" | "Perempuan") || undefined,
      role: user?.role || "ORANG_TUA",
      posyanduId: user?.posyanduId?.toString() || "",
      password: "",
    },
  });

  const { data: posyanduList } = usePosyandu({ limit: 100 });
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const watchedRole = form.watch("role");
  const needsPosyandu = ["KADER_POSYANDU", "ORANG_TUA"].includes(watchedRole);
  const needsGender = watchedRole === "ORANG_TUA";

  const onSubmit = async (data: UserFormValues) => {
    try {
      const payload: any = {
        name: data.name,
        username: data.username,
        email: data.email,
        jenisKelamin: data.jenisKelamin,
        role: data.role,
        posyanduId: data.posyanduId ? parseInt(data.posyanduId) : undefined,
      };

      if (!isEditing) {
        // Create mode: Password required
        if (!data.password) {
          form.setError("password", {
            message: "Password wajib diisi untuk user baru",
          });
          return;
        }
        payload.password = data.password;
        await createUserMutation.mutateAsync(payload);
      } else {
        // Edit mode
        await updateUserMutation.mutateAsync({
          id: user.id,
          data: {
            name: data.name,
            jenisKelamin: data.jenisKelamin,
            username: data.username,
            posyanduId: payload.posyanduId,
          },
        });
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan user");
    }
  };

  const isLoading =
    createUserMutation.isPending || updateUserMutation.isPending;

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nama Lengkap</FieldLabel>
                <Input placeholder="Nama user" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Username</FieldLabel>
                <Input placeholder="username" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="example@mail.com" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {needsGender && (
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
          )}

          {!isEditing && (
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" placeholder="******" {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          )}

          <Controller
            control={form.control}
            name="role"
            render={({ field, fieldState }) => {
              // useCurrentUser hook logic inside component?
              // Better to use context or pass props. But since we are inside the component...
              // We need to fetch current user to know role if not passed.
              // We can't use hook inside render callback.
              // Let's rely on props or assume the component above handles it?
              // Actually I should add useCurrentUser at top of this component.
              // But replacement is focused on this block.
              // Let's modify the whole component start to include useCurrentUser and logic.
              // Wait, I can only replace this block? No, I need `isKader` variable.
              // I will cancel this and do a larger replacement or insert usage at top.
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Role</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isEditing || isKader} // Disable if editing or if Kader (forced to ORANG_TUA)
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              );
            }}
          />

          {needsPosyandu && (
            <Controller
              control={form.control}
              name="posyanduId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Posyandu</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Posyandu" />
                    </SelectTrigger>
                    <SelectContent>
                      {posyanduList?.data.map((p) => (
                        <SelectItem key={p.id} value={p.id.toString()}>
                          {p.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          )}
        </FieldGroup>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => onSuccess()}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Menyimpan..."
              : isEditing
              ? "Simpan Perubahan"
              : "Buat User"}
          </Button>
        </div>
      </form>
    </div>
  );
}
