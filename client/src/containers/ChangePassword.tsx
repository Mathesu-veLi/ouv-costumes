import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

//import { useParams } from 'react-router-dom';

export function ChangePassword() {
  //const { id } = useParams();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <div className="p-5 lg:p-10 flex flex-col justify-center items-center gap-8 lg:w-2/6">
        <h1 className="font-bold text-2xl">Change Password</h1>
        <form action="" className="w-full">
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
            <Button>Change</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
