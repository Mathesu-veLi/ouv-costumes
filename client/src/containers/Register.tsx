import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ButtonLoading } from '@/components/ButtonLoading';
import { useState } from 'react';
import { PasswordInput } from '@/components/PasswordInput';

const formSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(5).max(25),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type TFormSchema = z.infer<typeof formSchema>;

export function Register() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function registerUser(registerForm: TFormSchema) {
    setIsLoading(true);
    await api
      .post('/users', {
        name: registerForm.name,
        email: registerForm.email.toLowerCase(),
        password: registerForm.password,
      })
      .then(() => {
        toast.success('User successfully registered!');
        navigate('/login');
      })
      .catch((e) => toast.error(e.response.data.message));
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8 lg:w-2/6">
        <h1 className="font-bold text-2xl">Register</h1>
        <p className="text-sm text-gray-500 max-w-72 lg:max-w-md text-center">
          Enter your email and password below and confirm your password to
          create your account
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(registerUser)}
            className="w-full flex flex-col gap-5"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
              <Button type="submit">Register</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
