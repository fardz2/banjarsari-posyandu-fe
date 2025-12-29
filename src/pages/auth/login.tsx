"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { authClient } from "../../lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { loginSchema, type LoginFormValues } from "../../utils/validations";

/**
 * Login Page Component
 * Handles user authentication with username/email and password
 * Supports "Remember Me" functionality
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  // Initialize form with React Hook Form + Zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  /**
   * Handle form submission
   * Determines if identifier is email or username and calls appropriate auth method
   */
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    try {
      // Detect if identifier is email or username
      const isEmail = values.identifier.includes("@");

      let result;

      // Call appropriate sign-in method
      if (isEmail) {
        result = await authClient.signIn.email({
          email: values.identifier,
          password: values.password,
          rememberMe: values.rememberMe, // ✅ Type-safe boolean
        });
      } else {
        result = await authClient.signIn.username({
          username: values.identifier,
          password: values.password,
          rememberMe: values.rememberMe, // ✅ Type-safe boolean
        });
      }

      const { data: res, error } = result;

      // Handle authentication error
      if (error) {
        toast.error(error.message || "Gagal masuk. Periksa kembali akun Anda.");
        return;
      }

      // Handle successful authentication
      if (res) {
        toast.success("Berhasil masuk!");

        // Optional: You can access user data here
        // console.log("User data:", res.user);

        navigate("/dashboard");
      }
    } catch (err) {
      // Handle unexpected errors
      console.error("Login error:", err);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full sm:max-w-md border-2">
        {/* Card Header */}
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Masuk</CardTitle>
          <CardDescription className="text-base">
            Gunakan username atau email untuk mengakses sistem.
          </CardDescription>
        </CardHeader>

        {/* Card Content - Form */}
        <CardContent>
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup>
              {/* Field: Username atau Email */}
              <Controller
                name="identifier"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="identifier">
                      Username atau Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="identifier"
                      placeholder="admin atau email@example.com"
                      autoComplete="username"
                      disabled={isLoading}
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? "identifier-error" : undefined
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError
                        id="identifier-error"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* Field: Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isLoading}
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? "password-error" : undefined
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError
                        id="password-error"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* Field: Remember Me Checkbox */}
              <Controller
                name="rememberMe"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      aria-label="Ingat saya di perangkat ini"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ingat saya di perangkat ini
                    </label>
                  </div>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        {/* Card Footer - Submit Button & Register Link */}
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full h-11 font-semibold"
            type="submit"
            form="login-form"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center text-sm text-muted-foreground">
            <Link
              to="/forgot-password"
              className="font-medium text-foreground hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-foreground hover:underline"
            >
              Daftar di sini
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
