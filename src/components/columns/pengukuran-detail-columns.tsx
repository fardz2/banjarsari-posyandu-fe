import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PencilIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Pengukuran } from "../../types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// Helper component for status badges
function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-muted-foreground">-</span>;

  const getVariant = (
    status: string
  ): "default" | "destructive" | "secondary" => {
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("buruk") ||
      statusLower.includes("sangat pendek") ||
      statusLower.includes("sangat kurus")
    ) {
      return "destructive";
    }
    if (
      statusLower.includes("kurang") ||
      statusLower.includes("pendek") ||
      statusLower.includes("kurus")
    ) {
      return "secondary";
    }
    return "default";
  };

  return (
    <Badge variant={getVariant(status)} className="whitespace-nowrap">
      {status}
    </Badge>
  );
}

// Helper component for Naik BB badge
function NaikBBBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-muted-foreground">-</span>;

  const variant = status.toLowerCase().includes("naik")
    ? "default"
    : "secondary";

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {status}
    </Badge>
  );
}

interface PengukuranDetailColumnsProps {
  onEdit?: (pengukuran: Pengukuran) => void;
  hideActions?: boolean;
}

/**
 * Columns for pengukuran detail table (in anak detail page)
 * Excludes anak name and NIK since they're already in context
 */
export const createPengukuranDetailColumns = ({
  onEdit,
  hideActions = false,
}: PengukuranDetailColumnsProps): ColumnDef<Pengukuran>[] => [
  {
    accessorKey: "tglUkur",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tglUkur"));
      return <div>{format(date, "d MMM yyyy", { locale: id })}</div>;
    },
  },
  {
    accessorKey: "usiaSaatUkur",
    header: "Usia",
    cell: ({ row }) => <div>{row.getValue("usiaSaatUkur") || "-"}</div>,
  },
  {
    accessorKey: "berat",
    header: "BB (kg)",
    cell: ({ row }) => <div>{row.getValue("berat")}</div>,
  },
  {
    accessorKey: "tinggi",
    header: "TB (cm)",
    cell: ({ row }) => <div>{row.getValue("tinggi")}</div>,
  },
  {
    accessorKey: "lila",
    header: "LILA (cm)",
    cell: ({ row }) => <div>{row.getValue("lila") || "-"}</div>,
  },
  {
    accessorKey: "lingkarKepala",
    header: "LK (cm)",
    cell: ({ row }) => <div>{row.getValue("lingkarKepala") || "-"}</div>,
  },
  {
    accessorKey: "status_bb_u",
    header: "Status BB/U",
    cell: ({ row }) => <StatusBadge status={row.getValue("status_bb_u")} />,
  },
  {
    accessorKey: "status_tb_u",
    header: "Status TB/U",
    cell: ({ row }) => <StatusBadge status={row.getValue("status_tb_u")} />,
  },
  {
    accessorKey: "status_bb_tb",
    header: "Status BB/TB",
    cell: ({ row }) => <StatusBadge status={row.getValue("status_bb_tb")} />,
  },
  {
    accessorKey: "status_lk_u",
    header: "Status LK/U",
    cell: ({ row }) => <StatusBadge status={row.getValue("status_lk_u")} />,
  },
  {
    accessorKey: "naikBeratBadan",
    header: "Naik BB",
    cell: ({ row }) => <NaikBBBadge status={row.getValue("naikBeratBadan")} />,
  },
  ...(hideActions
    ? []
    : [
        {
          id: "actions",
          header: () => <div className="text-right">Aksi</div>,
          cell: ({ row }: { row: any }) => (
            <div className="text-right">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          ),
        } as ColumnDef<Pengukuran>,
      ]),
];
