import cat404 from '@/assets/404_cat.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function PageNotFound() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="font-bold text-lg">Page Not Found!</h2>
        <Button variant="outline">
          <Link to="/">Go back to home page</Link>
        </Button>
      </div>
      <img src={cat404} className="absolute bottom-0 w-80" alt="" />
    </div>
  );
}
