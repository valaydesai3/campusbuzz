import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from './useAuth';
import type { UpdateProfileRequest, GetProfileResponse } from '../types/api.types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<GetProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: (data: UpdateProfileRequest) => 
      api.post<GetProfileResponse>('update-profile', data),
    
    onSuccess: () => {
      // Refresh profile data
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
};