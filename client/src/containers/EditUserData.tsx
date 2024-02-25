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
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().max(0),
});

type TFormSchema = z.infer<typeof formSchema>;

export function EditUserData() {
  const { id, name, email } = useUserStore().userData;

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    values: {
      name,
      email,
      password: '',
    },
  });

  const { token, setUserData, reset } = useUserStore();

  const navigate = useNavigate();

  async function editUserData(editDataForm: TFormSchema) {
    editDataForm.email = editDataForm.email.toLowerCase();

    await api
      .patch(`/users/${id}`, editDataForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('User data uploaded successfully!');
        setUserData({ id, ...editDataForm });

        if (email !== editDataForm.email) {
          reset();

          toast('Please log in again');
          return navigate('/login');
        }
      });
  }

  useEffect(() => {
    if (!id) {
      toast('You need to log in to access the user data editing page');
      return navigate('/login');
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8 lg:w-2/6">
        <h1 className="font-bold text-2xl">Edit</h1>
        <p className="text-sm text-gray-500 max-w-72 lg:max-w-lg text-center">
          Change a data of your want edit
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editUserData)}
            className="lg:w-96 flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-center items-end">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password123" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={() => navigate('/password')} variant="outline">
                Change Password
              </Button>
            </div>
            <Button type="submit">Edit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
