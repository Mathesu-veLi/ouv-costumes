import { ICartItem } from '@/interfaces/ICartItem';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  products: ICartItem[];
  addProduct: (product: ICartItem) => void;
  removeProduct: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (product: ICartItem) =>
        set((state) => {
          const productExists = state.products.find((p) => p.id === product.id);

          if (productExists) {
            const updatedProducts = state.products.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + product.quantity }
                : p,
            );

            return { products: updatedProducts };
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
