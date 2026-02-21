import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { GetPostsResponse } from '../types/api.types';

export const usePosts = () => {
  return useQuery<GetPostsResponse[]>({
    queryKey: ['posts'],
    queryFn: () => api.get('get-posts'),
    staleTime: 1000 * 30, // 30 seconds
  });
};