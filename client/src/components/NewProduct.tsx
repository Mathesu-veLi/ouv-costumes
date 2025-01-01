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
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 1,
      stock: 1,
    },
  });

  async function addProduct(productForm: TFormSchema) {
    console.log(productForm);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
        <DialogDescription>
          Insert the information of the product
        </DialogDescription>

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

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogHeader>
    </>
  );
}
