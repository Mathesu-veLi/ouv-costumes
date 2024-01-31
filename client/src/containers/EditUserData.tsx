import { EditFormValidator } from '@/classes/formValidators/EditFormValidator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function EditUserData() {
  const { id, name, email } = useUserStore().userData;
  const { setUserData } = useUserStore();

  const navigate = useNavigate();

  async function editData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElements = {
      name: document.querySelector('#name') as HTMLInputElement,
      email: document.querySelector('#email') as HTMLInputElement,
    };

    const form = new EditFormValidator(formElements, id, email);

    if (!(await form.isValid())) return await form.showErrors();

    await api
      .patch(`/users/${id}`, {
        name: formElements.name.value,
        email: formElements.email.value,
      })
      .then(() => {
        toast.success('User data uploaded successfully!');

        setUserData({
          id,
          name: formElements.name.value,
          email: formElements.email.value,
        });

        if (email !== formElements.email.value) {
          localStorage.removeItem('user');
          window.location.reload();

          toast('Log in again');
          navigate('/login');
        }
      });
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-2xl">Edit</h1>
        <p className="text-sm text-gray-500 max-w-72 lg:max-w-lg text-center">
          Change a data of your want edit
        </p>
        <form onSubmit={editData} action="" className="lg:w-96">
          <div className="grid gap-12">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-md text-gray-100">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="name@example.com"
                type="text"
                autoComplete="off"
                defaultValue={name}
              />
            </div>
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
                defaultValue={email}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-md text-gray-100">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="password1234"
                type="password"
                disabled
              />
              <div className="flex justify-end">
                <Button className="">Change password</Button>
              </div>
            </div>
            <Button>Edit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
