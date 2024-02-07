import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function Contact() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:h-screen pt-32 lg:p-0 gap-10 lg:gap-24 mb-10 lg:m-0">
      <div className="max-w-72 flex gap-5 flex-col tracking-wider leading-relaxed p-2">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="text-lg text-gray-400">
          Email, call, or complete the form to send us a message without leaving
          the site
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

      <div className="bg-gray-900 p-5 mx-3 rounded-md flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Send us a message</h1>
        <form action="" className=" flex flex-col gap-5">
          <div className="flex gap-3 border-none">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>

          <Input placeholder="Your email" />
          <Input placeholder="Phone number" />
          <Textarea placeholder="How can we help?" />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
