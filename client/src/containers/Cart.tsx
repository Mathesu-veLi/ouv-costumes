import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { formatToPrice } from '@/utils/formatToPrice';
import { API_URL } from '@/utils/globals';
import { Link } from 'react-router-dom';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
import { FiMinusCircle } from 'react-icons/fi';

export function Cart() {
  const { products, totalPrice, incrementQuantity, decrementQuantity } =
    useCartStore();

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
    <div className="flex flex-col lg:flex-row w-full justify-center items-center h-screen gap-5">
      <div className="mx-3 w-[340px] flex flex-col gap-5">
        <div className="w-full p-3 border">
          <h1>My Cart</h1>
        </div>

        <div className="px-3 flex flex-col gap-4">
          {products.map((product) => {
            return (
              <div key={product.id} className="flex gap-4">
                <img
                  src={`${API_URL}/uploads/${product.img}`}
                  alt={product.name}
                  className="w-36 border rounded-sm"
                />

                <div className="flex flex-col justify-between">
                  <h1>{product.name}</h1>
                  <div className="flex flex-col gap-2 lg:flex-row justify-between">
                    <div className="flex gap-4 justify-end items-center">
                      <FaRegTrashCan title="Delete" />

                      <div className="flex gap-2 justify-center items-center">
                        <FiMinusCircle
                          onClick={() => decrementQuantity(product.id)}
                        />
                        <span>{product.quantity}</span>
                        <FiPlusCircle
                          onClick={() => incrementQuantity(product.id)}
                        />
                      </div>
                    </div>

                    <h1 className="font-bold">
                      {formatToPrice(product.price)}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border rounded-sm flex flex-col p-4 gap-5 mx-1 w-[340px]">
        <p>Order Summary</p>
        <div>
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex justify-between gap-3 text-gray-300"
              >
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
