import axios from 'axios';
import {
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './api';

const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

let interceptorInitialized = false;
let isRefreshing = false;
let pendingRequestsQueue = [];

const isBackendRequest = (requestUrl = '') => {
  if (!requestUrl) {
    return false;
  }

  if (requestUrl.startsWith('http://') || requestUrl.startsWith('https://')) {
    return requestUrl.startsWith(backendURL);
  }

  return requestUrl.startsWith('/api/');
};

const flushQueue = (error, token = null) => {
  pendingRequestsQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
      return;
    }

    promise.resolve(token);
  });

  pendingRequestsQueue = [];
};

const notifySessionExpired = () => {
  clearAuthStorage();
  window.dispatchEvent(new Event('auth:logout'));
};

const requestNewAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  const response = await axios.post(
    `${backendURL}/api/user/refresh-token`,
    { refreshToken },
    {
      skipAuthRefresh: true,
    }
  );

  const newAccessToken = response.data?.token;
  const newRefreshToken = response.data?.refreshToken;

  if (!newAccessToken || !newRefreshToken) {
    throw new Error('Refresh response does not contain valid tokens');
  }

  setAccessToken(newAccessToken);
  setRefreshToken(newRefreshToken);

  return newAccessToken;
};

export const initializeAxiosAuthInterceptor = () => {
  if (interceptorInitialized) {
    return;
  }

  axios.interceptors.request.use(
    (config) => {
      if (!isBackendRequest(config.url)) {
        return config;
      }

      const token = getAccessToken();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config || {};
      const statusCode = error.response?.status;
      const isRefreshRequest =
        typeof originalRequest.url === 'string' &&
        originalRequest.url.includes('/api/user/refresh-token');

      const shouldHandleAuthError =
        isBackendRequest(originalRequest.url) &&
        [401, 403].includes(statusCode) &&
        !originalRequest._retry &&
        !originalRequest.skipAuthRefresh &&
        !isRefreshRequest;

      if (!shouldHandleAuthError) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((queueError) => Promise.reject(queueError));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await requestNewAccessToken();
        flushQueue(null, newToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        flushQueue(refreshError, null);
        notifySessionExpired();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  interceptorInitialized = true;
};
