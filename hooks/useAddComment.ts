import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { api } from '../lib/api';
import type { AddCommentRequest, AddCommentResponse } from '../types/api.types';

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<AddCommentResponse, Error, string>({
    mutationFn: (content: string) =>
      api.post<AddCommentResponse>('add-comment', { post_id: postId, content } as AddCommentRequest),

    onSuccess: () => {
      // Refresh comments for this post and the overall posts list (comment_count)
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },

    onError: (error) => {
      Alert.alert('Failed to post comment', error.message);
    },
  });
};
