import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { GetCommentsResponse } from '../types/api.types';

export const useComments = (postId: string, enabled: boolean) => {
  return useQuery<GetCommentsResponse[]>({
    queryKey: ['comments', postId],
    queryFn: () => api.get(`get-comments?post_id=${postId}`),
    enabled,
    staleTime: 1000 * 30,
  });
};
