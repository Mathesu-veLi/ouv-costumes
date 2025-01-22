import { IProduct } from '@/interfaces/IProduct';
import { Button } from './ui/button';
import { FaPen } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '@/lib/axios';
import { useProductContext } from '@/store/ProductContext';
import { useUserStore } from '@/store/useUserStore';

interface IProps {
  product: IProduct;
}

export function ProductRow(props: IProps) {
  const { setProducts, products, setIsLoading } = useProductContext();
  const { token } = useUserStore();
  const navigate = useNavigate();

  async function deleteProduct(id: number) {
    setIsLoading(true);
    await api
      .delete('/products/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        toast.success('Product deleted successfully');
      })
      .catch((e) => toast.error(e.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <tr
      className="lg:[&>td]:px-10 [&>td]:py-3 [&>td]:my-5 text-center hover:cursor-pointer hover:border hover:bg-zinc-900"
      onClick={() => navigate('/product/' + props.product.id)}
    >
      <td>{props.product.id}</td>
      <td className="flex justify-center">
        <img
          src={`${process.env.API_URL}/uploads/${props.product.img}`}
          alt={`${props.product.name} image`}
          className="max-w-28 max-h-28 max-[800px]:w-20 max-[800px]:h-20 rounded-sm"
        />
      </td>
      <td>
        <p className="max-[800px]:hidden">
          {props.product.name.length > 40
            ? `${props.product.name.substring(0, 41)}...`
            : props.product.name}
        </p>

        <p className="lg:hidden max-w-20">
          {props.product.name.length > 25
            ? `${props.product.name.substring(0, 26)}...`
            : props.product.name}
        </p>
      </td>
      <td>
        {props.product.price
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace(',', '.')}
      </td>
      <td className="max-[1000px]:hidden">{props.product.stock}</td>
      <td>
        <span className="flex flex-col lg:flex-row justify-center items-center gap-3">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${props.product.id}`);
            }}
          >
            <FaPen />
          </Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(props.product.id);
            }}
          >
            <FaTrash />
          </Button>
        </span>
      </td>
    </tr>
  );
}
