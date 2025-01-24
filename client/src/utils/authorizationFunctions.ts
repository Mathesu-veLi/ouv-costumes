import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ErrorResponseData {
  message: string;
}

type authorizeRes = boolean | 498;

export async function authorizeAdmin(token: string): Promise<authorizeRes> {
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

    toast.success('Access authorized');
    return true;
  } catch (error) {
    const e = error as AxiosError<ErrorResponseData>;

    if (e.response?.status === 498) {
      toast.error('Session expired. Please log in again.');
      return e.response?.status;
    } else {
      toast.error(e.response?.data?.message);
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
