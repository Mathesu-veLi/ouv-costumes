import { ChangePasswordFormValidator } from '@/classes/formValidators/ChangePasswordFormValidator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function ChangePassword() {
  const id = useParams().id as string;
  const navigate = useNavigate();
  const { reset } = useUserStore();
  const { id: userId } = useUserStore().userData;

  async function changePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElements = {
      password: document.querySelector('#password') as HTMLInputElement,
      confirmPassword: document.querySelector(
        '#confirmPassword',
      ) as HTMLInputElement,
    };

    const form = new ChangePasswordFormValidator(formElements, Number(id));

    if (!(await form.isValid())) return await form.showErrors();

    await api
      .patch(`/users/${id}`, {
        password: formElements.password.value,
      })
      .then(() => {
        toast.success('User password successfully changed!');
        reset();

        toast('Please log in again');
        navigate('/login');
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (!userId) {
      toast.error('Please log in first');
      return navigate('/login');
    }

    (async function () {
      await api.get(`/users/${id}`).then((response) => {
        const user = response.data;

        if (!user) {
          toast.error('User not found');
          return navigate('/');
        }
      });
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen lg:pt-0">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8 lg:w-2/6">
        <h1 className="font-bold text-2xl">Change Password</h1>
        <form onSubmit={changePassword} action="" className="w-full">
          <div className="grid gap-9">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-md text-gray-100">
                New Password
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
            <Button type="submit">Change</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
