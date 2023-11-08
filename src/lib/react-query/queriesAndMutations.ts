import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createPost,
  createUserAccount,
  deleteSavedPost,
  getCurrentUser,
  getRecentPosts,
  likePost,
  savePost,
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

export const useGetCurrentAccountQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
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

export const useGetRecentPostsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useLikePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, likes }: { postId: string; likes: string[] }) =>
      likePost(postId, likes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteSavePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
