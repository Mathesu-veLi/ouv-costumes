import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/useUserStore';
import emailjs from '@emailjs/browser';

export function SentPasswordLink() {
  const { name, id: userId } = useUserStore().userData;

  function sendChangePasswordLink() {
    if (!process.env.SERVICE_KEY)
      return console.log('Set SERVICE_KEY in the .env');

    if (!process.env.PASSWORD_TEMPLATE_KEY)
      return console.log('Set PASSWORD_TEMPLATE_KEY in the .env');

    if (!process.env.PUBLIC_KEY)
      return console.log('Set PUBLIC_KEY in the.env');

    const email = (document.querySelector('#email') as HTMLInputElement).value;

    if (!email) return toast.error('Please enter a valid email address');

    const template_params = {
      to_email: email,
      to_name: name,
      url: `${window.location.origin}/password/${userId}`,
    };

    emailjs
      .send(
        process.env.SERVICE_KEY,
        process.env.PASSWORD_TEMPLATE_KEY,
        template_params,
        {
          publicKey: process.env.PUBLIC_KEY,
        },
      )
      .then(() => toast.success('Change link successfully sent'));
  }

  return (
    <div className="flex mx-5 justify-center items-center h-screen">
      <div className="bg-zinc-800 p-5 flex flex-col gap-5 rounded-lg border">
        <h1>Change password</h1>
        <div className="flex gap-5">
          <Input
            placeholder="Your email"
            className="border border-slate-700"
            id="email"
          />
          <Button onClick={sendChangePasswordLink}>Send link</Button>
        </div>
      </div>
    </div>
  );
}
