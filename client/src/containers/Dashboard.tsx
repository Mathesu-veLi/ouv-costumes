import { Loading } from '@/components/Loading';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { NewProduct } from '@/components/NewProduct';
import { ProductsTable } from '@/components/ProductsTable';
import { useCartStore } from '@/store/useCartStore';
import { useProductContext } from '@/store/ProductContext';
import { authorizeAdmin } from '@/utils/authorizationFunctions';
import { fetchProducts } from '@/utils/productsFunctions';

export function Dashboard() {
  const navigate = useNavigate();
  const { products, setProducts, isLoading, setIsLoading } =
    useProductContext();

  const { token } = useUserStore();
  const userStoreReset = useUserStore().reset;
  const cartStoreReset = useCartStore().reset;

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function authorize() {
      const authorized = await authorizeAdmin(
        token,
        navigate,
        userStoreReset,
        cartStoreReset,
      );

      setAuthorized(authorized);
    }
    
    !authorized && authorize();
    !products.length && fetchProducts(setIsLoading, setProducts);
  }, []);

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
