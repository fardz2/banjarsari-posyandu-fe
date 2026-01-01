import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../lib/react-query";
import { 
  getAllForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum, 
  addComment,
  getForumComments
} from "../../services/forum.service";
import type { 
  CreateForumInput, 
  UpdateForumInput 
} from "../../types/forum.types.js";

/**
 * Hook to fetch all forums
 */
import type { PaginationParams } from "../../types/api.types.js";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Hook to fetch all forums with pagination
 */
export const useForums = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.forum.list(JSON.stringify(params)),
    queryFn: () => getAllForums(params),
  });
};

/**
 * Hook to fetch forum detail by ID
 */
export const useForumDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.forum.detail(id),
    queryFn: () => getForumById(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch forum comments with infinite scroll
 */
export const useForumCommentsInfinite = (forumId: string) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.forum.detail(forumId), "comments"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getForumComments(forumId, {
        page: pageParam,
        limit: 10,
      });
      return response; // Correctly return the full response object
    },
    getNextPageParam: (lastPage) => {
      // Check data structure. The service returns { success, data: [], meta: {...} } OR unwrapped data depending on axios.
      // Based on axios interceptor, it returns `response.data`.
      // The `PaginatedResponse` interface has `meta`.
      // But wait! My previous fix showed that `response` IS the `PaginatedResponse` object (because axios interceptor unwraps `data`).
      // So `lastPage` IS `PaginatedResponse<ForumComment>`.
      if (lastPage.meta.hasNext) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!forumId,
  });
};

/**
 * Hook to create a new forum
 */
export const useCreateForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateForumInput) => createForum(data),
    onSuccess: () => {
      toast.success("Forum berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal membuat forum");
    },
  });
};

/**
 * Hook to update an existing forum
 */
export const useUpdateForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateForumInput }) =>
      updateForum(id, data),
    onSuccess: (_data, variables) => {
      toast.success("Forum berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.detail(String(variables.id)) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui forum");
    },
  });
};

/**
 * Hook to delete a forum
 */
export const useDeleteForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteForum(id),
    onSuccess: () => {
      toast.success("Forum berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menghapus forum");
    },
  });
};

/**
 * Hook to add a comment to a forum
 */
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ forumId, data }: { forumId: string; data: { content: string } }) =>
      addComment(forumId, data.content),
    onSuccess: (_data, variables) => {
      toast.success("Komentar berhasil ditambahkan");
      // Invalidate specific forum detail to refresh comments
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.detail(String(variables.forumId)) });
      // Invalidate infinite comments list to show new comment
      queryClient.invalidateQueries({ queryKey: [...queryKeys.forum.detail(String(variables.forumId)), "comments"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan komentar");
    },
  });
};
