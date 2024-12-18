import { Loading } from '@/components/Loading';
import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';

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
      <div className="lg:w-3/4 w-full rounded-sm lg:p-10 p-3 m-10">
        <h2 className="text-xl font-thin">Products</h2>
        <table className="lg:w-full mt-10">
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          {products.map((product) => {
            return (
              <tr
                key={product.id}
                className="lg:[&>td]:px-10 [&>td]:px-3 [&>td]:py-5 text-center"
              >
                <td>{product.id}</td>
                <td className="flex justify-center">
                  <img
                    src={`${process.env.API_URL}/uploads/${product.img}`}
                    alt={`${product.name} image`}
                    className="lg:w-20 lg:h-20"
                  />
                </td>
                <td>
                  {product.name.length > 25
                    ? `${product.name.substring(0, 26)}...`
                    : product.name}
                </td>
                <td>R${product.price}</td>
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
