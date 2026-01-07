import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { Ortu } from "../../types";

interface CreateOrtuColumnsOptions {
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  hideManagement?: boolean;
}

export const createOrtuColumns = ({
  onEdit,
  onDelete,
  hideManagement = false,
}: CreateOrtuColumnsOptions): ColumnDef<Ortu>[] => {
  const columns: ColumnDef<Ortu>[] = [
    {
      accessorKey: "namaAyah",
      header: "Nama Ayah",
      cell: ({ row }) => row.original.namaAyah || "-",
    },
    {
      accessorKey: "namaIbu",
      header: "Nama Ibu",
      cell: ({ row }) => row.original.namaIbu || "-",
    },
  ];

  if (!hideManagement) {
    columns.push({
      id: "actions",
      cell: ({ row }) => {
        const ortu = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(ortu.id)}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(ortu.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      },
    });
  }

  return columns;
};
