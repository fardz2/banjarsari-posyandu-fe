import * as React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import { ConfirmDialog, FormDialog } from "../../../components/dialogs";
import { useOrtu, useDeleteOrtu } from "../../../hooks";
import ListPageLayout from "../../../components/layout/list-page-layout";
import { createOrtuColumns } from "../../../components/columns";
import { Can } from "../../../components/auth";
import { authClient } from "../../../lib/auth-client";
import OrtuForm from "./ortu-form";

export default function OrtuListPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isAdmin = user?.role === "ADMIN";

  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const { data: ortuData, isLoading } = useOrtu({ limit: 100 });
  const deleteMutation = useDeleteOrtu();

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsDialogOpen(true);
  };

  const initialData = React.useMemo(() => {
    if (!editingId || !ortuData?.data) return undefined;
    return ortuData.data.find((item) => item.id === editingId);
  }, [editingId, ortuData?.data]);

  const columns = React.useMemo(
    () =>
      createOrtuColumns({
        onEdit: handleEdit,
        onDelete: setDeleteId,
        hideManagement: !(isSuperAdmin || isAdmin),
      }),
    [isSuperAdmin, isAdmin]
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
        title="Data Orang Tua"
        description="Kelola data orang tua di posyandu"
        headerAction={
          isSuperAdmin || isAdmin ? (
            <>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Tambah Orang Tua
              </Button>
              <FormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title={
                  editingId ? "Edit Data Orang Tua" : "Tambah Orang Tua Baru"
                }
                maxWidth="md"
                hideFooter
              >
                <OrtuForm
                  isDialog
                  initialData={initialData}
                  onCancel={() => setIsDialogOpen(false)}
                  onSuccess={() => {
                    setIsDialogOpen(false);
                  }}
                />
              </FormDialog>
            </>
          ) : null
        }
      >
        <DataTable
          columns={columns}
          data={ortuData?.data || []}
          isLoading={isLoading}
          searchPlaceholder="Cari nama ayah atau ibu"
        />

        <ConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          title="Hapus Data Orang Tua?"
          description="Tindakan ini tidak dapat dibatalkan. Data orang tua akan dihapus permanen."
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
