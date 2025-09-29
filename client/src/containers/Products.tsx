import { Loading } from '@/components/Loading';
import { ProductCard } from '@/components/ProductCard';
import { IProduct } from '@/interfaces/IProduct';
import { fetchProducts } from '@/utils/productsFunctions';
import { useEffect, useState } from 'react';

export function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts(setIsLoading, setProducts);
  }, []);

  if (isLoading) return <Loading />;

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
              img={`${product.img}`}
              price={product.price}
              stock={product.stock}
            />
          );
        })}
      </div>
    </div>
  );
}
