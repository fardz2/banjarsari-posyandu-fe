import * as React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import { ConfirmDialog, FormDialog } from "../../../components/dialogs";
import { useIbuHamil, useDeleteIbuHamil } from "../../../hooks";
import ListPageLayout from "../../../components/layout/list-page-layout";
import { createIbuHamilColumns } from "../../../components/columns";
import { Can } from "../../../components/auth";
import { authClient } from "../../../lib/auth-client";

export default function IbuHamilListPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isAdmin = user?.role === "ADMIN";
  const isKader = user?.role === "KADER_POSYANDU";

  // Permissions for columns (Action Buttons)
  // We still calculate these for passing to columns, but can use Can for UI elements
  const canEdit = isSuperAdmin || isAdmin || isKader;
  const canDelete = isSuperAdmin || isAdmin;

  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const { data: ibuHamilData, isLoading } = useIbuHamil({ limit: 100 });
  const deleteMutation = useDeleteIbuHamil();

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsDialogOpen(true);
  };

  const columns = React.useMemo(
    () =>
      createIbuHamilColumns({
        onEdit: canEdit ? handleEdit : undefined,
        onDelete: canDelete ? setDeleteId : undefined,
        hideManagement: false,
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
        title="Data Ibu Hamil"
        description="Kelola data ibu hamil di posyandu"
        headerAction={
          <>
            <Can
              allowedRoles={["SUPER_ADMIN", "ADMIN", "KADER_POSYANDU"]}
              hideOnly
            >
              <Button
                onClick={() => {
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Tambah Ibu Hamil
              </Button>
            </Can>

            <FormDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              title={
                editingId ? "Edit Data Ibu Hamil" : "Tambah Ibu Hamil Baru"
              }
              maxWidth="md"
              hideFooter
            >
              {/* TODO: Add IbuHamilForm component */}
              <div className="p-4 text-center text-muted-foreground">
                Form akan ditambahkan
              </div>
            </FormDialog>
          </>
        }
      >
        <DataTable
          columns={columns}
          data={ibuHamilData?.data || []}
          searchKey="nama"
          isLoading={isLoading}
          searchPlaceholder="Cari nama ibu hamil..."
        />

        <ConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          title="Hapus Data Ibu Hamil?"
          description="Tindakan ini tidak dapat dibatalkan. Data ibu hamil akan dihapus permanen."
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
