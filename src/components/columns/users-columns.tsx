import { EditIcon, TrashIcon, ShieldIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { User, Role } from "../../types";
import { Button } from "../ui/button";

interface UsersColumnsProps {
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onAssignRole?: (user: User) => void;
}

const getRoleBadgeColor = (role: Role) => {
  const colors: Record<Role, string> = {
    SUPER_ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    ADMIN: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    TENAGA_KESEHATAN:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    KADER_POSYANDU:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    ORANG_TUA: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
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
