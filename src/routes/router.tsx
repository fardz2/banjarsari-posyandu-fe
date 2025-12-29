import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "../pages/public/landing";
import Login from "../pages/auth/login";
import NotFound from "../pages/not-found";
import Dashboard from "../pages/protected/dashboard/dashboard";
import ProtectedLayout from "../components/layout/protected/protected-layout";

const router = createBrowserRouter([
  // --- PUBLIC ROUTES ---
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // --- PROTECTED ROUTES (Hanya bisa diakses jika sudah login) ---
  {
    element: <ProtectedLayout />, // Bungkus semua rute di bawah ini
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // Tambahkan rute terproteksi lainnya di sini
      // { path: "/profile", element: <Profile /> },
    ],
  },

  // --- UTILS ---
  { path: "", element: <Navigate to="/" replace /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
