import { API_URL } from '@/utils/globals';
import axios from 'axios';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
