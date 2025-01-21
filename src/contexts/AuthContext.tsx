import apiClient from 'api/apiClient';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouteLoaderData } from 'react-router';
import { AuthData } from 'types/auth';
import { UserData } from 'types/user';
import retrieveAccessToken from 'utils/retrieveAccessToken';

interface AuthContextType {
  identity: UserData | null;
  fetchIdentity: () => Promise<UserData | null>;
  login: (_userData: AuthData) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('context not provided by AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [identity, setIdentity] = useState<UserData | null>(null);
  const fetchIdentityCallbacks = useRef<
    ((newIdentity: UserData | null) => void)[]
  >([]);

  useEffect(() => {
    fetchIdentity();
  }, []);

  useEffect(() => {
    if (fetchIdentityCallbacks.current.length > 0) {
      console.log('useEffect');
      const callbacks = [...fetchIdentityCallbacks.current];
      fetchIdentityCallbacks.current = [];
      callbacks.forEach((resolve) => resolve(identity));
    }
  }, [identity]);

  const fetchIdentity = (): Promise<UserData | null> => {
    return new Promise((resolve, reject) => {
      apiClient
        .get('/api/user')
        .then((res) => {
          const userData: UserData = res.data.data;
          fetchIdentityCallbacks.current.push(resolve);
          setIdentity(userData);
        })
        .catch((error) => {
          setIdentity(null);
          reject(error);
        });
    });
  };

  const login = async ({ username, password }: AuthData) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    if (response.status !== 200) {
      throw Error('failed to login');
    }
    retrieveAccessToken(response);
    fetchIdentity();
  };

  const logout = async () => {
    await apiClient.get('/auth/logout');
  };

  const refresh = async () => {
    const response = await apiClient.post('/auth/refresh');
    if (response.status !== 200) {
      throw Error('failed to refresh');
    }
    retrieveAccessToken(response);
    fetchIdentity();
  };

  return (
    <AuthContext.Provider
      value={{
        identity,
        fetchIdentity,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
