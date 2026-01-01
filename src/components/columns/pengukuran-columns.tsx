import { EditIcon, TrashIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Pengukuran } from "../../types";
import { Button } from "../ui/button";

interface PengukuranColumnsProps {
  onEdit?: (pengukuran: Pengukuran) => void;
  onDelete?: (id: number) => void;
}

export const createPengukuranColumns = ({
  onEdit,
  onDelete,
}: PengukuranColumnsProps): ColumnDef<Pengukuran>[] => [
  {
    accessorKey: "tglUkur",
    header: "Tanggal",
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglUkur"));
      return <div>{date.toLocaleDateString("id-ID")}</div>;
    },
  },
  {
    id: "nama",
    accessorFn: (row) => row.anak?.nama,
    header: "Nama Anak",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.anak?.nama || "-"}</div>
    ),
  },
  {
    id: "nik",
    accessorFn: (row) => row.anak?.nik,
    header: "NIK",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.original.anak?.nik || "-"}</div>
    ),
  },
  {
    accessorKey: "berat",
    header: "BB (kg)",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("berat")} kg</div>,
  },
  {
    accessorKey: "tinggi",
    header: "TB (cm)",
    enableSorting: true,
    cell: ({ row }) => <div>{row.getValue("tinggi")} cm</div>,
  },
  {
    accessorKey: "lingkarKepala",
    header: "Lingkar Kepala",
    cell: ({ row }) => {
      const val = row.getValue("lingkarKepala") as number | null;
      return <div>{val ? `${val} cm` : "-"}</div>;
    },
  },
  {
    accessorKey: "lila",
    header: "LILA (cm)",
    cell: ({ row }) => {
      const lila = row.getValue("lila") as number | null;
      return <div>{lila ? `${lila} cm` : "-"}</div>;
    },
  },
  {
    accessorKey: "status_bb_u",
    header: "Status BB/U",
    cell: ({ row }) => {
      const status = row.getValue("status_bb_u") as string | null;
      return <div className="text-xs">{status || "-"}</div>;
    },
  },
  {
    accessorKey: "status_tb_u",
    header: "Status TB/U",
    cell: ({ row }) => {
      const status = row.getValue("status_tb_u") as string | null;
      return <div className="text-xs">{status || "-"}</div>;
    },
  },
  {
    accessorKey: "status_bb_tb",
    header: "Status BB/TB",
    cell: ({ row }) => {
      const status = row.getValue("status_bb_tb") as string | null;
      return <div className="text-xs">{status || "-"}</div>;
    },
  },
  {
    accessorKey: "status_lk_u",
    header: "Status LK/U",
    cell: ({ row }) => {
      const status = row.getValue("status_lk_u") as string | null;
      return <div className="text-xs">{status || "-"}</div>;
    },
  },
  {
    accessorKey: "naikBeratBadan",
    header: "Naik BB",
    cell: ({ row }) => {
      const status = row.getValue("naikBeratBadan") as string | null;
      return <div className="text-xs">{status || "-"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pengukuran = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(pengukuran)}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(pengukuran.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
