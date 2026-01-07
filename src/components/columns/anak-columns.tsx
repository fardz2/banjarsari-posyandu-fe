import { Link } from "react-router";
import { EditIcon, TrashIcon, EyeIcon, ActivityIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Anak } from "../../types";
import { Button } from "../ui/button";

interface AnakColumnsProps {
  onEdit?: (nik: string) => void;
  onDelete?: (nik: string) => void;
  onQuickInput?: (anak: Anak) => void;
  hideManagement?: boolean;
}

export const createAnakColumns = ({
  onEdit,
  onDelete,
  onQuickInput,
  hideManagement,
}: AnakColumnsProps): ColumnDef<Anak>[] => [
  {
    accessorKey: "nik",
    header: "NIK",
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.getValue("nik")}</div>
    ),
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "jenisKelamin",
    header: "Jenis Kelamin",
    cell: ({ row }) => (
      <div>
        {row.getValue("jenisKelamin") === "Laki-laki"
          ? "Laki-laki"
          : "Perempuan"}
      </div>
    ),
  },
  {
    accessorKey: "tglLahir",
    header: "Tanggal Lahir",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglLahir"));
      return <div>{date.toLocaleDateString("id-ID")}</div>;
    },
  },
  {
    accessorKey: "ortu.namaAyah",
    header: "Nama Ayah",
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.original.ortu?.namaAyah || "-"}
      </div>
    ),
  },
  {
    accessorKey: "ortu.namaIbu",
    header: "Nama Ibu",
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.original.ortu?.namaIbu || "-"}
      </div>
    ),
  },
  {
    accessorKey: "posyandu.nama",
    header: "Posyandu",
    cell: ({ row }) => <div>{row.original.posyandu?.nama || "-"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const anak = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          {onQuickInput && !hideManagement && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickInput(anak)}
              className="gap-1"
            >
              <ActivityIcon className="h-3.5 w-3.5" />
              Ukur
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/dashboard/anak/${anak.nik}`}>
              <EyeIcon className="h-4 w-4" />
            </Link>
          </Button>
          {!hideManagement && (
            <>
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(anak.nik)}
                >
                  <EditIcon className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(anak.nik)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      );
    },
  },
];
