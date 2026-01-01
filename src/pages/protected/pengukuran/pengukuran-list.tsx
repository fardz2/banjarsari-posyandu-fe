import * as React from "react";
import { PlusIcon, Download } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import { ConfirmDialog } from "../../../components/dialogs";
import { ExportDialog } from "../../../components/dialogs/export-dialog";
import { usePengukuran, useDeletePengukuran } from "../../../hooks";
import { usePosyandu } from "../../../hooks/posyandu/usePosyandu";
import type { Pengukuran } from "../../../types";
import ListPageLayout from "../../../components/layout/list-page-layout";
import { createPengukuranColumns } from "../../../components/columns";
import PengukuranForm from "./pengukuran-form";
import { Can } from "../../../components/auth";
import { authClient } from "../../../lib/auth-client";

export default function PengukuranListPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const userRole = user?.role;
  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isAdmin = userRole === "ADMIN";
  const isKader = userRole === "KADER_POSYANDU";

  // RBAC
  const canEdit = isSuperAdmin || isAdmin || isKader;
  const canDelete = isSuperAdmin || isAdmin;

  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  const [editingPengukuran, setEditingPengukuran] = React.useState<
    Pengukuran | undefined
  >(undefined);

  const { data: pengukuranData, isLoading } = usePengukuran({ limit: 100 });
  const { data: posyanduData } = usePosyandu({ limit: 100 });
  const deleteMutation = useDeletePengukuran();

  const handleEdit = (pengukuran: Pengukuran) => {
    setEditingPengukuran(pengukuran);
    setIsDialogOpen(true);
  };

  const columns = React.useMemo(
    () =>
      createPengukuranColumns({
        onEdit: canEdit ? handleEdit : undefined,
        onDelete: canDelete ? setDeleteId : undefined,
      }),
    [canEdit, canDelete]
  );

  return (
    <Can
      allowedRoles={[
        "SUPER_ADMIN",
        "ADMIN",
        "TENAGA_KESEHATAN",
        "KADER_POSYANDU",
      ]}
    >
      <ListPageLayout
        title="Data Pengukuran Anak"
        description="Kelola data pengukuran berat badan, tinggi badan, dan status gizi anak"
        headerAction={
          <div className="flex gap-2 justify-end mb-4">
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
              <Button onClick={() => setIsDialogOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Tambah Pengukuran
              </Button>
            </Can>
          </div>
        }
      >
        <DataTable
          columns={columns}
          data={pengukuranData?.data || []}
          isLoading={isLoading}
          searchKey="nama"
          searchPlaceholder="Cari nama anak..."
        />

        {/* Form Dialog */}
        <PengukuranForm
          open={isDialogOpen}
          onOpenChange={(open: boolean) => {
            setIsDialogOpen(open);
            if (!open) setEditingPengukuran(undefined);
          }}
          pengukuran={editingPengukuran}
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          title="Hapus Data Pengukuran"
          description="Apakah Anda yakin ingin menghapus data pengukuran ini? Tindakan ini tidak dapat dibatalkan."
          confirmText="Hapus"
          cancelText="Batal"
          variant="destructive"
          onConfirm={() => deleteMutation.mutate(deleteId!)}
          loading={deleteMutation.isPending}
        />

        {/* Export Dialog */}
        <ExportDialog
          open={isExportDialogOpen}
          onOpenChange={setIsExportDialogOpen}
          type="pengukuran"
          posyandu={posyanduData?.data || []}
        />
      </ListPageLayout>
    </Can>
  );
}
