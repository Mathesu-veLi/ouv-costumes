import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { IProduct } from '@/interfaces/IProduct';
import { API_URL } from '@/utils/globals';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'react-toastify';

export function Product() {
  const { id } = useParams();
  const [productExists, setProductExists] = useState<number>();
  const [product, setProduct] = useState<IProduct>();
  const { addProduct } = useCartStore();
  const navigate = useNavigate();

  function addToCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!product) return;
    const quantity = Number(
      (document.querySelector('#qtd') as HTMLInputElement).value,
    );
    const price = Number(product.price);

    addProduct({
      id: product.id,
      name: product.name,
      price,
      img: product.img,
      quantity,
      subTotal: quantity * price,
    });

    navigate('/cart');
    toast.success('Item added to cart');
  }

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
    <div className="flex flex-col justify-center items-center h-screen pt-10 lg:pt-0">
      <div className="flex gap-5 flex-col w-64 lg:w-auto">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex flex-col justify-center items-center">
            <img
              src={`${API_URL}/uploads/${product?.img}`}
              alt={product?.name}
              className="w-64 lg:w-96 border border-slate-500"
            />
          </div>

          <div className="flex flex-col gap-5 justify-between">
            <div className="flex lg:flex-col justify-between w-64 lg:w-auto items-center lg:items-baseline lg:gap-4">
              <h1 className="max-w-40 lg:max-w-none lg:text-xl">
                {product?.name}
              </h1>
              <p className="font-semibold lg:text-lg">
                {product?.price
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  .replace(',', '.')}
              </p>
            </div>

            <form
              onSubmit={addToCart}
              className="flex justify-between items-center lg:gap-6"
            >
              <div>
                <Label htmlFor="qtd" className="ms-1">
                  Quantity ({product?.stock})
                </Label>
                <Input
                  type="number"
                  id="qtd"
                  className="h-11 mt-2 px-4 w-24"
                  min={1}
                  max={product?.stock}
                  defaultValue={1}
                />
              </div>

              <div className="flex h-full items-end">
                <Button
                  variant="ghost"
                  className="p-5 h-11 tracking-widest uppercase rounded-sm border"
                  type="submit"
                >
                  Add to cart
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
