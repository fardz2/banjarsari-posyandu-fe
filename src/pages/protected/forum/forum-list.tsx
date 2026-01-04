import { useState } from "react";
import { Link } from "react-router";
import {
  MessageSquare,
  PlusIcon,
  SearchIcon,
  MessageCircle,
  FileIcon,
  FilterIcon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../../../components/ui/pagination";
import { FormDialog, ForumFilterDialog } from "../../../components/dialogs";

import { Can } from "../../../components/auth/can";

import { useForums } from "../../../hooks/forum";
import { usePosyandu } from "../../../hooks";
import type { ForumFilterFormValues } from "../../../utils/validations";
import { ForumForm } from "./forum-form";
import { DetailSkeleton } from "../../../components/skeletons/detail-skeleton";
import ListPageLayout from "../../../components/layout/list-page-layout";

export default function ForumListPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ForumFilterFormValues>({});
  const [page, setPage] = useState(1);
  const limit = 9; // 3x3 grid

  const { data: response, isLoading } = useForums({
    page,
    limit,
    search: search || undefined,
    status: filters.status,
    posyanduId: filters.posyanduId,
  });

  // Fetch posyandu for filter (TENAGA_KESEHATAN & SUPER_ADMIN)
  const { data: posyanduResponse } = usePosyandu();

  const forums = response?.data || [];
  const meta = response?.meta;
  const posyanduList = posyanduResponse?.data || [];

  const handleApplyFilters = (newFilters: ForumFilterFormValues) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 when filters change
  };

  return (
    <ListPageLayout
      title="Forum Tanya Jawab"
      description="Diskusi dan konsultasi dengan tenaga kesehatan"
      headerAction={
        <div className="flex gap-2">
          <Can allowedRoles={["TENAGA_KESEHATAN", "SUPER_ADMIN"]} hideOnly>
            <Button variant="outline" onClick={() => setOpenFilter(true)}>
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </Can>

          <Can allowedRoles={["ORANG_TUA", "SUPER_ADMIN", "TENAGA_KESEHATAN"]}>
            <Can allowedRoles={["ORANG_TUA", "SUPER_ADMIN"]} hideOnly>
              <Button onClick={() => setOpenCreate(true)}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Buat Pertanyaan
              </Button>
            </Can>
          </Can>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Filter Dialog */}
        <ForumFilterDialog
          open={openFilter}
          onOpenChange={setOpenFilter}
          onApplyFilters={handleApplyFilters}
          posyandu={posyanduList}
          currentFilters={filters}
        />

        {/* Create Dialog */}
        <FormDialog
          title="Buat Pertanyaan Baru"
          description="Ajukan pertanyaan untuk didiskusikan dengan tenaga kesehatan"
          open={openCreate}
          onOpenChange={setOpenCreate}
          hideFooter={true}
        >
          <ForumForm onSuccess={() => setOpenCreate(false)} />
        </FormDialog>
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari topik diskusi..."
            className="pl-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset to page 1 on search
            }}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DetailSkeleton />
            <DetailSkeleton />
            <DetailSkeleton />
          </div>
        ) : forums.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/10 border-dashed">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">Belum ada diskusi</h3>
            <p className="text-muted-foreground">
              Jadilah yang pertama memulai diskusi!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {forums.map((forum) => (
              <Link
                to={`/dashboard/forum/${forum.id}`}
                key={forum.id}
                className="block group h-full"
              >
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <StatusBadge status={forum.status} />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(forum.createdAt), "d MMM yyyy", {
                          locale: id,
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {forum.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-1">
                      Oleh: {forum.createdBy.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {forum.content}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground border-t bg-muted/20 p-3 mt-auto">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{forum._count?.comments || 0} Tanggapan</span>
                      </div>
                      {forum.attachmentUrl && (
                        <div className="flex items-center gap-1">
                          <FileIcon className="h-3.5 w-3.5" />
                          <span>Lampiran</span>
                        </div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (meta.hasPrev) setPage((p) => p - 1);
                    }}
                    isActive={!meta.hasPrev}
                    className={
                      !meta.hasPrev
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink isActive>{meta.page}</PaginationLink>
                </PaginationItem>

                {meta.totalPages > 1 && meta.page !== meta.totalPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {meta.page !== meta.totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(meta.totalPages);
                      }}
                    >
                      {meta.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (meta.hasNext) setPage((p) => p + 1);
                    }}
                    isActive={!meta.hasNext}
                    className={
                      !meta.hasNext
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </ListPageLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getVariant = (
    status: string
  ): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case "ANSWERED":
        return "default";
      case "CLOSED":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getLabel = (status: string) => {
    switch (status) {
      case "ANSWERED":
        return "Dijawab";
      case "CLOSED":
        return "Ditutup";
      default:
        return "Menunggu Jawaban";
    }
  };

  return (
    <Badge variant={getVariant(status)} className="text-[10px] h-5 px-1.5">
      {getLabel(status)}
    </Badge>
  );
}
