import { EditIcon, TrashIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Posyandu } from "../../types";
import { Button } from "../ui/button";

interface PosyanduColumnsProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  hideManagement?: boolean;
}

export const createPosyanduColumns = ({
  onEdit,
  onDelete,
  hideManagement,
}: PosyanduColumnsProps): ColumnDef<Posyandu>[] => [
  {
    accessorKey: "nama",
    header: "Nama Posyandu",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "alamat",
    header: "Lokasi",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div>
          RW {p.rw || "-"}, {p.desa}, {p.kecamatan}
        </div>
      );
    },
  },
  {
    accessorKey: "puskesmas",
    header: "Puskesmas",
  },
  {
    accessorKey: "users_count",
    header: "Kader",
    cell: ({ row }) => <div>{row.original._count?.users || 0}</div>,
  },
  {
    accessorKey: "anak_count",
    header: "Balita",
    cell: ({ row }) => <div>{row.original._count?.anak || 0}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const posyandu = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          {!hideManagement && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(posyandu.id)}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(posyandu.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
