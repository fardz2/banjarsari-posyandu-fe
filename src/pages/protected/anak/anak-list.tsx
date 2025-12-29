"use client";

import * as React from "react";
import { Link } from "react-router";
import { PlusIcon, EditIcon, TrashIcon, EyeIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useAnak } from "../../../hooks/anak/useAnak";
import { useDeleteAnak } from "../../../hooks/anak/useAnakMutations";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
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
import type { Anak } from "../../../types";
import AnakForm from "./anak-form";
import ListPageLayout from "../../../components/layout/list-page-layout";

export default function AnakListPage() {
  const [deleteNik, setDeleteNik] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingNik, setEditingNik] = React.useState<string | null>(null);

  const { data: anakData, isLoading } = useAnak({ limit: 100 });
  const deleteMutation = useDeleteAnak();

  const handleDelete = async () => {
    if (!deleteNik) return;
    try {
      await deleteMutation.mutateAsync(deleteNik);
      setDeleteNik(null);
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnDef<Anak>[] = [
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
      header: "L/P",
      cell: ({ row }) => (
        <div>{row.getValue("jenisKelamin") === "Laki-laki" ? "L" : "P"}</div>
      ),
    },
    {
      accessorKey: "tglLahir",
      header: "Tgl Lahir",
      cell: ({ row }) => {
        const date = new Date(row.getValue("tglLahir"));
        return <div>{date.toLocaleDateString("id-ID")}</div>;
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
        const anak = row.original;
        return (
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/dashboard/anak/${anak.nik}`}>
                <EyeIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingNik(anak.nik);
                setIsDialogOpen(true);
              }}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteNik(anak.nik)}
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
      title="Data Anak"
      description="Kelola data anak dan balita di posyandu"
      headerAction={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingNik(null)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Tambah Anak
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingNik ? "Edit Data Anak" : "Tambah Anak Baru"}
              </DialogTitle>
            </DialogHeader>
            <AnakForm
              nik={editingNik || undefined}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      }
    >
      <DataTable
        columns={columns}
        data={anakData?.data || []}
        searchKey="nama"
        isLoading={isLoading}
        searchPlaceholder="Cari nama anak..."
      />

      <AlertDialog
        open={!!deleteNik}
        onOpenChange={(open) => !open && setDeleteNik(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Anak?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data anak dan riwayat
              pengukurannya akan dihapus permanen.
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
