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
import { ChartSkeleton } from "../../../components/skeletons/chart-skeleton";
import { Can } from "../../../components/auth";
import {
  useDashboardSummary,
  useGenderStats,
  useNutritionalStats,
  useNutritionalStatsByPosyandu,
  useVisitTrends,
} from "../../../hooks/dashboard/useDashboard";
import {
  VisitTrendsChart,
  GenderDistributionChart,
  NutritionalStatusChart,
  NutritionalStatusByPosyanduChart,
} from "../../../components/charts";
import { normalizeStatus } from "../../../lib/chart-config";

export default function DashboardHomePage() {
  const { data: userData, isLoading: isUserLoading } = useCurrentUser();
  const user = userData?.data as any;
  const isEnabled = !!user;

  const { data: summaryData, isLoading: isSummaryLoading } =
    useDashboardSummary({ enabled: isEnabled });
  const { data: genderData, isLoading: isGenderLoading } = useGenderStats({
    enabled: isEnabled,
  });
  const { data: nutritionData, isLoading: isNutritionLoading } =
    useNutritionalStats({ enabled: isEnabled });
  const { data: posyanduStatsData, isLoading: isPosyanduStatsLoading } =
    useNutritionalStatsByPosyandu({ enabled: isEnabled });
  const { data: trendData, isLoading: isTrendLoading } = useVisitTrends({
    enabled: isEnabled,
  });

  const summary = summaryData?.data;

  // Show skeleton only while user is loading
  if (isUserLoading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Pengguna",
      icon: UsersIcon,
      value: summary?.users || 0,
      description: "Total pengguna terdaftar",
      href: "/dashboard/users",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      title: "Posyandu",
      icon: BuildingIcon,
      value: summary?.posyandu || 0,
      description: "Lokasi posyandu aktif",
      href: "/dashboard/posyandu",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN"],
    },
    {
      title: "Anak",
      icon: BabyIcon,
      value: summary?.anak || 0,
      description: "Belum termasuk data baru",
      href: "/dashboard/anak",
      roles: [
        "SUPER_ADMIN",
        "ADMIN",
        "TENAGA_KESEHATAN",
        "KADER_POSYANDU",
        "ORANG_TUA",
      ],
    },
    {
      title: "Ibu Hamil",
      icon: HeartIcon,
      value: summary?.ibuHamil || 0,
      description: "Ibu hamil terdaftar",
      href: "/dashboard/ibu-hamil",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
    {
      title: "Pengukuran",
      icon: RulerIcon,
      value: summary?.pengukuran || 0,
      description: "Total pengukuran",
      href: "/dashboard/pengukuran",
      roles: [
        "SUPER_ADMIN",
        "ADMIN",
        "TENAGA_KESEHATAN",
        "KADER_POSYANDU",
        "ORANG_TUA",
      ],
    },
    {
      title: "Orang Tua",
      icon: UserIcon,
      value: summary?.ortu || 0,
      description: "Orang tua terdaftar",
      href: "/dashboard/ortu",
      roles: ["SUPER_ADMIN", "ADMIN", "TENAGA_KESEHATAN", "KADER_POSYANDU"],
    },
  ];

  // Transform data for charts
  const genderChartData =
    genderData?.data?.map((g) => ({
      gender: g.gender === "Laki-laki" ? "laki" : "perempuan",
      count: g.count,
      fill:
        g.gender === "Laki-laki"
          ? "var(--color-laki)"
          : "var(--color-perempuan)",
    })) || [];

  const trendChartData = trendData?.data || [];

  const giziData =
    nutritionData?.data?.gizi
      ?.filter((d: any) => d.status)
      .map((d: any) => {
        const key = normalizeStatus(d.status || "");
        return {
          status: key, // Use the key for color mapping
          label: d.status, // Keep original label for display
          count: d.count,
          fill: `var(--color-${key})`,
        };
      }) || [];

  const bbUData =
    nutritionData?.data?.bb_u
      ?.filter((d: any) => d.status)
      .map((d: any) => {
        const key = normalizeStatus(d.status || "");
        return {
          status: key,
          label: d.status,
          count: d.count,
          fill: `var(--color-${key})`,
        };
      }) || [];

  const tbUData =
    nutritionData?.data?.tb_u
      ?.filter((d: any) => d.status)
      .map((d: any) => {
        const key = normalizeStatus(d.status || "");
        return {
          status: key,
          label: d.status,
          count: d.count,
          fill: `var(--color-${key})`,
        };
      }) || [];

  const lkUData =
    nutritionData?.data?.lk_u
      ?.filter((d: any) => d.status)
      .map((d: any) => {
        const key = normalizeStatus(d.status || "");
        return {
          status: key,
          label: d.status,
          count: d.count,
          fill: `var(--color-${key})`,
        };
      }) || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">
          Selamat datang kembali, {user?.name || user?.username}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {user?.role === "ORANG_TUA"
            ? "Pantau perkembangan kesehatan anak Anda."
            : "Berikut ringkasan data posyandu Anda hari ini."}
        </p>
      </div>

      {/* Stats Grid */}
      {isSummaryLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-1" />
                <div className="h-3 w-3/4 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Can key={stat.title} allowedRoles={stat.roles as any} hideOnly>
              <Link to={stat.href}>
                <Card className="transition-colors hover:bg-accent h-full">
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
            </Can>
          ))}
        </div>
      )}

      {/* Charts Section - Visible to All Roles Except Orang Tua */}
      {user?.role !== "ORANG_TUA" && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Visit Trends - Area Chart */}
          {isTrendLoading ? (
            <ChartSkeleton />
          ) : (
            <VisitTrendsChart data={trendChartData} />
          )}

          {/* Gender Stats - Pie Chart */}
          {isGenderLoading ? (
            <ChartSkeleton />
          ) : (
            <GenderDistributionChart data={genderChartData} />
          )}

          {/* Status Gizi (BB/TB) - Donut Chart */}
          {isNutritionLoading ? (
            <ChartSkeleton />
          ) : (
            <NutritionalStatusChart
              data={giziData}
              title="Status Gizi (BB/TB)"
              description="Distribusi status gizi anak"
              chartType="donut"
            />
          )}

          {/* Status Berat Badan (BB/U) - Horizontal Bar */}
          {isNutritionLoading ? (
            <ChartSkeleton />
          ) : (
            <NutritionalStatusChart
              data={bbUData}
              title="Status Berat Badan (BB/U)"
              description="Distribusi berat badan menurut umur"
              chartType="horizontal-bar"
              showLegend={false}
            />
          )}

          {/* Status Tinggi Badan (TB/U) - Vertical Bar */}
          {isNutritionLoading ? (
            <ChartSkeleton />
          ) : (
            <NutritionalStatusChart
              data={tbUData}
              title="Status Tinggi Badan (TB/U)"
              description="Distribusi tinggi badan menurut umur"
              chartType="vertical-bar"
              showLegend={false}
            />
          )}

          {/* Status Lingkar Kepala (LK/U) - Horizontal Bar */}
          {isNutritionLoading ? (
            <ChartSkeleton />
          ) : (
            <NutritionalStatusChart
              data={lkUData}
              title="Status Lingkar Kepala (LK/U)"
              description="Distribusi lingkar kepala menurut umur"
              chartType="horizontal-bar"
              showLegend={false}
            />
          )}

          {/* POSYANDU BREAKDOWN */}
          <Can allowedRoles={["SUPER_ADMIN", "TENAGA_KESEHATAN"]} hideOnly>
            {isPosyanduStatsLoading ? (
              <ChartSkeleton />
            ) : (
              <NutritionalStatusByPosyanduChart
                data={posyanduStatsData?.data || []}
                title="Status Gizi per Posyandu"
                description="Breakdown status gizi berdasarkan lokasi Posyandu"
              />
            )}
          </Can>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user?.role !== "ORANG_TUA" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tambah Anak Baru</CardTitle>
                  <CardDescription>Daftarkan anak baru</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/anak/new">
                    <button className="text-sm text-primary hover:underline">
                      Ke formulir →
                    </button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Catat Pengukuran</CardTitle>
                  <CardDescription>Tambah data pengukuran baru</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/pengukuran/new">
                    <button className="text-sm text-primary hover:underline">
                      Ke formulir →
                    </button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daftar Ibu Hamil</CardTitle>
                  <CardDescription>Tambah ibu hamil baru</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/ibu-hamil/new">
                    <button className="text-sm text-primary hover:underline">
                      Ke formulir →
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}

          {user?.role === "ORANG_TUA" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Anak Saya</CardTitle>
                <CardDescription>Lihat data anak Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard/anak">
                  <button className="text-sm text-primary hover:underline">
                    Lihat anak →
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
