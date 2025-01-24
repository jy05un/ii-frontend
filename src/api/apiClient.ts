import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

/**
 * apiClient is responsible for jwt token authentication,
 * such as access token and token refreshing.
 * */
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_WAS_SERVER,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
  validateStatus: (status) => status < 500,
});

let refreshSubscribers: ({
  resolve: (value?: any) => void,
  reject: (reason?: any) => void,
})[] = [];

const noticeResolveRefreshSubscribers = (
  callback: () => any
) => {
  refreshSubscribers.forEach(({ resolve }) => resolve(callback()));
  refreshSubscribers = [];
};

const noticeRejectRefreshSubscribers = (
  reason?: any
) => {
  refreshSubscribers.forEach(({reject}) => reject(reason));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (
  resolve: (value?: any) => void,
  reject: (reason?: any) => void,
) => {
  refreshSubscribers.push({resolve, reject});
};

// on-memory access token; 
let accessToken: string | null = null;

// access token insertion for all requests
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// access token retrieval when provided by backend
apiClient.interceptors.response.use((response) => {
  const newAccessToken = response.headers['authorization']
    ?.toString()
    .replace('Bearer: ', '')
    .trim();
  if (newAccessToken) {
    accessToken = newAccessToken;
    console.log('access token set to: ' + accessToken)
  }
  return response;
});

// handling access token rejection
apiClient.interceptors.response.use(
  async (response): Promise<AxiosResponse> => {
    const originalConfig = response.config;
    if (response?.status === 401) {
      if (originalConfig?.url !== '/auth/refresh') {
        console.log('access token refresh')
        if (refreshSubscribers.length == 0) {
          // try refreshing jwt
          try {
            const response = await apiClient.post('/auth/refresh')
            if (response.status === 200) {
              noticeResolveRefreshSubscribers(() => {
                return apiClient(originalConfig)
              })
              return apiClient(originalConfig)
            } else {
              noticeRejectRefreshSubscribers(new Error('failed to refresh'))
            }
          } catch (error) {
            noticeRejectRefreshSubscribers(error);
            return Promise.reject(error)
          }
        } else {
          // if already refreshing, register callback
          return new Promise((resolve, reject) => {
            addRefreshSubscriber(() => resolve(apiClient(originalConfig)), (error) => reject(error));
          });
        }
      } else {
        // jwt refreshing failed; revoke refresh token
        console.log('access token refresh failed')
        await apiClient.get('/auth/logout')
        return Promise.resolve(response)
      }
    }
    return Promise.resolve(response)
  }
);

// access token removal when logout
apiClient.interceptors.response.use((response) => {
  if (response.config.url === '/auth/logout') {
    accessToken = null;
  }
  return response;
});
  
export default apiClient;
