import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { ButtonLoading } from '@/components/ButtonLoading';

export function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  async function sendEmail(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const firstName = (document.querySelector('#firstName') as HTMLInputElement)
      .value;
    const lastName = (document.querySelector('#lastName') as HTMLInputElement)
      .value;
    const email = (document.querySelector('#email') as HTMLInputElement).value;
    const message = (document.querySelector('#message') as HTMLTextAreaElement)
      .value;

    if (!firstName || !lastName || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    const template_params = {
      from_name: `${firstName} ${lastName}`,
      to_name: 'OUV',
      from_email: email,
      message: message,
    };

    await emailjs
      .send(
        process.env.SERVICE_KEY as string,
        process.env.CONTACT_TEMPLATE_KEY as string,
        template_params,
        {
          publicKey: process.env.PUBLIC_KEY as string,
        },
      )
      .then(() => {
        toast.success('Message sent successfully');
      });
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center lg:h-screen pt-32 lg:p-0 mb-10 lg:m-0">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-24 lg:p-10">
        <div className="max-w-72 flex gap-7 flex-col tracking-wider leading-relaxed p-2">
          <h1 className="text-3xl font-semibold">Contact Us</h1>
          <p className="text-lg text-gray-400">
            Email, call, or complete the form to send us a message without
            leaving the site
          </p>
          <a
            className="text-lg text-gray-400"
            href="mailto:matheuslevit@gmail.com"
          >
            matheuslevit@gmail.com
          </a>
          <a className="text-lg text-gray-400" href="tel:+5571985076263">
            +55 71 98507-6263
          </a>
        </div>
        <div className=" border p-5 mx-3 rounded-md flex flex-col gap-5 ">
          <form onSubmit={sendEmail} className="flex flex-col gap-5">
            <h1 className="text-xl font-semibold">Send us a message</h1>
            <div className="flex gap-5 border-none">
              <Input placeholder="First name" id="firstName" />
              <Input placeholder="Last name" id="lastName" />
            </div>
            <Input placeholder="Your email" id="email" />
            <Textarea
              placeholder="How can we help?"
              id="message"
              className="max-h-80"
            />
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Send</Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
