import { useAuthContext } from 'contexts/AuthContext';

export const useAuth = () => {
  const { identity, login, logout, refresh } =
    useAuthContext();

  return { identity, login, logout, refresh };
};
