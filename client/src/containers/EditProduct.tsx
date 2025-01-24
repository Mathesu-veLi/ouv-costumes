import { Loading } from '@/components/Loading';
import { IProduct } from '@/interfaces/IProduct';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { authorizeAdmin, logout } from '@/utils/authorizationFunctions';
import { fetchProduct } from '@/utils/productsFunctions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const { token } = useUserStore();
  const userStoreReset = useUserStore().reset;
  const cartStoreReset = useCartStore().reset;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const product = await fetchProduct(Number(id), setIsLoading, setProduct);
      if (product === 404) return navigate('/');
    }

    async function authorize() {
      const authorized = await authorizeAdmin(token);

      if (!authorized) {
        return navigate('/');
      }
      if (authorized === 498) {
        logout(userStoreReset, cartStoreReset);
        return navigate('/login');
      }

      setAuthorized(authorized);
    }

    !authorized && authorize();
    !product && fetch();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <h1>Edit Product {id}</h1>

      <button>Save</button>
    </div>
  );
}
