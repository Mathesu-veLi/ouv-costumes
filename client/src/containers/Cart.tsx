import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { formatToPrice } from '@/utils/formatToPrice';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
import { FiMinusCircle } from 'react-icons/fi';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface ILineItem {
  price: string;
  quantity: number;
}

export function Cart() {
  const {
    products,
    totalPrice,
    incrementQuantity,
    decrementQuantity,
    removeProduct,
  } = useCartStore();

  const { id } = useUserStore().userData;
  const navigate = useNavigate();

  async function checkoutCart() {
    const lineItems: ILineItem[] = [];
    products.forEach((product) => {
      lineItems.push({ price: product.priceId, quantity: product.quantity });
    });

    const sessionUrl = (await api.post('/checkouts', { lineItems })).data;
    window.location.replace(sessionUrl);
  }

  useEffect(() => {
    if (!id) {
      toast.error('Please log in first');
      navigate('/login');
      return;
    }
  });

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
    <div className="flex w-full justify-center items-center h-screen pt-80 lg:pt-20">
      <div className="flex flex-col lg:flex-row gap-14 justify-center lg:justify-around items-start pb-10 lg:p-0 lg:w-11/12">
        <div className="mx-3 w-[340px] lg:w-full flex flex-col gap-5">
          <div className="w-full p-3 border">
            <h1>My Cart</h1>
          </div>
          <div className="px-3 flex flex-col gap-4 lg:gap-6">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex w-80 lg:w-auto justify-between"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex gap-4 lg:gap-6"
                  >
                    <img
                      src={`${product.img}`}
                      alt={product.name}
                      className="w-36 lg:w-48 border rounded-sm"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <h1>{product.name}</h1>
                      <h1 className="font-bold">
                        {formatToPrice(product.price)}
                      </h1>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2 lg:flex-row-reverse justify-between items-end">
                    <div className="flex gap-4 justify-end items-center">
                      <FaRegTrashCan
                        title="Delete"
                        onClick={() => removeProduct(product.id)}
                      />
                      <div className="flex gap-2 justify-center items-center w-16">
                        <FiMinusCircle
                          onClick={() => decrementQuantity(product.id)}
                          className={
                            product.quantity == 1
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }
                          color={product.quantity == 1 ? 'gray' : 'white'}
                        />
                        <span>{product.quantity}</span>
                        <FiPlusCircle
                          onClick={() => incrementQuantity(product.id)}
                          className={
                            product.quantity == product.stock
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }
                          color={
                            product.quantity == product.stock ? 'gray' : 'white'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border rounded-sm flex flex-col p-4 lg:p-6 gap-5 mx-1 w-[340px] lg:w-3/6">
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
          <Button onClick={checkoutCart}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
