import { redirect } from "react-router";
import { authClient } from "./auth-client";
import { toast } from "sonner";

/**
 * Protected Loader
 * Checks if user is authenticated before allowing access to protected routes
 * Redirects to /login with callback URL if not authenticated or session expired
 */
export const protectedLoader = async ({ request }: { request: Request }) => {
  try {
    const session = await authClient.getSession();
    
    if (!session?.data) {
      // Session tidak ada atau expired
      // Save current URL as callback
      const url = new URL(request.url);
      const callbackUrl = url.pathname + url.search;
      
      toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
      throw redirect(`/login?callback=${encodeURIComponent(callbackUrl)}`);
    }
    
    // Return session data to be used in components
    return { session: session.data };
  } catch (error) {
    // If error is redirect, rethrow it
    if (error instanceof Response) {
      throw error;
    }
    
    console.error("Protected loader error:", error);
    toast.error("Terjadi kesalahan. Silakan login kembali.");
    
    // Save current URL as callback
    const url = new URL(request.url);
    const callbackUrl = url.pathname + url.search;
    throw redirect(`/login?callback=${encodeURIComponent(callbackUrl)}`);
  }
};

/**
 * Auth Loader
 * Redirects to dashboard or callback URL if user is already authenticated
 * Used for login/register pages
 */
export const authLoader = async ({ request }: { request: Request }) => {
  try {
    const session = await authClient.getSession();
    
    if (session?.data) {
      // User sudah login, check if there's a callback URL
      const url = new URL(request.url);
      const callbackUrl = url.searchParams.get("callback");
      
      if (callbackUrl) {
        // Redirect to callback URL
        throw redirect(callbackUrl);
      }
      
      // Default redirect to dashboard
      throw redirect("/dashboard");
    }
    
    return null;
  } catch (error) {
    // If error is redirect, rethrow it
    if (error instanceof Response) {
      throw error;
    }
    
    // Error saat cek session, biarkan user tetap di halaman auth
    console.error("Auth loader error:", error);
    return null;
  }
};
