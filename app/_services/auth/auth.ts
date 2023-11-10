import axios from 'axios';
import LocalStorage from '@/app/_utils/localstorage';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: '/',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = LocalStorage.getItem('accessToken');
  if (token !== null) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
