import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { IbuHamil } from "../../types";

interface CreateIbuHamilColumnsOptions {
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  hideManagement?: boolean;
}

export const createIbuHamilColumns = ({
  onEdit,
  onDelete,
  hideManagement = false,
}: CreateIbuHamilColumnsOptions): ColumnDef<IbuHamil>[] => {
  const columns: ColumnDef<IbuHamil>[] = [
    {
      accessorKey: "nik",
      header: "NIK",
      cell: ({ row }) => row.original.nik,
    },
    {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row }) => row.original.nama,
    },
    {
      accessorKey: "tglLahir",
      header: "Tanggal Lahir",
      cell: ({ row }) => {
        if (!row.original.tglLahir) return "-";
        const date = new Date(row.original.tglLahir);
        return date.toLocaleDateString("id-ID");
      },
    },
    {
      accessorKey: "alamat",
      header: "Alamat",
      cell: ({ row }) => row.original.alamat || "-",
    },
    {
      accessorKey: "rw",
      header: "RW",
      cell: ({ row }) => row.original.rw || "-",
    },
    {
      accessorKey: "namaSuami",
      header: "Nama Suami",
      cell: ({ row }) => row.original.namaSuami || "-",
    },
    {
      accessorKey: "hp",
      header: "HP",
      cell: ({ row }) => row.original.hp || "-",
    },
  ];

  if (!hideManagement) {
    columns.push({
      id: "actions",
      cell: ({ row }) => {
        const ibuHamil = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(ibuHamil.id)}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(ibuHamil.id)}
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
