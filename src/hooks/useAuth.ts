import { useAuthContext } from 'contexts/AuthContext';

export const useAuth = () => {
  const { identity, fetchIdentity, login, logout, refresh } =
    useAuthContext();

  return { identity, fetchIdentity, login, logout, refresh };
};
