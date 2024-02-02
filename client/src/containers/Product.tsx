import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { IProduct } from '@/interfaces/IProduct';
import { API_URL } from '@/utils/globals';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Product() {
  const { id } = useParams();
  const [productExists, setProductExists] = useState<number>();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    async function getProduct() {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    }

    async function getQuantityOfProducts(): Promise<number> {
      return (await api.get('/products')).data.length;
    }

    getQuantityOfProducts().then((quantityOfProducts) => {
      if (quantityOfProducts < Number(id)) return setProductExists(1);

      getProduct();
    });
  }, [id]);

  if (productExists === 1) return <PageNotFound />;

  return (
    <div className="flex flex-col justify-center items-center h-screen pt-10">
      <div className="flex gap-5 flex-col w-64">
        <div className="flex flex-col-reverse gap-3">
          <div className="flex justify-between w-64 items-center">
            <h1 className="max-w-40">{product?.name}</h1>
            <p className="font-semibold">
              {product?.price
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
                .replace(',', '.')}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={`${API_URL}/uploads/${product?.img}`}
              alt={product?.name}
              className="w-64 border border-slate-400"
            />
          </div>
        </div>

        <form className="flex mt-2 justify-between items-center">
          <div>
            <Label htmlFor="qtd">Quantity ({product?.stock})</Label>
            <Input
              type="number"
              id="qtd"
              className="h-11 w-20 mt-2"
              min={1}
              max={product?.stock}
            />
          </div>
          <div className="flex h-full items-end">
            <Button
              variant="ghost"
              className="p-5 h-11 tracking-widest uppercase rounded-sm border"
            >
              Add to cart
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
