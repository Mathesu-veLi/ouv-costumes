import { InputImg } from '@/components/InputImg';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IProduct } from '@/interfaces/IProduct';
import { api } from '@/lib/axios';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { authorizeAdmin } from '@/utils/authorizationFunctions';
import { createFileObjectFromImage } from '@/utils/fileFunctions';
import { fetchProduct } from '@/utils/productsFunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

function checkFileType(file: File) {
  const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return validMimeTypes.includes(file.type);
}

const formSchema = z.object({
  image: z
    .instanceof(File, { message: 'Product image must be specified' })
    .refine(
      (image) => checkFileType(image),
      'Only image files (jpeg, png and jpg) are allowed',
    ),
  name: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(1),
});

type TFormSchema = z.infer<typeof formSchema>;

export function EditProduct() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 1,
      stock: 1,
    },
  });

  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [productImg, setProductImg] = useState<File>();

  const { token } = useUserStore();
  const userStoreReset = useUserStore().reset;
  const cartStoreReset = useCartStore().reset;

  const navigate = useNavigate();

  async function updateProduct(productForm: TFormSchema) {
    setIsLoading(true);

    await api
      .patch(`/products/${id}`, productForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Product updated successfully');
        navigate(`/products/${id}`);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    async function fetch() {
      const product = await fetchProduct(Number(id), setIsLoading, setProduct);
      if (product === 404) return navigate('/');
    }

    async function setProductImgPromise() {
      if (!productImg && product?.img) {
        const imageFile = await createFileObjectFromImage(product?.img);
        setProductImg(imageFile);
      }
    }

    async function authorize() {
      const authorized = await authorizeAdmin(
        token,
        navigate,
        userStoreReset,
        cartStoreReset,
      );

      setAuthorized(authorized);
    }

    !authorized && authorize();
    !product && fetch();
    product?.img && setProductImgPromise();
  }, [product]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl">Edit Product {id}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateProduct)}>
          <div className="flex justify-around items-center gap-10 mb-4">
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <InputImg
                        field={field}
                        imagePath={`${process.env.API_URL}/uploads/${product?.img}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="T-shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="100"
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12"
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
