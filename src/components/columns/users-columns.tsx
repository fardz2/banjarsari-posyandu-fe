import { EditIcon, TrashIcon, ShieldIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { User, Role } from "../../types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface UsersColumnsProps {
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onAssignRole?: (user: User) => void;
}

const getRoleBadgeVariant = (
  role: Role
): "default" | "secondary" | "destructive" | "outline" => {
  const variants: Record<
    Role,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    SUPER_ADMIN: "destructive",
    ADMIN: "default",
    TENAGA_KESEHATAN: "default",
    KADER_POSYANDU: "secondary",
    ORANG_TUA: "outline",
  };
  return variants[role] || "outline";
};

const getRoleLabel = (role: Role): string => {
  const labels: Record<Role, string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    TENAGA_KESEHATAN: "Tenaga Kesehatan",
    KADER_POSYANDU: "Kader Posyandu",
    ORANG_TUA: "Orang Tua",
  };
  return labels[role] || role;
};

export const createUsersColumns = ({
  onEdit,
  onDelete,
  onAssignRole,
}: UsersColumnsProps): ColumnDef<User>[] => [
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
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
    cell: ({ row }) => <div>{row.getValue("jenisKelamin") || "-"}</div>,
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
        <Badge variant={getRoleBadgeVariant(role)}>{getRoleLabel(role)}</Badge>
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
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
              <EditIcon className="h-4 w-4" />
            </Button>
          )}
          {onAssignRole && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAssignRole(user)}
            >
              <ShieldIcon className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(user.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
