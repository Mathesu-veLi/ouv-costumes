import { ProductRow } from './ProductRow';
import { useProductContext } from '@/store/ProductContext';

export function ProductsTable() {
  const { products } = useProductContext();

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
      {products.map((product) => {
        return <ProductRow product={product} key={product.id} />;
      })}
    </table>
  );
}
