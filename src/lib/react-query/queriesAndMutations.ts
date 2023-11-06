import { useMutation } from 'react-query';
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from '../appwrite/api';
import { NewUserInterface } from '@/types';

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
  return useMutation({ mutationFn: () => signOutAccount() });
};
