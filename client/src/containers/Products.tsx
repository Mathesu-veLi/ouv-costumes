import { ProductCard } from '@/components/ProductCard';
import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';

export function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProduct() {
      const products = await api.get('products').then((response) => {
        return response.data;
      });

      return products;
    }

    getProduct().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <div className="pt-32 lg:pt-40 lg:flex lg:justify-center lg:items-center lg:flex-col">
      <h1 className="text-center text-xl lg:text-2xl">Products</h1>
      <div className="flex justify-around lg:justify-center items-start mt-10 flex-wrap lg:max-w-6xl lg:gap-10">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              img={`${process.env.API_URL || 'http://localhost:3110'}/uploads/${
                product.img
              }`}
              price={product.price}
              stock={product.stock}
            />
          );
        })}
      </div>
    </div>
  );
}
