import { IProduct } from '@/interfaces/IProduct';
import { ProductRow } from './ProductRow';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';

interface IProps {
  products: IProduct[];
  setProductsState: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setIsLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  userToken: string;
}

export function ProductsTable(props: IProps) {
  async function deleteProduct(id: number) {
    props.setIsLoadingState(true);
    await api
      .delete('/products/' + id, {
        headers: {
          Authorization: `Bearer ${props.userToken}`,
        },
      })
      .then(() => {
        props.setProductsState(props.products.filter((p) => p.id !== id));
        toast.success('Product deleted successfully');
      })
      .catch((e) => toast.error(e.response.data.message))
      .finally(() => props.setIsLoadingState(false));
  }

  return (
    <table className="w-full mt-10 mb-5">
      <tr>
        <th>Id</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th className="max-[1000px]:hidden">Stock</th>
        <th>Actions</th>
      </tr>
      {props.products.map((product) => {
        return (
          <ProductRow
            product={product}
            deleteProductFunc={deleteProduct}
            key={product.id}
          />
        );
      })}
    </table>
  );
}
