import { useAuthContext } from 'contexts/AuthContext';

export const useAuth = () => {
  const { identity, fetchIdentity, login, logout, validate, register } =
    useAuthContext();

  return { identity, fetchIdentity, login, logout, validate, register };
};
