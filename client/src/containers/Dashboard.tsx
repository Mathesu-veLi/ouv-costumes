import { Loading } from '@/components/Loading';

import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { NewProduct } from '@/components/NewProduct';
import { ProductsTable } from '@/components/ProductsTable';
import { useCartStore } from '@/store/useCartStore';
import { useProductContext } from '@/store/ProductContext';
import { AxiosError } from 'axios';

export function Dashboard() {
  const navigate = useNavigate();
  const { products, setProducts, isLoading, setIsLoading } =
    useProductContext();

  const { token } = useUserStore();
  const userStoreReset = useUserStore().reset;
  const cartStoreReset = useCartStore().reset;

  const [authorized, setAuthorized] = useState(false);

  interface ErrorResponseData {
    message: string;
  }

  async function authorizeAdmin() {
    if (!token) {
      setAuthorized(false);
      toast.error('You must be logged in');
      return navigate('/login');
    }

    try {
      await api.get('/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Somente exibe o toast e atualiza o estado se autorizado
      toast.success('Access authorized');
      setAuthorized(true);
    } catch (error) {
      const e = error as AxiosError<ErrorResponseData>;
      setAuthorized(false);

      // Garante que o erro seja tratado apropriadamente
      if (e.response?.status === 498) {
        toast.error('Session expired. Please log in again.');
        logout();
        return navigate('/login');
      } else {
        toast.error(e.response?.data?.message);
        return navigate('/');
      }
    }
  }

  function logout() {
    userStoreReset();
    cartStoreReset();
  }

  async function fetchProducts() {
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

  useEffect(() => {
    if (!authorized) {
      authorizeAdmin();
    }

    if (!products.length) {
      fetchProducts();
    }
  }, [authorized, products.length]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen text-center">
      <h1 className="text-3xl font-semibold pt-52">Dashboard</h1>
      <div className="w-full rounded-sm lg:p-10 p-3">
        <h2 className="text-2xl font-thin">Products</h2>
        <ProductsTable />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-2/3" type="button">
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NewProduct />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
