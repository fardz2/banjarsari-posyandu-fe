import * as React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import { ConfirmDialog, FormDialog } from "../../../components/dialogs";

import PosyanduForm from "./posyandu-form";
import { authClient } from "../../../lib/auth-client";
import {
  useDeletePosyandu,
  usePosyandu,
} from "../../../hooks/posyandu/usePosyandu";
import ListPageLayout from "../../../components/layout/list-page-layout";
import { createPosyanduColumns } from "../../../components/columns";
import { Can } from "../../../components/auth";

export default function PosyanduListPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  // Queries
  const { data: posyanduData, isLoading } = usePosyandu({ limit: 100 }); // Fetch all for client-side filtering handling for now
  const deleteMutation = useDeletePosyandu();

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsDialogOpen(true);
  };

  const columns = React.useMemo(
    () =>
      createPosyanduColumns({
        onEdit: handleEdit,
        onDelete: setDeleteId,
        hideManagement: !isSuperAdmin,
      }),
    [isSuperAdmin]
  );

  return (
    <Can allowedRoles={["SUPER_ADMIN", "TENAGA_KESEHATAN"]}>
      <ListPageLayout
        title="Data Posyandu"
        description="Kelola data posyandu di wilayah Anda"
        headerAction={
          isSuperAdmin ? (
            <>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Tambah Posyandu
              </Button>
              <FormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title={editingId ? "Edit Posyandu" : "Tambah Posyandu"}
                maxWidth="sm"
                hideFooter
              >
                <PosyanduForm
                  posyanduId={editingId || undefined}
                  onSuccess={() => setIsDialogOpen(false)}
                />
              </FormDialog>
            </>
          ) : null
        }
      >
        <DataTable
          columns={columns}
          data={posyanduData?.data || []}
          isLoading={isLoading}
          searchPlaceholder="Cari nama posyandu..."
        />

        <ConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          title="Hapus Posyandu?"
          description="Tindakan ini tidak dapat dibatalkan. Data posyandu dan relasinya mungkin akan terhapus atau menjadi tidak valid."
          confirmText="Hapus"
          cancelText="Batal"
          variant="destructive"
          onConfirm={() => deleteMutation.mutate(deleteId!)}
          loading={deleteMutation.isPending}
        />
      </ListPageLayout>
    </Can>
  );
}
