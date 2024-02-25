import { ICartItem } from '@/interfaces/ICartItem';

export function calculateTotalPrice(products: ICartItem[]): number {
  return products.reduce((total, product) => total + product.subTotal, 0);
}
