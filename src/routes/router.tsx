import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/public/landing";
import Login from "../pages/auth/login";

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
]);

export default router;
