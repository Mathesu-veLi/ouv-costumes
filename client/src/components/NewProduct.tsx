import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { InputImg } from './InputImg';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import { useProductContext } from '@/store/ProductContext';
import { useUserStore } from '@/store/useUserStore';
import { deleteProductImage, uploadProductImage } from '@/utils/fileFunctions';

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

export function NewProduct() {
  const { token } = useUserStore();
  const { setProducts, products, setIsLoading } = useProductContext();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 1,
      stock: 1,
    },
  });

  async function addProduct(productForm: TFormSchema) {
    setIsLoading(true);

    const filename = await uploadProductImage(
      productForm.image,
      token,
      setIsLoading,
    );
    if (!filename) return;

    await api
      .post(
        '/products',
        {
          img: filename,
          name: productForm.name,
          price: productForm.price,
          stock: productForm.stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setProducts([...products, res.data.prismaProduct]);
        toast.success('Product added successfully');
        form.reset();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        deleteProductImage(filename, token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
        <DialogDescription>
          Insert the information of the product
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(addProduct)}>
          <div className="flex justify-around items-center gap-10 mb-4">
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <InputImg field={field} />
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

      <DialogFooter className="sm:justify-center w-full">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="w-full">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
