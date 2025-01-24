import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';

type VoidFunction<G> = (arg: G) => void;

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
