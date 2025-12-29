"use client";

import { Link } from "react-router";
import {
  UsersIcon,
  BuildingIcon,
  BabyIcon,
  HeartIcon,
  RulerIcon,
  UserIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useCurrentUser } from "../../../hooks";
import { DashboardSkeleton } from "../../../components/skeletons/dashboard-skeleton";

export default function DashboardHomePage() {
  const { data: userData, isLoading } = useCurrentUser();
  const user = userData?.data as any;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Users",
      icon: UsersIcon,
      value: "-",
      description: "Total registered users",
      href: "/dashboard/users",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      title: "Posyandu",
      icon: BuildingIcon,
      value: "-",
      description: "Active posyandu locations",
      href: "/dashboard/posyandu",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
    {
      title: "Anak",
      icon: BabyIcon,
      value: "-",
      description: "Registered children",
      href: "/dashboard/anak",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
    {
      title: "Ibu Hamil",
      icon: HeartIcon,
      value: "-",
      description: "Pregnant mothers",
      href: "/dashboard/ibu-hamil",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
    {
      title: "Pengukuran",
      icon: RulerIcon,
      value: "-",
      description: "Total measurements",
      href: "/dashboard/pengukuran",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
    {
      title: "Orang Tua",
      icon: UserIcon,
      value: "-",
      description: "Registered parents",
      href: "/dashboard/ortu",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
  ];

  const filteredStats = stats.filter((stat) =>
    stat.roles.includes(user?.role as any)
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || user?.username}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your posyandu today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStats.map((stat) => (
          <Link key={stat.title} to={stat.href}>
            <Card className="transition-colors hover:bg-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.role !== "ORANG_TUA" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add New Child</CardTitle>
                  <CardDescription>Register a new child</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/anak/new">
                    <button className="text-sm text-primary hover:underline">
                      Go to form →
                    </button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Record Measurement
                  </CardTitle>
                  <CardDescription>Add new measurement data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/pengukuran/new">
                    <button className="text-sm text-primary hover:underline">
                      Go to form →
                    </button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Register Ibu Hamil
                  </CardTitle>
                  <CardDescription>Add pregnant mother</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/ibu-hamil/new">
                    <button className="text-sm text-primary hover:underline">
                      Go to form →
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}

          {user?.role === "ORANG_TUA" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">My Children</CardTitle>
                <CardDescription>View your children's data</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard/my-children">
                  <button className="text-sm text-primary hover:underline">
                    View children →
                  </button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
