import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://connections-api.goit.global',
  timeout: 15000,
});

export const token = {
  set(value) {
    api.defaults.headers.common.Authorization = `Bearer ${value}`;
  },

  unset() {
    delete api.defaults.headers.common.Authorization;
  },
};

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status ?? null;
    const isTimeout =
      error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';

    return Promise.reject({
      status,
      data: error.response?.data ?? null,
      message: isTimeout
        ? 'The server took too long to respond. Please try again.'
        : status === null
          ? 'Unable to connect to the server. Please try again.'
          : 'The request failed. Please try again.',
    });
  }
);
