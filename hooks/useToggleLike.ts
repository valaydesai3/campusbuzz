import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { api } from '../lib/api';
import type { ToggleLikeRequest, ToggleLikeResponse } from '../types/api.types';

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation<ToggleLikeResponse, Error, string>({
    mutationFn: (postId: string) =>
      api.post<ToggleLikeResponse>('toggle-like', { post_id: postId } as ToggleLikeRequest),

    onSuccess: () => {
      // Refresh posts to update like counts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },

    onError: (error) => {
      Alert.alert('Failed to like post', error.message);
    },
  });
};