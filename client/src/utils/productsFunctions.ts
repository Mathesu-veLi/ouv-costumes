import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type VoidFunction<G> = (arg: G) => void;

interface ErrorResponseData {
  message: string;
}

export async function fetchProducts(
  setIsLoading: VoidFunction<boolean>,
  setProducts: VoidFunction<IProduct[]>,
) {
  setIsLoading(true);
  try {
    const response = await api.get('products');
    setProducts(response.data);
  } catch (e) {
    console.error(e);
    toast.error('Internal Server Error');
  } finally {
    setIsLoading(false);
  }
}

export async function fetchProduct(
  id: number,
  setIsLoading: VoidFunction<boolean>,
  setProduct: VoidFunction<IProduct>,
) {
  setIsLoading(true);

  try {
    const product = await api.get<IProduct>(`/products/${id}`);

    setProduct(product.data);
  } catch (error) {
    const e = error as AxiosError<ErrorResponseData>;
    toast.error(e.response?.data.message);

    if (e.response?.status === 404) return e.response?.status;
  } finally {
    setIsLoading(false);
  }
}
