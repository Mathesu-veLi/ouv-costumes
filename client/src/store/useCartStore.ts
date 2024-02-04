import { ICartItem } from '@/interfaces/ICartItem';
import { calculateNumberOfProducts } from '@/utils/calculateNumberOfProducts';
import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import { updateProductQuantity } from '@/utils/updateProductQuantity';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  products: ICartItem[];
  quantityOfProducts: number;
  totalPrice: number;
  addProduct: (newProduct: ICartItem) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  removeProduct: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      totalPrice: 0,
      quantityOfProducts: 0,

      addProduct: (newProduct: ICartItem) =>
        set((state) => {
          const productExists = state.products.find(
            (p) => p.id === newProduct.id,
          );

          let products = state.products;

          if (productExists) {
            products = products.map((product) => {
              if (product.id === productExists.id)
                updateProductQuantity(product, newProduct.quantity);

              return product;
            });
          } else products = [...state.products, newProduct];

          return {
            products,
            totalPrice: calculateTotalPrice(products),
            quantityOfProducts: calculateNumberOfProducts(products),
          };
        }),

      incrementQuantity: (productId: number) =>
        set((state: CartState) => {
          const products = state.products.map((product) => {
            if (product.id === productId && product.quantity < product.stock) updateProductQuantity(product, 1);

            return product;
          });

          return {
            products,
            totalPrice: calculateTotalPrice(products),
            quantityOfProducts: calculateNumberOfProducts(products),
          };
        }),

      decrementQuantity: (productId: number) =>
        set((state: CartState) => {
          const products = state.products.map((product) => {
            if (product.id === productId && product.quantity > 1)
              updateProductQuantity(product, 1, false);

            return product;
          });

          return {
            products,
            totalPrice: calculateTotalPrice(products),
            quantityOfProducts: calculateNumberOfProducts(products),
          };
        }),

      removeProduct: (productId: number) =>
        set((state: CartState) => ({
          products: state.products.filter(
            (product: ICartItem) => product.id !== productId,
          ),
        })),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
