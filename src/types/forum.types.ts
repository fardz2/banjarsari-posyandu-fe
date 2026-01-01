export type ForumStatus = "OPEN" | "ANSWERED" | "CLOSED";

export interface ForumComment {
  id: string;
  forumId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

export interface Forum {
  id: string;
  title: string;
  content: string;
  attachmentUrl?: string; // or null from backend
  attachmentName?: string;
  status: ForumStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  comments: ForumComment[];
  _count?: {
    comments: number;
  };
}

export interface CreateForumInput {
  title: string;
  content: string;
  file?: File;
}

export interface UpdateForumInput {
  title?: string;
  content?: string;
  status?: ForumStatus;
}
