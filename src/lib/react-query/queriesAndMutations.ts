import { useMutation, useQueryClient } from 'react-query';
import {
  createPost,
  createUserAccount,
  signInAccount,
  signOutAccount,
} from '../appwrite/api';
import { NewUserInterface, PostInterface } from '@/types';
import { QUERY_KEYS } from './queryKeys';

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: NewUserInterface) => createUserAccount(user),
  });
};

export const useSignInAccontMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({ mutationFn: signOutAccount });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: PostInterface) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_RECENT_POSTS });
    },
  });
};
