import * as React from "react";
import { PlusIcon, FilterIcon } from "lucide-react";
import { useUsers, useDeleteUser, useAssignRole } from "../../../hooks";
import { usePosyandu } from "../../../hooks/posyandu/usePosyandu";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import {
  ConfirmDialog,
  FormDialog,
  UserFilterDialog,
} from "../../../components/dialogs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import type { User, Role } from "../../../types";
import type { UserFilterFormValues } from "../../../utils/validations/user-filter.validation";
import ListPageLayout from "../../../components/layout/list-page-layout";
import UserForm from "./user-form";
import { Can } from "../../../components/auth";
import { useCurrentUser } from "../../../hooks";
import { createUsersColumns } from "../../../components/columns";

const ROLES: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "TENAGA_KESEHATAN",
  "KADER_POSYANDU",
  "ORANG_TUA",
];

export default function UsersListPage() {
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  const [assignRoleUser, setAssignRoleUser] = React.useState<User | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<UserFilterFormValues>({});
  const [editingUser, setEditingUser] = React.useState<User | undefined>(
    undefined
  );

  const { data: userData } = useCurrentUser();
  const user = userData?.data as any; // Using any for easier access, but ideally typed
  const userRole = user?.role as Role | undefined;

  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isAdmin = userRole === "ADMIN";
  const isKader = userRole === "KADER_POSYANDU";

  // Permissions
  const canManageUsers = isSuperAdmin || isAdmin;
  const canAssignRole = isSuperAdmin;
  const canCreateUser = isSuperAdmin || isAdmin || isKader; // Kader can create but limited to ORANG_TUA

  const { data, isLoading } = useUsers({
    limit: 100,
    role:
      filters.roles && filters.roles.length > 0
        ? filters.roles.join(",")
        : undefined,
    posyanduId:
      filters.posyanduIds && filters.posyanduIds.length > 0
        ? filters.posyanduIds.join(",")
        : undefined,
  });
  console.log(data);
  const { data: posyanduData } = usePosyandu(undefined, {
    enabled: isSuperAdmin,
  });
  const deleteMutation = useDeleteUser();
  const assignRoleMutation = useAssignRole();

  const handleAssignRole = async () => {
    if (!assignRoleUser || !selectedRole) return;
    await assignRoleMutation.mutateAsync({
      id: assignRoleUser.id,
      data: { role: selectedRole },
    });
    setAssignRoleUser(null);
    setSelectedRole(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleOpenAssignRole = (user: User) => {
    setAssignRoleUser(user);
    setSelectedRole(user.role);
  };

  const handleApplyFilters = (newFilters: UserFilterFormValues) => {
    setFilters(newFilters);
  };

  const columns = React.useMemo(
    () =>
      createUsersColumns({
        onEdit: canManageUsers ? handleEdit : undefined,
        onDelete: canManageUsers ? setDeleteUserId : undefined,
        onAssignRole: canAssignRole ? handleOpenAssignRole : undefined,
      }),
    [canManageUsers, canAssignRole]
  );

  return (
    <Can
      allowedRoles={[
        "SUPER_ADMIN",
        "ADMIN",
        "KADER_POSYANDU",
        "TENAGA_KESEHATAN",
      ]}
    >
      <ListPageLayout
        title="Pengguna"
        description="Kelola akun pengguna dan izin akses"
        headerAction={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {canCreateUser && (
              <Button
                onClick={() => {
                  setEditingUser(undefined);
                  setIsFormOpen(true);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Tambah Pengguna
              </Button>
            )}
            <FormDialog
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
              title={editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
              maxWidth="lg"
              hideFooter
            >
              <UserForm
                user={editingUser}
                onSuccess={() => setIsFormOpen(false)}
              />
            </FormDialog>
          </div>
        }
      >
        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          searchPlaceholder="Cari Pengguna..."
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteUserId !== null}
          onOpenChange={(open) => !open && setDeleteUserId(null)}
          title="Apakah Anda yakin?"
          description="Tindakan ini tidak dapat dibatalkan. Ini akan menghapus akun pengguna secara permanen."
          confirmText="Hapus"
          cancelText="Batal"
          variant="destructive"
          onConfirm={() => deleteMutation.mutate(deleteUserId!)}
          loading={deleteMutation.isPending}
        />

        {/* Assign Role Dialog */}
        <Dialog
          open={!!assignRoleUser}
          onOpenChange={(open) => {
            if (!open) {
              setAssignRoleUser(null);
              setSelectedRole(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tetapkan Peran</DialogTitle>
              <DialogDescription>
                Ubah peran untuk {assignRoleUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-center gap-2 rounded-md border p-3 text-left transition-colors hover:bg-accent ${
                    selectedRole === role ? "border-primary bg-accent" : ""
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      selectedRole === role
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  />
                  <span className="font-medium">{role}</span>
                </button>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setAssignRoleUser(null);
                  setSelectedRole(null);
                }}
              >
                Batal
              </Button>
              <Button
                onClick={handleAssignRole}
                disabled={
                  !selectedRole ||
                  selectedRole === assignRoleUser?.role ||
                  assignRoleMutation.isPending
                }
              >
                {assignRoleMutation.isPending
                  ? "Menetapkan..."
                  : "Tetapkan Peran"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* User Filter Dialog */}
        <UserFilterDialog
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          onApplyFilters={handleApplyFilters}
          posyandu={isSuperAdmin ? posyanduData?.data || [] : []}
          currentFilters={filters}
        />
      </ListPageLayout>
    </Can>
  );
}
