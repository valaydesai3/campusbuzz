import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { CreatePostRequest, CreatePostResponse } from '../types/api.types';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePostResponse, Error, string>({
    mutationFn: (content: string) => 
      api.post<CreatePostResponse>('create-post', { content } as CreatePostRequest),
    
    onSuccess: () => {
      // Invalidate posts query to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};