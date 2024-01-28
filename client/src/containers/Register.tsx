import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Register() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-2xl">Register</h1>
        <p className="text-sm text-gray-500">
          Enter your email and password below and confirm your password to
          create your account
        </p>
        <form action="" className="w-full">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-md text-gray-100">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-md text-gray-100">
                Password
              </Label>
              <Input id="password" placeholder="password1234" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-md text-gray-100">
                Confirm Password
              </Label>
              <Input id="password" placeholder="password1234" type="password" />
            </div>
            <Button>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
