import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useUserContext = () => {
  return useContext(AuthContext);
};
