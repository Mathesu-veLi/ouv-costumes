import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RegisterFormValidator } from '@/classes/UserFormValidator';
import { registerFormValidation } from '@/utils/showFormErrors';

import { FormEvent } from 'react';

export function Register() {
  function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElements = {
      email: document.querySelector('#email') as HTMLInputElement,
      password: document.querySelector('#password') as HTMLInputElement,
      confirmPassword: document.querySelector(
        '#confirmPassword',
      ) as HTMLInputElement,
    };

    const form = new RegisterFormValidator(formElements);

    if (!form.isValid) registerFormValidation(formElements);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-2xl">Register</h1>
        <p className="text-sm text-gray-500 max-w-72 lg:max-w-md text-center">
          Enter your email and password below and confirm your password to
          create your account
        </p>
        <form onSubmit={register} action="" className="w-full">
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
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-md text-gray-100">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="password1234"
                type="password"
              />
            </div>
            <Button>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
