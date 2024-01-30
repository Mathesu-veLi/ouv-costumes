import { LoginFormValidator } from '@/classes/formValidators/LoginFormValidator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';

export function Login() {
  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElements = {
      email: document.querySelector('#email') as HTMLInputElement,
      password: document.querySelector('#password') as HTMLInputElement,
    };

    const form = new LoginFormValidator(formElements);

    if (!form.isValid()) form.showErrors();
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-2xl">Login</h1>
        <p className="text-sm text-gray-500 max-w-72 lg:max-w-lg text-center">
          Enter your email and password below to login in your account
        </p>
        <form onSubmit={login} action="" className="w-full">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-md text-gray-100">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-md text-gray-100">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="password1234"
                type="password"
              />
            </div>
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
