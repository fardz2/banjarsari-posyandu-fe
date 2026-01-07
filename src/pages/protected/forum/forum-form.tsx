import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { cn } from "../../../lib/utils";

import type { Forum, CreateForumInput } from "../../../types";
import { useCreateForum, useUpdateForum } from "../../../hooks";

const forumSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(10, "Isi diskusi minimal 10 karakter"),
});

type ForumFormValues = z.infer<typeof forumSchema>;

interface ForumFormProps {
  initialData?: Forum;
  onSuccess?: () => void;
}

export function ForumForm({ initialData, onSuccess }: ForumFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const createMutation = useCreateForum();
  const updateMutation = useUpdateForum();

  const isEditing = !!initialData;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const form = useForm<ForumFormValues>({
    resolver: zodResolver(forumSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
    },
  });

  const onSubmit = async (values: ForumFormValues) => {
    try {
      if (isEditing && initialData) {
        // Update logic
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: values,
        });
      } else {
        // Create logic
        // We manually construct input including file if present.
        // Note: The hook expects CreateForumInput, but we might eventually need to pass FormData.
        // For now, assume hook handles it or we pass object.
        const input: CreateForumInput = {
          title: values.title,
          content: values.content,
          file: file || undefined,
        };
        await createMutation.mutateAsync(input);
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Judul Diskusi</FieldLabel>
                <Input placeholder="Topik apa yang ingin dibahas?" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Isi Pertanyaan/Diskusi</FieldLabel>
                <textarea
                  className={cn(
                    "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="Jelaskan detail pertanyaan atau kondisi Anda..."
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {!isEditing && (
            <Field>
              <FieldLabel>Lampiran (Opsional)</FieldLabel>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
              <p className="text-[0.8rem] text-muted-foreground mt-2">
                Format: Gambar (JPG, PNG) atau PDF. Maks 5MB.
              </p>
            </Field>
          )}
        </FieldGroup>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Simpan Perubahan" : "Kirim Pertanyaan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
