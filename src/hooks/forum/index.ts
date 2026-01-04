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
    
    onMutate: async (newForum) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.forum.lists() });
      const previousData = queryClient.getQueryData(queryKeys.forum.lists());

      queryClient.setQueryData(queryKeys.forum.lists(), (old: any) => {
        if (!old) return old;
        const tempForum = {
          ...newForum,
          id: Date.now(),
          status: 'OPEN',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _count: { comments: 0 }
        };
        return {
          ...old,
          data: [tempForum, ...old.data],
          meta: { ...old.meta, total: old.meta.total + 1 }
        };
      });

      return { previousData };
    },
    
    onError: (error: any, _newForum, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.forum.lists(), context.previousData);
      }
      toast.error(error.response?.data?.message || "Gagal membuat forum");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
    },
    
    onSuccess: () => {
      toast.success("Forum berhasil dibuat");
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
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.forum.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.forum.detail(String(id)) });

      const previousList = queryClient.getQueryData(queryKeys.forum.lists());
      const previousDetail = queryClient.getQueryData(queryKeys.forum.detail(String(id)));

      queryClient.setQueryData(queryKeys.forum.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
          ),
        };
      });

      queryClient.setQueryData(queryKeys.forum.detail(String(id)), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, ...data, updatedAt: new Date().toISOString() }
        };
      });

      return { previousList, previousDetail };
    },
    
    onError: (error: any, { id }, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.forum.lists(), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.forum.detail(String(id)), context.previousDetail);
      }
      toast.error(error.response?.data?.message || "Gagal memperbarui forum");
    },
    
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.detail(String(id)) });
    },
    
    onSuccess: () => {
      toast.success("Forum berhasil diperbarui");
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
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.forum.lists() });
      const previousData = queryClient.getQueryData(queryKeys.forum.lists());

      queryClient.setQueryData(queryKeys.forum.lists(), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item: any) => item.id !== id),
          meta: { ...old.meta, total: old.meta.total - 1 }
        };
      });

      return { previousData };
    },
    
    onError: (error: any, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys.forum.lists(), context.previousData);
      }
      toast.error(error.response?.data?.message || "Gagal menghapus forum");
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
    },
    
    onSuccess: () => {
      toast.success("Forum berhasil dihapus");
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
    
    onMutate: async ({ forumId, data }) => {
      const commentsKey = [...queryKeys.forum.detail(String(forumId)), "comments"];
      await queryClient.cancelQueries({ queryKey: commentsKey });

      const previousComments = queryClient.getQueryData(commentsKey);
      
      // Get current user from session
      const sessionData = queryClient.getQueryData(['session']) as any;
      const currentUser = sessionData?.user;

      // Optimistically add comment to infinite query
      queryClient.setQueryData(commentsKey, (old: any) => {
        if (!old) return old;
        const tempComment = {
          id: Date.now(),
          content: data.content,
          forumId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Include user data to prevent undefined errors
          user: currentUser ? {
            id: currentUser.id,
            name: currentUser.name,
            role: currentUser.role,
          } : {
            id: 'temp-user',
            name: 'Loading...',
            role: 'ORANG_TUA',
          }
        };
        
        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                data: [tempComment, ...page.data]
              };
            }
            return page;
          })
        };
      });

      return { previousComments };
    },
    
    onError: (error: any, { forumId }, context) => {
      if (context?.previousComments) {
        const commentsKey = [...queryKeys.forum.detail(String(forumId)), "comments"];
        queryClient.setQueryData(commentsKey, context.previousComments);
      }
      toast.error(error.response?.data?.message || "Gagal menambahkan komentar");
    },
    
    onSettled: (_data, _error, { forumId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.detail(String(forumId)) });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.forum.detail(String(forumId)), "comments"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.forum.lists() });
    },
    
    onSuccess: () => {
      toast.success("Komentar berhasil ditambahkan");
    },
  });
};
