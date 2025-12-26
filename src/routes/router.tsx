import LandingPage from "../pages/public/landing";
import Login from "../pages/auth/login";

import { createBrowserRouter, Navigate } from "react-router";
import NotFound from "../pages/not-found";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // Redirect dari route kosong atau salah ke home (opsional)
  { path: "", element: <Navigate to="/" replace /> },

  // Catch-all route: HARUS di paling bawah!
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
