import { useAuthContext } from 'contexts/AuthContext';

export const useAuth = () => {
  const { login, logout, refresh } =
    useAuthContext();

  return { login, logout, refresh };
};
