import { useNavigate } from "react-router";
import { authClient } from "../../lib/auth-client";
import type { Role } from "../../types";
import { useEffect } from "react";
import { toast } from "sonner";

interface CanProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  redirectTo?: string;
  hideOnly?: boolean; // Tambahan: hanya hide tanpa redirect
}

export function Can({
  allowedRoles,
  children,
  redirectTo = "/dashboard",
  hideOnly = false, // Default false (redirect seperti biasa)
}: CanProps) {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Skip redirect jika hideOnly mode
    if (hideOnly) return;

    if (isPending) return;

    if (!session) {
      toast.error("Anda harus login terlebih dahulu");
      navigate("/login", { replace: true });
      return;
    }

    const userRole = (session.user as any)?.role as Role | undefined;

    if (!userRole || !allowedRoles.includes(userRole)) {
      toast.error("Anda tidak memiliki akses ke halaman ini");
      navigate(redirectTo, { replace: true });
    }
  }, [session, isPending, allowedRoles, navigate, redirectTo, hideOnly]);

  if (isPending) {
    return null;
  }

  if (!session) {
    return hideOnly ? null : null;
  }

  const userRole = (session.user as any)?.role as Role | undefined;

  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  return null;
}
