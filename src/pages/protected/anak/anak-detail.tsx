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
import { DetailSkeleton } from "../../../components/skeletons/detail-skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

export default function AnakDetail() {
  const { nik } = useParams<{ nik: string }>();
  const { data: response, isLoading } = useAnakDetail(nik || "");
  const anak = response?.data;

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
          {/* Future: Add 'Tambah Pengukuran' button here */}
          <Button variant="outline" asChild>
            {/* Reuse the dialogue edit form if possible, or just link for now. 
                 Since the edit form is a dialog in the list page, we might need to expose it or duplicate the trigger.
                 For now, let's just show a button that doesn't do anything or links back to list with params? 
                 Actually, simpler to just have a placeholder or omit for this iteration given strict scope.
                 Let's add a simple Edit button that goes back to list (or we can refactor later to open dialog).
              */}
            <Link to="/dashboard/anak">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit Data
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profil Lengkap</TabsTrigger>
          <TabsTrigger value="growth">Riwayat Pertumbuhan</TabsTrigger>
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

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pengukuran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">
                    Belum ada data pengukuran atau fitur belum tersedia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
