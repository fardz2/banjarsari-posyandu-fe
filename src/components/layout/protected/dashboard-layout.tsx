"use client";

import { useMemo } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  LayoutDashboardIcon,
  UsersIcon,
  BuildingIcon,
  BabyIcon,
  RulerIcon,
  HeartIcon,
  UserIcon,
  LogOutIcon,
  UserCircleIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../../ui/sidebar";
import { Button } from "../../ui/button";
import { authClient } from "../../../lib/auth-client";

import type { Role } from "../../../types";
import { DashboardLayoutSkeleton } from "../../skeletons/dashboard-layout-skeleton";

// Navigation items dengan role-based access
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
      "ORANG_TUA",
    ] as Role[],
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: UsersIcon,
    roles: ["SUPER_ADMIN", "ADMIN"] as Role[],
  },
  {
    title: "Posyandu",
    url: "/dashboard/posyandu",
    icon: BuildingIcon,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
      "ORANG_TUA",
    ] as Role[],
  },
  {
    title: "Anak",
    url: "/dashboard/anak",
    icon: BabyIcon,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
    ] as Role[],
  },
  {
    title: "My Children",
    url: "/dashboard/my-children",
    icon: BabyIcon,
    roles: ["ORANG_TUA"] as Role[],
  },
  {
    title: "Pengukuran",
    url: "/dashboard/pengukuran",
    icon: RulerIcon,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
      "ORANG_TUA",
    ] as Role[],
  },
  {
    title: "Ibu Hamil",
    url: "/dashboard/ibu-hamil",
    icon: HeartIcon,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
    ] as Role[],
  },
  {
    title: "Orang Tua",
    url: "/dashboard/ortu",
    icon: UserIcon,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
    ] as Role[],
  },
];

export default function DashboardLayout() {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Berhasil logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal logout");
    }
  };

  // Filter menu items based on user role
  const filteredNavItems = useMemo(() => {
    const userRole = (session?.user as any)?.role as Role;
    if (!userRole) return [];
    return navigationItems.filter((item) => item.roles.includes(userRole));
  }, [session?.user]);

  // ... existing code ...

  // Show loading state
  if (isPending) {
    return <DashboardLayoutSkeleton />;
  }

  // Redirect to login if no session
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = session.user as any;

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <BuildingIcon className="h-6 w-6" />
            <div className="flex flex-col">
              <span className="font-semibold">Posyandu</span>
              <span className="text-xs text-muted-foreground">
                Sistem Informasi
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredNavItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/dashboard/profile">
                      <UserCircleIcon className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2">
              <UserCircleIcon className="h-5 w-5" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate">
                  {user?.displayUsername || user?.name || user?.username}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.role || "User"}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Sistem Informasi Posyandu</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
