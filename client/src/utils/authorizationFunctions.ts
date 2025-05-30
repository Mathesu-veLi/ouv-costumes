import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ErrorResponseData {
  message: string;
}

export async function authorizeAdmin(
  token: string,
  navigate: NavigateFunction,
  userStoreReset: VoidFunction,
  cartStoreReset: VoidFunction,
) {
  if (!token) {
    toast.error('You must be logged in');
    return false;
  }

  try {
    await api.get('/token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    const e = error as AxiosError<ErrorResponseData>;

    if (e.response?.status === 498) {
      toast.error('Session expired. Please log in again.');
      logout(userStoreReset, cartStoreReset);
      navigate('/login');
    } else {
      toast.error(e.response?.data?.message);
      navigate('/');
    }
    return false;
  }
}

export function logout(
  userStoreReset: VoidFunction,
  cartStoreReset: VoidFunction,
) {
  userStoreReset();
  cartStoreReset();
}
