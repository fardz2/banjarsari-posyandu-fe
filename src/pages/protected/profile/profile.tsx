import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authClient } from "../../../lib/auth-client";
import {
  profileSchema,
  profileChangePasswordSchema,
  type ProfileFormValues,
  type ProfileChangePasswordFormValues,
} from "../../../utils/validations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { PasswordInput } from "../../../components/ui/password-input";
import { Field, FieldLabel, FieldError } from "../../../components/ui/field";
import { ProfileSkeleton } from "../../../components/skeletons/profile-skeleton";
import { Separator } from "../../../components/ui/separator";

export default function ProfilePage() {
  const { data: session, isPending: isLoadingSession } =
    authClient.useSession();
  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  const passwordForm = useForm<ProfileChangePasswordFormValues>({
    resolver: zodResolver(profileChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update form when session data is loaded
  React.useEffect(() => {
    if (session?.user) {
      profileForm.reset({
        name: session.user.name,
        username: (session.user as any).username || "",
      });
    }
  }, [session, profileForm]);

  const onSubmitProfile = async (values: ProfileFormValues) => {
    setIsUpdatingProfile(true);
    try {
      await authClient.updateUser({
        name: values.name,
        ...(values.username && { username: values.username }),
      });

      toast.success("Profile berhasil diperbarui");
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error(error?.message || "Gagal memperbarui profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onSubmitPassword = async (values: ProfileChangePasswordFormValues) => {
    setIsChangingPassword(true);
    try {
      await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: false,
      });

      toast.success("Password berhasil diubah");
      passwordForm.reset();
    } catch (error: any) {
      console.error("Change password error:", error);
      toast.error(error?.message || "Gagal mengubah password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoadingSession) {
    return <ProfileSkeleton />;
  }

  const user = session?.user as any;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Kelola informasi akun dan keamanan Anda
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profile</CardTitle>
            <CardDescription>Perbarui informasi personal Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={profileForm.handleSubmit(onSubmitProfile)}
              className="space-y-4"
            >
              <Controller
                name="name"
                control={profileForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      disabled={isUpdatingProfile}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="username"
                control={profileForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Masukkan username"
                      disabled={isUpdatingProfile}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full sm:w-auto"
              >
                {isUpdatingProfile ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Detail Akun</CardTitle>
            <CardDescription>Informasi akun Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="text-sm font-medium">
                {user?.role?.replace(/_/g, " ")}
              </p>
            </div>

            {user?.posyandu && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Posyandu
                  </p>
                  <p className="text-sm font-medium">{user.posyandu.nama}</p>
                </div>
              </>
            )}

            <Separator />

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Bergabung Sejak
              </p>
              <p className="text-sm font-medium">
                {new Date(user?.createdAt || "").toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ubah Password</CardTitle>
            <CardDescription>
              Perbarui password Anda untuk menjaga keamanan akun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
              className="space-y-4 max-w-md"
            >
              <Controller
                name="currentPassword"
                control={passwordForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="currentPassword">
                      Password Saat Ini
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      id="currentPassword"
                      placeholder="Masukkan password saat ini"
                      disabled={isChangingPassword}
                      autoComplete="current-password"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="newPassword"
                control={passwordForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newPassword">Password Baru</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="newPassword"
                      placeholder="Masukkan password baru (min. 6 karakter)"
                      disabled={isChangingPassword}
                      autoComplete="new-password"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={passwordForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Konfirmasi Password Baru
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      id="confirmPassword"
                      placeholder="Konfirmasi password baru"
                      disabled={isChangingPassword}
                      autoComplete="new-password"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={isChangingPassword}
                className="w-full sm:w-auto"
              >
                {isChangingPassword ? "Mengubah..." : "Ubah Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
