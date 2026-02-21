import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { DeletePostRequest } from '../types/api.types';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (postId: string) => 
      api.post('delete-post', { post_id: postId } as DeletePostRequest),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};