"use client";

import * as React from "react";
import { PlusIcon, EditIcon, TrashIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import PosyanduForm from "./posyandu-form";

import {
  useDeletePosyandu,
  usePosyandu,
} from "../../../hooks/posyandu/usePosyandu";
import { type Posyandu } from "../../../types/posyandu.types";
import ListPageLayout from "../../../components/layout/list-page-layout";

export default function PosyanduListPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  // Queries
  const { data: posyanduData, isLoading } = usePosyandu({ limit: 100 }); // Fetch all for client-side filtering handling for now
  const deleteMutation = useDeletePosyandu();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnDef<Posyandu>[] = [
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingId(posyandu.id);
                setIsDialogOpen(true);
              }}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteId(posyandu.id)}
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
      title="Data Posyandu"
      description="Kelola data posyandu di wilayah Anda"
      headerAction={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Tambah Posyandu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Posyandu" : "Tambah Posyandu"}
              </DialogTitle>
            </DialogHeader>
            <PosyanduForm
              posyanduId={editingId || undefined}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      }
    >
      <DataTable
        columns={columns}
        data={posyanduData?.data || []}
        searchKey="nama"
        isLoading={isLoading}
        searchPlaceholder="Cari nama posyandu..."
      />

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Posyandu?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data posyandu dan relasinya
              mungkin akan terhapus atau menjadi tidak valid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ListPageLayout>
  );
}
