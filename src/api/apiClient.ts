import axios from 'axios';
import Cookies from 'js-cookie';
import retrieveAccessToken from 'utils/retrieveAccessToken';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_WAS_SERVER,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const noticeRefreshSubscribers = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_WAS_SERVER}/auth/refresh`,
          );
          retrieveAccessToken(response)
          noticeRefreshSubscribers();
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(apiClient(original));
        });
      });
    }
    return Promise.reject(error);
  },
);

export default apiClient;
