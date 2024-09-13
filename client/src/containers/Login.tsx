import { ButtonLoading } from '@/components/ButtonLoading';
import { PasswordInput } from '@/components/PasswordInput';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(25),
});

type TFormSchema = z.infer<typeof formSchema>;

export function Login() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setToken, setUserData } = useUserStore();
  const { id } = useUserStore().userData;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function loginUser(loginForm: TFormSchema) {
    setIsLoading(true);
    await api
      .post('/token', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .then((response) => {
        setToken(response.data.token);
        setUserData(response.data.user);

        toast.success('User logged in successfully!');
        navigate(-1);
      })
      .catch((e) => toast.error(e.response.data.message));
    setIsLoading(false);
  }

  useEffect(() => {
    if (id) {
      toast('You already logged in');
      return navigate('/');
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8 lg:w-2/6">
        <h1 className="font-bold text-2xl">Login</h1>
        <p className="text-sm text-gray-500 max-w-72 lg:max-w-lg text-center">
          Enter your email and password below to login in your account
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(loginUser)}
            className="w-full flex flex-col gap-5"
          >
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="password123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Login</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
