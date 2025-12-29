"use client";

import * as React from "react";
import { PlusIcon, EditIcon, TrashIcon, ShieldIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useUsers, useDeleteUser, useAssignRole } from "../../../hooks";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import type { User, Role } from "../../../types";
import ListPageLayout from "../../../components/layout/list-page-layout";
import UserForm from "./user-form";

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
  const [editingUser, setEditingUser] = React.useState<User | undefined>(
    undefined
  );

  const { data, isLoading } = useUsers({ limit: 100 });
  const deleteMutation = useDeleteUser();
  const assignRoleMutation = useAssignRole();

  const handleDelete = async () => {
    if (!deleteUserId) return;
    await deleteMutation.mutateAsync(deleteUserId);
    setDeleteUserId(null);
  };

  const handleAssignRole = async () => {
    if (!assignRoleUser || !selectedRole) return;
    await assignRoleMutation.mutateAsync({
      id: assignRoleUser.id,
      data: { role: selectedRole },
    });
    setAssignRoleUser(null);
    setSelectedRole(null);
  };

  const getRoleBadgeColor = (role: Role) => {
    const colors: Record<Role, string> = {
      SUPER_ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      ADMIN: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      TENAGA_KESEHATAN:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      KADER_POSYANDU:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      ORANG_TUA:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <div>{row.getValue("username") || "-"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as Role;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getRoleBadgeColor(
              role
            )}`}
          >
            {role}
          </span>
        );
      },
    },
    {
      accessorKey: "posyandu.nama",
      header: "Posyandu",
      cell: ({ row }) => <div>{row.original.posyandu?.nama || "-"}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingUser(user);
                setIsFormOpen(true);
              }}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setAssignRoleUser(user);
                setSelectedRole(user.role);
              }}
            >
              <ShieldIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteUserId(user.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <ListPageLayout
      title="Users"
      description="Manage user accounts and permissions"
      headerAction={
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(undefined)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={editingUser}
              onSuccess={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      }
    >
      <DataTable
        columns={columns}
        data={data?.data || []}
        searchKey="name"
        isLoading={isLoading}
        searchPlaceholder="Cari user..."
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteUserId}
        onOpenChange={(open) => !open && setDeleteUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Change the role for {assignRoleUser?.name}
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
              Cancel
            </Button>
            <Button
              onClick={handleAssignRole}
              disabled={
                !selectedRole ||
                selectedRole === assignRoleUser?.role ||
                assignRoleMutation.isPending
              }
            >
              {assignRoleMutation.isPending ? "Assigning..." : "Assign Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ListPageLayout>
  );
}
