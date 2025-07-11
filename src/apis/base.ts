import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const createApiWithToken = (token : string) => {
  const api = axios.create({
    baseURL: baseApi.defaults.baseURL,
    headers: {
      ...baseApi.defaults.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return api;
};

export const createFormApiWithToken = (token : string) => {
  const api = axios.create({
    baseURL: formApi.defaults.baseURL,
    headers: {
      ...formApi.defaults.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return api;
};

export default baseApi;
