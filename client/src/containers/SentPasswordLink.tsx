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

const formSchema = z.object({
  email: z.string().email(),
});

type TFormSchema = z.infer<typeof formSchema>;

export function SentPasswordLink() {
  const { name } = useUserStore().userData;
  const { token } = useUserStore();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function sendChangePasswordLink(form: TFormSchema) {
    const template_params = {
      to_email: form.email,
      to_name: name,
      url: `${window.location.origin}/password/${token}`,
    };

    emailjs
      .send(
        process.env.SERVICE_KEY as string,
        process.env.PASSWORD_TEMPLATE_KEY as string,
        template_params,
        {
          publicKey: process.env.PUBLIC_KEY as string,
        },
      )
      .then(() => toast.success('Change link successfully sent'));
  }

  return (
    <div className="flex mx-5 justify-center items-center h-screen">
      <div className="bg-zinc-800 p-5 flex flex-col gap-5 rounded-lg border">
        <h1>Change password</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendChangePasswordLink)}
            className="flex gap-5"
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
            <Button type="submit">Send link</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
