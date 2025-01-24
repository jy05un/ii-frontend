import apiClient from 'api/apiClient';
import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthData } from 'types/auth';
import { UserData, UserIdentity } from 'types/user';

interface AuthContextType {
  identity: UserIdentity | null;
  fetchIdentity: () => Promise<UserIdentity>;
  login: ({ username, password }: AuthData) => Promise<UserIdentity>;
  logout: () => Promise<void>;
  validate: ({ username, password, email, nickname }: { username?: string, password?: string, email?: string, nickname?: string }) => Promise<void>;
  register: ({ username, password, email, nickname }: UserData & { password: string }) => Promise<UserIdentity | null>;
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
  const fetchIdentityResolves = useRef<
    ((newIdentity: UserIdentity) => void)[]
  >([]);
  const fetchIdentityRejects = useRef<
    ((reason?: any) => void)[]
  >([]);

  // fetch identity when AuthProvider is mounted
  useEffect(() => {
    fetchIdentity()
    .catch(()=>console.log('No Identity'));
  }, []);

  // return userdata to the fetchIdentity caller
  // Is passing identity to callback really needed?
  useEffect(() => {
    if (fetchIdentityResolves.current.length > 0) {
      if (identity != null) {
        const callbacks = [...fetchIdentityResolves.current];
        callbacks.forEach((resolve) => resolve(identity));
      } else {
        const callbacks = [...fetchIdentityRejects.current];
        callbacks.forEach((reject) => reject(new Error('failed to fetch identity')))
      }
      fetchIdentityResolves.current = [];
      fetchIdentityRejects.current = [];
    }
  }, [identity]);

  // why user data provided by AuthContext, not UserContext?
  // better separate userid and other informations in the backend
  const fetchIdentity = (): Promise<UserIdentity> => {
    return new Promise((resolve, reject) => {
      // schedule fetch if one not scheduled yet
      if (fetchIdentityResolves.current.length < 1) {
        apiClient
          .get('/api/user')
          .then((response) => {
            if (response.status == 200) {
              const newIdentity = response.data.data
              setIdentity(newIdentity);
              fetchIdentityResolves.current
                .forEach((resolve) => resolve(newIdentity))
            } else {
              setIdentity(null)
              fetchIdentityRejects.current
                .forEach((reject) => reject(new Error(`failed to fetch identity: ${response.statusText}`)))
            }
          })
          .catch((error) => {
            // other 5xx errors
            fetchIdentityRejects.current
              .forEach((reject) => reject(error))
          })
          .finally(() => {
            fetchIdentityResolves.current = []
            fetchIdentityRejects.current = []
          }
          )
      }
      fetchIdentityResolves.current.push(resolve);
      fetchIdentityRejects.current.push(reject)
    });
  }

  // actual token management is done in apiClient
  const login = async ({ username, password }: AuthData) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    if (response.status === 401) {
      throw Error('failed to login');
    }
    return await fetchIdentity();
  };

  // actual token management is done in apiClient
  const logout = async () => {
    await apiClient.get('/auth/logout');
    setIdentity(null)
  };

  const usernamePattern = new RegExp(/^[a-zA-Z0-9_-]{5,32}$/);
  const passwordPattern = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$/)
  const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const nicknamePattern = new RegExp(/^.{2, 16}/);

  const validate = async ({ username, password, email, nickname }: { username?: string, password?: string, email?: string, nickname?: string }) => {
    // validate user
    if (username !== undefined) {
      const isValidUsername = usernamePattern.test(username)
      if (!isValidUsername)
        throw Error(`username ${username} does not match the pattern`, { cause: { source: 'username', reason: 'pattern' } })
      const usernameExists = (await apiClient.get(`/api/users/exists/${username}`)).status !== 404
      if (usernameExists)
        throw Error(`username ${username} already exists`, { cause: { source: 'username', reason: 'unique' } })
    }

    // validate password
    if (password !== undefined) {
      const isValidPassword = passwordPattern.test(password)
      if (!isValidPassword)
        throw Error(`password does not match the pattern`, { cause: { source: 'password', reason: 'pattern' } })
    }

    // validate email
    if (email !== undefined) {
      const isValidEmail = emailPattern.test(email);
      if (!isValidEmail)
        throw Error(`email ${email} does not match the pattern`, { cause: { source: 'email', reason: 'pattern' } })
    }

    // validate nickname
    if (nickname !== undefined) {
      const isValidNickname = nicknamePattern.test(nickname)
      if (!isValidNickname)
        throw Error(`nickname ${nickname} does not match the pattern`, { cause: { source: 'email', reason: 'pattern' } })
    }
  }

  const register = async ({ username, password, email, nickname }: UserData & { password: string }) => {
    validate({ username, password, email, nickname })
    const tryRegister = await apiClient.post('/auth/register')
    if (tryRegister.status === 200) {
      return await login({ username, password })
    }
    throw Error('failed to register', { cause: { source: 'register', reason: (tryRegister.statusText + tryRegister.data.stringify()) } })
  }

  // no explicit refresh operation in application context; fully managed by apiClient

  return (
    <AuthContext.Provider
      value={{
        identity,
        fetchIdentity,
        login,
        logout,
        validate,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
