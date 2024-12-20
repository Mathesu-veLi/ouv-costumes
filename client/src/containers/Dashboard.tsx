import { Loading } from '@/components/Loading';
import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function Dashboard() {
  const navigate = useNavigate();

  const { token } = useUserStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function authorizeAdmin() {
    await api
      .get('/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        return navigate('/');
      })
      .then(() => {
        toast.success('Access authorized');
        setAuthorized(true);
      });
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

  async function deleteProduct(id: number) {
    await api
      .delete('/products/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        toast.success('Product deleted successfully');
      }).catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  useEffect(() => {
    if (!token) {
      toast.error('Please log in first');
      return navigate('/login');
    }

    if (!authorized) authorizeAdmin();
    if (!products.length) fetchProducts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="w-full rounded-sm lg:p-10 p-3 m-10">
        <h2 className="text-xl font-thin">Products</h2>
        <table className="w-full mt-10">
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th className="max-[1000px]:hidden">Stock</th>
            <th>Actions</th>
          </tr>
          {products.map((product) => {
            return (
              <tr
                key={product.id}
                className="lg:[&>td]:px-10 [&>td]:py-3 [&>td]:my-5 text-center hover:cursor-pointer hover:border hover:bg-zinc-900"
                onClick={() => navigate('/product/' + product.id)}
              >
                <td>{product.id}</td>
                <td className="flex justify-center">
                  <img
                    src={`${process.env.API_URL}/uploads/${product.img}`}
                    alt={`${product.name} image`}
                    className="max-w-28 max-h-28 max-[800px]:w-20 max-[800px]:h-20 rounded-sm"
                  />
                </td>
                <td>
                  <p className="max-[800px]:hidden">
                    {product.name.length > 40
                      ? `${product.name.substring(0, 41)}...`
                      : product.name}
                  </p>

                  <p className="lg:hidden max-w-20">
                    {product.name.length > 25
                      ? `${product.name.substring(0, 26)}...`
                      : product.name}
                  </p>
                </td>
                <td>
                  {product.price
                    .toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                    .replace(',', '.')}
                </td>
                <td className="max-[1000px]:hidden">{product.stock}</td>
                <td>
                  <span className="flex flex-col lg:flex-row justify-center items-center gap-3">
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${product.id}`);
                      }}
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
