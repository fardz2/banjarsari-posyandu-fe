import { useState } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { identifier?: string; password?: string } = {};

    if (!identifier.trim()) {
      newErrors.identifier = "Username atau email harus diisi";
    }

    if (!password) {
      newErrors.password = "Password harus diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Login attempt with:", { identifier, password });
      // TODO: Add actual authentication logic here
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="border-2">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Masuk
            </CardTitle>
            <CardDescription className="text-base">
              Masukkan username atau email dan password untuk mengakses sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="font-semibold">
                  Username atau Email
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="username atau email@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`h-11 ${
                    errors.identifier ? "border-red-500" : ""
                  }`}
                />
                {errors.identifier && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.identifier}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-semibold">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-11 ${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full h-11 font-semibold">
                Masuk
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-foreground hover:underline"
                >
                  Daftar di sini
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
