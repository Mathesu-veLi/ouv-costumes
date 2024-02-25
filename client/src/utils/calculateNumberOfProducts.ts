import { ICartItem } from '@/interfaces/ICartItem';

export function calculateNumberOfProducts(products: ICartItem[]): number {
  return products.reduce((total, product) => total + product.quantity, 0);
}
