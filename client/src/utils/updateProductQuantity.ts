import { ICartItem } from '@/interfaces/ICartItem';

export function updateProductQuantity(
  product: ICartItem,
  quantityToChange: number,
  add = true,
) {
  if (add) {
    product.quantity += quantityToChange;
  } else {
    product.quantity -= quantityToChange;
  }
  product.subTotal = product.price * product.quantity;
}
