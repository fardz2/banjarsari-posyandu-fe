"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  MessageCircle,
  MoreVertical,
  Edit,
  Trash2,
  Send,
  Loader2,
  FileIcon,
  User as UserIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Field, FieldError } from "../../../components/ui/field";
import { FormDialog } from "../../../components/dialogs/form-dialog";
import { ConfirmDialog } from "../../../components/dialogs/confirm-dialog";
import { DetailSkeleton } from "../../../components/skeletons/detail-skeleton";
import { cn } from "../../../lib/utils";

import { ForumForm } from "./forum-form";
import { authClient } from "../../../lib/auth-client";
import type { Role } from "../../../types";
import {
  useAddComment,
  useDeleteForum,
  useForumDetail,
  useForumCommentsInfinite,
} from "../../../hooks";
import { useEffect, useRef } from "react";

const commentSchema = z.object({
  content: z.string().min(1, "Komentar tidak boleh kosong"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function ForumDetailPage() {
  const { id: forumId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: response, isLoading } = useForumDetail(forumId!);
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useForumCommentsInfinite(forumId!);

  const deleteMutation = useDeleteForum();
  const addCommentMutation = useAddComment();
  const { data: session } = authClient.useSession();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Intersection Observer implementation
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, hasNextPage, fetchNextPage]);

  const forum = response?.data;
  const comments = commentsData?.pages.flatMap((page) => page.data) || [];

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!forum) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8">
        <MessageCircle className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Diskusi Tidak Ditemukan</h3>
        <p className="text-muted-foreground mb-6">
          Diskusi yang Anda cari mungkin telah dihapus atau URL tidak valid.
        </p>
        <Button onClick={() => navigate("/dashboard/forum")}>
          Kembali ke Forum
        </Button>
      </div>
    );
  }

  const user = session?.user as any;
  const isOwner = user?.id === forum.createdById;
  const isAdmin = ["SUPER_ADMIN", "ADMIN"].includes(user?.role || "");
  const canDelete = isOwner || isAdmin; // Admin can moderate/delete content
  const isTenagaKesehatan = (user?.role as Role) === "TENAGA_KESEHATAN";

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(forum.id);
      navigate("/dashboard/forum");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitComment = async (values: CommentFormValues) => {
    try {
      await addCommentMutation.mutateAsync({
        forumId: forum.id,
        data: values,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header - Matching Anak Detail Layout */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="-ml-2 h-8 w-8"
            >
              <Link to="/dashboard/forum">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {forum.title}
            </h1>
            <StatusBadge status={forum.status} />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground ml-9 text-sm">
            <span className="font-medium text-foreground">
              {forum.createdBy.name}
            </span>
            <span>•</span>
            <span>
              {format(new Date(forum.createdAt), "d MMMM yyyy, HH:mm", {
                locale: id,
              })}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {(isOwner || isAdmin) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4 mr-1" />
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwner && (
                  <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Diskusi
                  </DropdownMenuItem>
                )}
                {canDelete && (
                  <DropdownMenuItem
                    onClick={() => setOpenDelete(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus Diskusi
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Forum Content Card */}
      <Card className="border shadow-sm">
        <CardContent className="space-y-6 pt-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 w-fit">
            <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 items-center justify-center border border-blue-200">
              <span className="font-semibold text-blue-700 text-sm">
                {forum.createdBy.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-sm">{forum.createdBy.name}</p>
              <p className="text-xs text-muted-foreground">
                {forum.createdBy.role === "ORANG_TUA"
                  ? "Orang Tua"
                  : "Admin/Staff"}
              </p>
            </div>
          </div>

          {/* Content Body */}
          <div className="prose prose-stone dark:prose-invert max-w-none text-foreground/90">
            <p className="whitespace-pre-wrap leading-relaxed text-base">
              {forum.content}
            </p>
          </div>

          {/* Attachment */}
          {forum.attachmentUrl && (
            <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800 border-dashed transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg shadow-sm">
                  <FileIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate text-blue-900 dark:text-blue-100">
                    {forum.attachmentName || "Lampiran Dokumen"}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold mt-0.5">
                    Attachment
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-blue-200 hover:bg-blue-100 hover:text-blue-700 dark:border-blue-800 dark:hover:bg-blue-900/50"
                  asChild
                >
                  <a
                    href={forum.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unduh File
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Discussion Thread */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Tanggapan ({forum._count?.comments || 0})
            </h3>
          </div>
        </div>

        {/* Comment List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-muted">
              <p>Belum ada tanggapan.</p>
              {isTenagaKesehatan && (
                <p className="text-sm">
                  Jadilah yang pertama memberikan solusi medis!
                </p>
              )}
            </div>
          ) : (
            <>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={cn(
                    "flex gap-4 p-4 rounded-xl transition-all duration-300",
                    comment.user.role === "TENAGA_KESEHATAN"
                      ? "bg-blue-50/80 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 shadow-sm"
                      : "bg-card border shadow-sm"
                  )}
                >
                  <div className="hidden sm:flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center border">
                    <span className="font-semibold text-xs text-muted-foreground">
                      {comment.user.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">
                          {comment.user.name}
                        </span>
                        {comment.user.role === "TENAGA_KESEHATAN" && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 text-[10px] h-5 px-1.5 border-blue-200"
                          >
                            Tenaga Kesehatan
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          &bull;{" "}
                          {format(new Date(comment.createdAt), "d MMM, HH:mm", {
                            locale: id,
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              )}

              {/* Validation / Intersection Target */}
              <div ref={observerTarget} className="h-4" />
            </>
          )}
        </div>

        {/* Comment Input */}
        <Card className="shadow-lg border-muted-foreground/20">
          <CardContent className="p-4 bg-muted/10">
            <form
              onSubmit={form.handleSubmit(onSubmitComment)}
              className="flex gap-4 items-start"
            >
              <div className="hidden sm:flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-primary/10 items-center justify-center mt-1">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <Controller
                  control={form.control}
                  name="content"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-full">
                      <textarea
                        className={cn(
                          "flex min-h-[100px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y shadow-inner",
                          fieldState.invalid &&
                            "border-destructive focus-visible:ring-destructive"
                        )}
                        placeholder={
                          isTenagaKesehatan
                            ? "Berikan tanggapan atau saran medis secara profesional..."
                            : "Tulis komentar atau pertanyaan tambahan..."
                        }
                        {...field}
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="pl-4 pr-6 rounded-full shadow-md hover:shadow-lg transition-all"
                    disabled={addCommentMutation.isPending}
                  >
                    {addCommentMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Kirim Tanggapan
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <FormDialog
        title="Edit Diskusi"
        description="Perbarui konten diskusi Anda."
        open={openEdit}
        onOpenChange={setOpenEdit}
        hideFooter={true}
      >
        <ForumForm initialData={forum} onSuccess={() => setOpenEdit(false)} />
      </FormDialog>

      <ConfirmDialog
        title="Hapus Diskusi"
        description="Apakah Anda yakin ingin menghapus diskusi ini? Tindakan ini tidak dapat dibatalkan."
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
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

  return <Badge variant={getVariant(status)}>{getLabel(status)}</Badge>;
}
