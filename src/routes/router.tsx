import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "../pages/public/landing";
import Login from "../pages/auth/login";
import NotFound from "../pages/not-found";
import Dashboard from "../pages/protected/dashboard/dashboard";
import UsersListPage from "../pages/protected/users/users-list";
import PosyanduListPage from "../pages/protected/posyandu/posyandu-list";

import AnakListPage from "../pages/protected/anak/anak-list";
import AnakDetail from "../pages/protected/anak/anak-detail";

import DashboardLayout from "../components/layout/protected/dashboard-layout";

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
    element: <DashboardLayout />, // Bungkus semua rute di bawah ini
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/users",
        element: <UsersListPage />,
      },
      {
        path: "/dashboard/posyandu",
        element: <PosyanduListPage />,
      },
      {
        path: "/dashboard/anak",
        element: <AnakListPage />,
      },
      {
        path: "/dashboard/anak/:nik",
        element: <AnakDetail />,
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
