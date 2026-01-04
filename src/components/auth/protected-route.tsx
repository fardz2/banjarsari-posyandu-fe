import { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { authClient } from "../../lib/auth-client";
import { toast } from "sonner";
import { DashboardLayoutSkeleton } from "../skeletons/dashboard-layout-skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 * Wrapper component that protects routes requiring authentication
 * Uses useSession() hook to check authentication status
 * Redirects to /login with callback URL if not authenticated
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      // Session tidak ada atau expired
      // Save current URL as callback
      const callbackUrl = location.pathname + location.search;

      toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
      navigate(`/login?callback=${encodeURIComponent(callbackUrl)}`, {
        replace: true,
      });
    }
  }, [session, isPending, navigate, location]);

  // Show loading state while checking session
  if (isPending) {
    return <DashboardLayoutSkeleton />;
  }

  // If no session, return null (will redirect in useEffect)
  if (!session) {
    return null;
  }

  // Session exists, render protected content
  return <>{children}</>;
}
