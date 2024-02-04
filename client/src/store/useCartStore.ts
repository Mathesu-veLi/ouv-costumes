import { ICartItem } from '@/interfaces/ICartItem';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  products: ICartItem[];
  totalPrice: number;
  addProduct: (product: ICartItem) => void;
  removeProduct: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      totalPrice: 0,

      addProduct: (product: ICartItem) =>
        set((state) => {
          const productExists = state.products.find((p) => p.id === product.id);
          let totalPrice = state.products.reduce(
            (sum, product) => sum + product.subTotal,
            0,
          );

          if (productExists) {
            const productsWithUpdatedProduct = state.products.map((product) => {
              if (product.id === product.id) {
                const updatedProduct = {
                  ...product,
                  quantity: product.quantity + product.quantity,
                };
                updatedProduct.subTotal =
                  updatedProduct.price * updatedProduct.quantity;

                return updatedProduct;
              }

              return product;
            });

            totalPrice = productsWithUpdatedProduct.reduce(
              (sum, product) => sum + product.subTotal,
              0,
            );

            return { products: productsWithUpdatedProduct, totalPrice };
          }

          return { products: [...state.products, product] };
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
