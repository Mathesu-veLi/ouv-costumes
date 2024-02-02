import { Product } from '@/components/Product';
import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';

export function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProduct() {
      const products = await api.get('products', {
        data: {
          
        }
      }).then((response) => {
        return response.data;
      });

      return products;
    }

    getProduct().then((response) => {
      setProducts(response);
      console.log(products);
    });
  }, []);

  return (
    <div className="pt-32">
      <h1 className="text-center text-xl">Products</h1>
      <div className="flex justify-around items-start mt-10 flex-wrap">
        {products.map((product) => {
          return (
            <Product
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
