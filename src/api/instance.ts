import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
    withCredentials: false,
  },
  responseType: 'json',
});
