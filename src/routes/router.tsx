import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "../pages/public/landing";
import Login from "../pages/auth/login";
import NotFound from "../pages/not-found";
import Dashboard from "../pages/protected/dashboard/dashboard";
import UsersListPage from "../pages/protected/users/users-list";
import PosyanduListPage from "../pages/protected/posyandu/posyandu-list";
import ProfilePage from "../pages/protected/profile/profile";

import AnakListPage from "../pages/protected/anak/anak-list";
import AnakDetail from "../pages/protected/anak/anak-detail";
import PengukuranListPage from "../pages/protected/pengukuran/pengukuran-list";
import OrtuListPage from "../pages/protected/ortu/ortu-list";
import IbuHamilListPage from "../pages/protected/ibu-hamil/ibu-hamil-list";
import ForumListPage from "../pages/protected/forum/forum-list";
import ForumDetailPage from "../pages/protected/forum/forum-detail";

import DashboardLayout from "../components/layout/protected/dashboard-layout";
import { protectedLoader, authLoader } from "../lib/auth-loaders";
import { LoadingSkeleton } from "../components/skeletons/loading-skeleton";
import { DashboardLayoutSkeleton } from "../components/skeletons/dashboard-layout-skeleton";

const router = createBrowserRouter([
  // --- PUBLIC ROUTES ---
  {
    path: "/",
    element: <LandingPage />,
    HydrateFallback: LoadingSkeleton,
  },

  // --- AUTH ROUTES (Redirect to dashboard if already logged in) ---
  {
    path: "/login",
    element: <Login />,
    loader: authLoader,
    HydrateFallback: LoadingSkeleton,
  },

  // --- PROTECTED ROUTES (Require authentication) ---
  {
    element: <DashboardLayout />,
    loader: protectedLoader,
    HydrateFallback: DashboardLayoutSkeleton,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
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
        path: "/dashboard/my-children",
        element: <AnakListPage />, // Reusing list page which handles RBAC internally
      },
      {
        path: "/dashboard/anak/:nik",
        element: <AnakDetail />,
      },
      {
        path: "/dashboard/pengukuran",
        element: <PengukuranListPage />,
      },
      {
        path: "/dashboard/ortu",
        element: <OrtuListPage />,
      },
      {
        path: "/dashboard/ibu-hamil",
        element: <IbuHamilListPage />,
      },
      {
        path: "/dashboard/forum",
        element: <ForumListPage />,
      },
      {
        path: "/dashboard/forum/:id",
        element: <ForumDetailPage />,
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
