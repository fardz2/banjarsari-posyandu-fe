import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useAnakDetail } from "../../../hooks/anak/useAnak";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { DetailSkeleton } from "../../../components/skeletons/detail-skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { usePengukuranByAnakNik } from "../../../hooks/anak/usePengukuran";
import { GrowthChart } from "../../../components/charts/growth-chart";
import { authClient } from "../../../lib/auth-client";
import { EditPengukuranDialog } from "../../../components/dialogs";
import { DataTable } from "../../../components/ui/data-table";
import { createPengukuranDetailColumns } from "../../../components/columns";
import type { Pengukuran } from "../../../types";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function AnakDetail() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const isOrtu = user?.role === "ORANG_TUA";
  const isTenagaKesehatan = user?.role === "TENAGA_KESEHATAN";

  const { nik } = useParams<{ nik: string }>();
  const { data: response, isLoading } = useAnakDetail(nik || "");
  const { data: pengukuranResponse, isLoading: isLoadingPengukuran } =
    usePengukuranByAnakNik(nik || "");

  const anak = response?.data;
  const pengukuranList = pengukuranResponse?.data || [];

  // State for edit dialog
  const [editingPengukuran, setEditingPengukuran] = useState<Pengukuran | null>(
    null
  );

  // Create columns for pengukuran table
  const pengukuranColumns = useMemo(
    () =>
      createPengukuranDetailColumns({
        onEdit: isOrtu ? undefined : setEditingPengukuran,
        hideActions: isOrtu || isTenagaKesehatan,
      }),
    [isOrtu, isTenagaKesehatan]
  );

  // Transform data for charts
  const chartData = pengukuranList
    .map((p) => {
      // Parse usiaSaatUkur "X bulan" -> X
      const ageMatch = p.usiaSaatUkur?.match(/([\d.]+) bulan/);
      const age = ageMatch ? parseFloat(ageMatch[1]) : 0;

      // We can also calculate age from birthDate to measurementDate if needed for precision,
      // but existing logic saves it. Let's use it.

      return {
        age,
        date: new Date(p.tglUkur),
        berat: p.berat,
        tinggi: p.tinggi,
        lingkarKepala: p.lingkarKepala,
      };
    })
    .sort((a, b) => a.age - b.age);

  if (isLoading || isLoadingPengukuran) {
    return <DetailSkeleton />;
  }

  if (!anak) {
    return <div>Data anak tidak ditemukan.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="-ml-2">
              <Link to="/dashboard/anak">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{anak.nama}</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mt-1 ml-9">
            <span className="font-mono">{anak.nik}</span>
            <span>•</span>
            <span>
              {anak.jenisKelamin === "Laki-laki" ? "Laki-laki" : "Perempuan"}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profil Lengkap</TabsTrigger>
          <TabsTrigger value="measurements">Riwayat Pengukuran</TabsTrigger>
          <TabsTrigger value="growth">Grafik Pertumbuhan</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Anak & Orang Tua</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Tanggal Lahir
                  </h4>
                  <p>
                    {anak.tglLahir
                      ? format(new Date(anak.tglLahir), "d MMMM yyyy", {
                          locale: id,
                        })
                      : "-"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Kondisi Lahir
                  </h4>
                  <p>
                    BB: {anak.bbLahir} kg, TB: {anak.tbLahir} cm
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Orang Tua
                  </h4>
                  <div className="space-y-1">
                    <p>Ayah: {anak.ortu?.namaAyah || "-"}</p>
                    <p>Ibu: {anak.ortu?.namaIbu || "-"}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Lokasi
                  </h4>
                  <p>
                    {anak.alamat}, RW {anak.rw || "-"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Posyandu: {anak.posyandu?.nama}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="measurements">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pengukuran</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={pengukuranColumns}
                data={pengukuranList}
                searchPlaceholder="Cari riwayat pengukuran..."
              />
            </CardContent>
          </Card>

          {/* Edit Pengukuran Dialog */}
          <EditPengukuranDialog
            open={!!editingPengukuran}
            onOpenChange={(open) => !open && setEditingPengukuran(null)}
            pengukuran={editingPengukuran}
          />
        </TabsContent>

        <TabsContent value="growth" className="space-y-8">
          {/* Berat Badan menurut Umur */}
          <Card>
            <CardHeader>
              <CardTitle>Kurva Pertumbuhan (BB/U)</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart
                type="wfa"
                gender={anak.jenisKelamin === "Laki-laki" ? "L" : "P"}
                data={chartData.map((d) => ({
                  age: d.age,
                  value: d.berat,
                  date: d.date,
                }))}
                yAxisLabel="Berat (kg)"
              />
            </CardContent>
          </Card>

          {/* Tinggi Badan menurut Umur */}
          <Card>
            <CardHeader>
              <CardTitle>Kurva Pertumbuhan (TB/U)</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart
                type="lhfa"
                gender={anak.jenisKelamin === "Laki-laki" ? "L" : "P"}
                data={chartData.map((d) => ({
                  age: d.age,
                  value: d.tinggi,
                  date: d.date,
                }))}
                yAxisLabel="Tinggi (cm)"
              />
            </CardContent>
          </Card>

          {/* Lingkar Kepala menurut Umur */}
          <Card>
            <CardHeader>
              <CardTitle>Kurva Pertumbuhan (LK/U)</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart
                type="hcfa"
                gender={anak.jenisKelamin === "Laki-laki" ? "L" : "P"}
                data={chartData
                  .filter(
                    (d) =>
                      d.lingkarKepala !== null && d.lingkarKepala !== undefined
                  )
                  .map((d) => ({
                    age: d.age,
                    value: d.lingkarKepala!,
                    date: d.date,
                  }))}
                yAxisLabel="Lingkar Kepala (cm)"
                title="Lingkar Kepala (0-60 bulan)"
              />
            </CardContent>
          </Card>

          {/* Berat Badan menurut Tinggi Badan (Status Gizi) */}
          <Card>
            <CardHeader>
              <CardTitle>Status Gizi (BB/TB)</CardTitle>
            </CardHeader>
            <CardContent>
              <GrowthChart
                type="wfl"
                gender={anak.jenisKelamin === "Laki-laki" ? "L" : "P"}
                data={chartData
                  .filter((d) => d.tinggi >= 45 && d.tinggi <= 110) // WFL domain
                  .map((d) => ({
                    age: d.tinggi, // Reuse 'age' prop for X-axis value (Length/Height)
                    value: d.berat,
                    date: d.date,
                  }))}
                yAxisLabel="Berat (kg)"
                xAxisLabel="Panjang/Tinggi Badan (cm)"
                title="Berat Badan menurut Panjang/Tinggi Badan"
                domainMax={110}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
