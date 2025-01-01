import { Button } from './ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export function NewProduct() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
        <DialogDescription>
          Insert the information of the product
        </DialogDescription>

        <div>

        </div>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogHeader>
    </>
  );
}
