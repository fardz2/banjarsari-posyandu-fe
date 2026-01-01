import { useParams, Link } from "react-router";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAnakDetail } from "../../../hooks/anak/useAnak";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "../../../components/ui/empty";
import { FileX } from "lucide-react";
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

// Helper component for status badges
function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-muted-foreground">-</span>;

  const getVariant = (
    status: string
  ): "default" | "destructive" | "secondary" => {
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("buruk") ||
      statusLower.includes("sangat pendek") ||
      statusLower.includes("sangat kurus")
    ) {
      return "destructive";
    }
    if (
      statusLower.includes("kurang") ||
      statusLower.includes("pendek") ||
      statusLower.includes("kurus")
    ) {
      return "secondary";
    }
    return "default";
  };

  return (
    <Badge variant={getVariant(status)} className="whitespace-nowrap">
      {status}
    </Badge>
  );
}

// Helper component for Naik BB badge
function NaikBBBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-muted-foreground">-</span>;

  const variant = status.toLowerCase().includes("naik")
    ? "default"
    : "secondary";

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {status}
    </Badge>
  );
}

export default function AnakDetail() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const isOrtu = user?.role === "ORANG_TUA";

  const { nik } = useParams<{ nik: string }>();
  const { data: response, isLoading } = useAnakDetail(nik || "");
  const { data: pengukuranResponse } = usePengukuranByAnakNik(nik || "");

  const anak = response?.data;
  const pengukuranList = pengukuranResponse?.data || [];

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

  if (isLoading) {
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
        <div className="flex gap-2">
          {!isOrtu && (
            <Button variant="outline" asChild>
              <Link to="/dashboard/anak">
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Data
              </Link>
            </Button>
          )}
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
              {pengukuranList.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FileX />
                    </EmptyMedia>
                    <EmptyTitle>Belum Ada Data Pengukuran</EmptyTitle>
                    <EmptyDescription>
                      Belum ada riwayat pengukuran untuk anak ini.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Usia</TableHead>
                      <TableHead>BB (kg)</TableHead>
                      <TableHead>TB (cm)</TableHead>
                      <TableHead>LILA (cm)</TableHead>
                      <TableHead>LK (cm)</TableHead>
                      <TableHead>Status BB/U</TableHead>
                      <TableHead>Status TB/U</TableHead>
                      <TableHead>Status BB/TB</TableHead>
                      <TableHead>Status LK/U</TableHead>
                      <TableHead>Naik BB</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pengukuranList
                      .sort(
                        (a, b) =>
                          new Date(b.tglUkur).getTime() -
                          new Date(a.tglUkur).getTime()
                      )
                      .map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            {format(new Date(p.tglUkur), "d MMM yyyy", {
                              locale: id,
                            })}
                          </TableCell>
                          <TableCell>{p.usiaSaatUkur || "-"}</TableCell>
                          <TableCell>{p.berat}</TableCell>
                          <TableCell>{p.tinggi}</TableCell>
                          <TableCell>{p.lila || "-"}</TableCell>
                          <TableCell>{p.lingkarKepala || "-"}</TableCell>
                          <TableCell>
                            <StatusBadge status={p.status_bb_u} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={p.status_tb_u} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={p.status_bb_tb} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={p.status_lk_u} />
                          </TableCell>
                          <TableCell>
                            <NaikBBBadge status={p.naikBeratBadan} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
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
