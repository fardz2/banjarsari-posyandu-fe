"use client";

import * as React from "react";
import { PlusIcon, Download } from "lucide-react";
import { useAnak, useMyChildren } from "../../../hooks/anak/useAnak";
import { useDeleteAnak } from "../../../hooks/anak/useAnakMutations";
import { usePosyandu } from "../../../hooks/posyandu/usePosyandu";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";

import { ConfirmDialog, FormDialog } from "../../../components/dialogs";
import { ExportDialog } from "../../../components/dialogs/export-dialog";
import AnakForm from "./anak-form";
import ListPageLayout from "../../../components/layout/list-page-layout";
import { createAnakColumns } from "../../../components/columns";
import { Can } from "../../../components/auth";
import { AnakCard } from "../../../components/cards/anak-card";

import { authClient } from "../../../lib/auth-client";

export default function AnakListPage() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();
  const user = session?.user as any;
  const isOrtu = user?.role === "ORANG_TUA";

  const [deleteNik, setDeleteNik] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  const [editingNik, setEditingNik] = React.useState<string | null>(null);

  // Toggle hooks based on role
  // Wait for session to load before fetching to avoid 403 for ORANG_TUA
  // (Initially isOrtu is false, which would trigger allAnak query if we don't wait)
  const shouldFetchAll = !isSessionLoading && !!session && !isOrtu;
  const shouldFetchMy = !isSessionLoading && !!session && isOrtu;

  const { data: allAnakData, isLoading: isLoadingAll } = useAnak(
    { limit: 100 },
    { enabled: shouldFetchAll }
  );
  const { data: myAnakData, isLoading: isLoadingMy } = useMyChildren({
    enabled: shouldFetchMy,
  });

  const anakData = isOrtu ? myAnakData : allAnakData;
  const isLoading = isOrtu ? isLoadingMy : isLoadingAll;
  const { data: posyanduData } = usePosyandu({ limit: 100 });
  const deleteMutation = useDeleteAnak();

  // Permissions
  const userRole = user?.role;
  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isAdmin = userRole === "ADMIN";
  const isKader = userRole === "KADER_POSYANDU";

  // Kader can create/edit but not delete
  const canEdit = isSuperAdmin || isAdmin || isKader;
  const canDelete = isSuperAdmin || isAdmin;

  const handleEdit = (nik: string) => {
    setEditingNik(nik);
    setIsDialogOpen(true);
  };

  const columns = React.useMemo(
    () =>
      createAnakColumns({
        onEdit: canEdit ? handleEdit : undefined,
        onDelete: canDelete ? setDeleteNik : undefined,
        hideManagement: isOrtu,
      }),
    [isOrtu, canEdit, canDelete]
  );

  return (
    <Can
      allowedRoles={[
        "SUPER_ADMIN",
        "ADMIN",
        "TENAGA_KESEHATAN",
        "KADER_POSYANDU",
        "ORANG_TUA",
      ]}
    >
      <ListPageLayout
        title="Data Anak"
        description="Kelola data anak dan balita di posyandu"
        headerAction={
          !isOrtu ? (
            <div className="flex gap-2 justify-end">
              <Can allowedRoles={["SUPER_ADMIN", "ADMIN"]} hideOnly>
                <Button
                  variant="outline"
                  onClick={() => setIsExportDialogOpen(true)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </Can>
              <Can
                allowedRoles={["SUPER_ADMIN", "ADMIN", "KADER_POSYANDU"]}
                hideOnly
              >
                <Button
                  onClick={() => {
                    setEditingNik(null);
                    setIsDialogOpen(true);
                  }}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Tambah Anak
                </Button>
              </Can>
              <FormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title={editingNik ? "Edit Data Anak" : "Tambah Anak Baru"}
                maxWidth="md"
                hideFooter
              >
                <AnakForm
                  nik={editingNik || undefined}
                  onSuccess={() => setIsDialogOpen(false)}
                />
              </FormDialog>
            </div>
          ) : null
        }
      >
        {isOrtu ? (
          /* ORANG_TUA View: Grid of Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Simple loading skeleton for cards
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 rounded-xl bg-muted animate-pulse"
                />
              ))
            ) : anakData?.data?.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-muted">
                <p>Belum ada data anak yang terhubung dengan akun Anda.</p>
              </div>
            ) : (
              anakData?.data?.map((anak) => (
                <AnakCard key={anak.nik} anak={anak} />
              ))
            )}
          </div>
        ) : (
          /* ADMIN/STAFF View: Data Table */
          <DataTable
            columns={columns}
            data={anakData?.data || []}
            searchKey="nama"
            isLoading={isLoading}
            searchPlaceholder="Cari nama anak..."
          />
        )}

        <ConfirmDialog
          open={deleteNik !== null}
          onOpenChange={(open) => !open && setDeleteNik(null)}
          title="Hapus Data Anak?"
          description="Tindakan ini tidak dapat dibatalkan. Data anak dan riwayat pengukurannya akan dihapus permanen."
          confirmText="Hapus"
          cancelText="Batal"
          variant="destructive"
          onConfirm={() => deleteMutation.mutate(deleteNik!)}
          loading={deleteMutation.isPending}
        />

        {/* Export Dialog */}
        <ExportDialog
          open={isExportDialogOpen}
          onOpenChange={setIsExportDialogOpen}
          type="anak"
          posyandu={posyanduData?.data || []}
        />
      </ListPageLayout>
    </Can>
  );
}
