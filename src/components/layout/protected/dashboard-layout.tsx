import { useMemo, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Users,
  Building,
  Baby,
  Ruler,
  User,
  LogOut,
  UserCircle,
  MessageSquare,
  ChevronUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "../../ui/sidebar";
import { authClient } from "../../../lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

import type { Role } from "../../../types";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Beranda",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
      "ORANG_TUA",
    ] as Role[],
  },
  {
    title: "Kelola Pengguna",
    url: "/dashboard/users",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN"] as Role[],
  },
  {
    title: "Daftar Posyandu",
    url: "/dashboard/posyandu",
    icon: Building,
    roles: ["SUPER_ADMIN", "TENAGA_KESEHATAN"] as Role[],
  },
  {
    title: "Data Anak",
    url: "/dashboard/anak",
    icon: Baby,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
      "ORANG_TUA",
    ] as Role[],
  },
  {
    title: "Riwayat Pengukuran",
    url: "/dashboard/pengukuran",
    icon: Ruler,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
    ] as Role[],
  },
  {
    title: "Data Orang Tua",
    url: "/dashboard/ortu",
    icon: User,
    roles: [
      "SUPER_ADMIN",
      "ADMIN",
      "TENAGA_KESEHATAN",
      "KADER_POSYANDU",
    ] as Role[],
  },
  {
    title: "Forum Konsultasi",
    url: "/dashboard/forum",
    icon: MessageSquare,
    roles: ["SUPER_ADMIN", "TENAGA_KESEHATAN", "ORANG_TUA"] as Role[],
  },
];

function DashboardLayoutContent() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { state, setOpen, isMobile, setOpenMobile } = useSidebar();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            queryClient.clear();
            toast.success("Berhasil logout");
            navigate("/login");
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal logout");
    }
  };

  // Auto-close sidebar on mobile or when collapsed
  const handleNavClick = () => {
    if (isMobile) {
      // On mobile, close the mobile sheet
      setOpenMobile(false);
    } else if (state === "collapsed") {
      // On desktop collapsed mode, close the sidebar
      setOpen(false);
    }
  };

  // Filter items based on user role
  const filteredItems = useMemo(() => {
    const userRole = (session?.user as any)?.role as Role;
    if (!userRole) return [];

    return navigationItems.filter((item) => item.roles.includes(userRole));
  }, [session?.user]);

  const user = session?.user as any;
  const isCollapsed = state === "collapsed";

  return (
    <>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
          <div
            className={cn(
              "flex items-center gap-2 py-2 transition-all",
              isCollapsed ? "justify-center px-2" : "px-4"
            )}
          >
            <img
              src="/images/banjarsari.png"
              alt="KMS Banjarsari Logo"
              className={cn(
                "transition-all",
                isCollapsed ? "h-5 w-4" : "h-10 w-10"
              )}
            />
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold truncate">KMS Banjarsari</span>
              </div>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link to={item.url} onClick={handleNavClick}>
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className={cn(
                      "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <UserCircle className="h-5 w-5 shrink-0" />
                    {!isCollapsed && (
                      <>
                        <div className="flex flex-col flex-1 min-w-0 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {user?.displayUsername ||
                              user?.name ||
                              user?.username}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {user?.role?.replace(/_/g, " ")}
                          </span>
                        </div>
                        <ChevronUp className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "top"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <UserCircle className="h-8 w-8 shrink-0 rounded-full" />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="truncate font-semibold">
                          {user?.displayUsername ||
                            user?.name ||
                            user?.username}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="cursor-pointer">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      setShowLogoutDialog(true);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">
              Sistem Informasi KMS Banjarsari
            </h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar dari aplikasi? Anda harus login
              kembali untuk mengakses dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardLayoutContent />
    </SidebarProvider>
  );
}
