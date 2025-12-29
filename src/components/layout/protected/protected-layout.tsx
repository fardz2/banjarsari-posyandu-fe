import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { authClient } from "../../../lib/auth-client";
import { toast } from "sonner";

export default function ProtectedLayout() {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  useEffect(() => {
    // Jika loading selesai dan tidak ada sesi
    if (!isPending && !session) {
      toast.error("Akses ditolak", {
        description:
          "Silakan login terlebih dahulu untuk mengakses halaman ini.",
        duration: 3000,
      });
    }
  }, [isPending, session]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    // Redirect ke login dengan menyimpan lokasi asal
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
