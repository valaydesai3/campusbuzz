// API request/response types

export interface CreatePostRequest {
  content: string;
}

export interface CreatePostResponse {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface GetPostsResponse {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  like_count: number;
  user_has_liked: boolean;
}

export interface DeletePostRequest {
  post_id: string;
}

export interface ToggleLikeRequest {
  post_id: string;
}

export interface ToggleLikeResponse {
  liked: boolean;
}

export interface GetProfileResponse {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  bio?: string;
  avatar_url?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}