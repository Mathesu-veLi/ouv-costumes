import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '@/interfaces/IProduct';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'react-toastify';
import { Loading } from '@/components/Loading';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserStore } from '@/store/useUserStore';
import { fetchProduct } from '@/utils/productsFunctions';

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(false);

  const { addProduct } = useCartStore();
  const { id: userId } = useUserStore().userData;
  const navigate = useNavigate();

  const formSchema = z.object({
    quantity: z.coerce
      .number()
      .min(1)
      .max(product?.stock as number),
  });

  type TFormSchema = z.infer<typeof formSchema>;

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  function addToCart(productForm: TFormSchema) {
    if (!product) return;
    if (!userId) {
      navigate('/login');
      toast.error('Please log in first.');
      return;
    }
    const price = Number(product.price);

    addProduct({
      id: product.id,
      name: product.name,
      price,
      img: product.img,
      quantity: productForm.quantity,
      subTotal: productForm.quantity * price,
      stock: product.stock,
      priceId: product.priceId as string,
    });

    navigate('/cart');
    toast.success('Item added to cart');
  }

  useEffect(() => {
    async function fetch() {
      const product = await fetchProduct(Number(id), setIsLoading, setProduct);
      if (product === 404) return navigate('/');
    }

    !product && fetch();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center h-screen pt-10 lg:pt-0">
      <div className="flex gap-5 flex-col w-64 lg:w-auto">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-5">
          <div className="flex flex-col justify-center items-center">
            <img
              src={`${product?.img}`}
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addToCart)}
                className="flex justify-between items-center lg:gap-6"
              >
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ms-1">
                        Quantity ({product?.stock})
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          id="qtd"
                          className="h-11 mt-2 px-4 w-24"
                          min={1}
                          max={product?.stock}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
