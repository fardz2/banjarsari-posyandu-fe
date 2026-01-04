import { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { authClient } from "../../lib/auth-client";
import { LoadingSkeleton } from "../skeletons/loading-skeleton";

interface AuthRouteProps {
  children: ReactNode;
}

/**
 * AuthRoute Component
 * Wrapper component for login/register pages
 * Uses useSession() hook to check if user is already authenticated
 * Redirects to dashboard or callback URL if already logged in
 */
export function AuthRoute({ children }: AuthRouteProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      // User sudah login, check if there's a callback URL
      const callbackUrl = searchParams.get("callback");

      if (callbackUrl) {
        // Redirect to callback URL
        navigate(callbackUrl, { replace: true });
      } else {
        // Default redirect to dashboard
        navigate("/dashboard", { replace: true });
      }
    }
  }, [session, isPending, navigate, searchParams]);

  // Show loading state while checking session
  if (isPending) {
    return <LoadingSkeleton />;
  }

  // If session exists, return null (will redirect in useEffect)
  if (session) {
    return null;
  }

  // No session, render auth page (login/register)
  return <>{children}</>;
}
