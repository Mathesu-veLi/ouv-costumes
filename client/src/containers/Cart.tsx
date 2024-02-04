import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { formatToPrice } from '@/utils/formatToPrice';
import { Link } from 'react-router-dom';

export function Cart() {
  const { products, totalPrice } = useCartStore();

  if (!products.length)
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <h1>Add a Product first!</h1>
        <Button variant="outline">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row w-full justify-center items-center h-screen">
      <div></div>
      <div className="border rounded-sm flex flex-col mx-1 p-4 gap-5">
        <p>Order Summary</p>
        <div>
          {products.map((product) => {
            return (
              <div className="flex justify-between gap-3 text-gray-300">
                <div className="flex gap-3">
                  <span>x{product.quantity}</span>
                  <span>{product.name}</span>
                </div>
                <p className="flex justify-self-end">
                  {formatToPrice(product.subTotal)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between py-2 border-t w-full">
          <p>Order Total</p>
          <p>{formatToPrice(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}
