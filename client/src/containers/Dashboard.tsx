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

export function Dashboard() {
  const navigate = useNavigate();
  const { products, setProducts, isLoading, setIsLoading } =
    useProductContext();

  const { token } = useUserStore();
  const userStoreReset = useUserStore().reset;
  const cartStoreReset = useCartStore().reset;

  const [authorized, setAuthorized] = useState(false);

  async function authorizeAdmin() {
    if (!token) {
      setAuthorized(false);
      toast.error('You must be logged in');
      return navigate('/login');
    }

    await api
      .get('/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        setAuthorized(false);

        if (e.response.status === 498) {
          logout();
          return navigate('/login');
        } else {
          return navigate('/');
        }
      })
      .then(() => {
        toast.success('Access authorized');
        setAuthorized(true);
      });
  }

  function logout() {
    userStoreReset();
    cartStoreReset();
  }

  async function fetchProducts() {
    setIsLoading(true);
    await api
      .get('products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => {
        toast.error('Internal Server Error');
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (!authorized) authorizeAdmin();
    if (!products.length) fetchProducts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl">Dashboard</h1>
      <div
        className={
          'w-full rounded-sm lg:p-10 p-3 ' +
          (products.length <= 4 ? 'mt-10' : 'mt-[400px] sm:mt-[600px]')
        }
      >
        <h2 className="text-xl font-thin">Products</h2>
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
