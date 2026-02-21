import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from './useAuth';
import type { GetProfileResponse } from '../types/api.types';

export const useProfile = () => {
  const { user } = useAuth();

  return useQuery<GetProfileResponse>({
    queryKey: ['profile', user?.id],
    queryFn: () => api.get('get-profile'),
    enabled: !!user, // Only run if user is logged in
  });
};