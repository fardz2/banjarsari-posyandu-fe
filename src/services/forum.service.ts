import api from "../lib/axios";
import type { ApiResponse } from "../types/api.types";
import type { 
  Forum, 
  CreateForumInput, 
  UpdateForumInput, 
  ForumComment 
} from "../types/forum.types";

const BASE_URL = "/forum";

import type { PaginationParams, PaginatedResponse } from "../types/api.types";

export const getAllForums = async (params?: PaginationParams): Promise<PaginatedResponse<Forum>> => {
  return await api.get<PaginatedResponse<Forum>>(BASE_URL, { params });
};

export const getForumById = async (id: string): Promise<ApiResponse<Forum>> => {
  return await api.get<ApiResponse<Forum>>(`${BASE_URL}/${id}`);
};

export const getForumComments = async (
  id: string,
  params?: PaginationParams
): Promise<PaginatedResponse<ForumComment>> => {
  return await api.get<PaginatedResponse<ForumComment>>(`${BASE_URL}/${id}/comments`, {
    params,
  });
};

export const createForum = async (data: CreateForumInput): Promise<ApiResponse<Forum>> => {
  // If file exists, use FormData
  if (data.file) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("file", data.file);
    
    return await api.post<ApiResponse<Forum>>(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  // Otherwise JSON
  return await api.post<ApiResponse<Forum>>(BASE_URL, data);
};

export const updateForum = async (id: string, data: UpdateForumInput): Promise<ApiResponse<Forum>> => {
  return await api.put<ApiResponse<Forum>>(`${BASE_URL}/${id}`, data);
};

export const deleteForum = async (id: string): Promise<ApiResponse<void>> => {
  return await api.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
};

export const addComment = async (id: string, content: string): Promise<ApiResponse<ForumComment>> => {
  return await api.post<ApiResponse<ForumComment>>(`${BASE_URL}/${id}/comments`, { content });
};
