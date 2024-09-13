import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/useUserStore';
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonLoading } from '@/components/ButtonLoading';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email(),
});

type TFormSchema = z.infer<typeof formSchema>;

export function SentPasswordLink() {
  const { name } = useUserStore().userData;
  const { token } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function sendChangePasswordLink(form: TFormSchema) {
    setIsLoading(true);

    const template_params = {
      to_email: form.email,
      to_name: name,
      url: `${window.location.origin}/password/${token}`,
    };

    await emailjs
      .send(
        process.env.SERVICE_KEY as string,
        process.env.PASSWORD_TEMPLATE_KEY as string,
        template_params,
        {
          publicKey: process.env.PUBLIC_KEY as string,
        },
      )
      .then(() => {
        toast.success('Change link successfully sent');
      })
      .catch((e) => {
        toast.error('Internal server error');
        console.log(e);
      });
    setIsLoading(false);
  }

  return (
    <div className="flex mx-5 justify-center items-center h-screen">
      <div className="bg-zinc-800 p-5 flex flex-col gap-5 rounded-lg border">
        <h1>Change password</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendChangePasswordLink)}
            className="flex gap-5 items-end"
            action=""
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
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Send Link</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
