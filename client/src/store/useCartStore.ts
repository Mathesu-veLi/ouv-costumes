import { ICartItem } from '@/interfaces/ICartItem';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  products: ICartItem[];
  totalPrice: number;
  addProduct: (newProduct: ICartItem) => void;
  removeProduct: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      totalPrice: 0,

      addProduct: (newProduct: ICartItem) =>
        set((state) => {
          const productExists = state.products.find(
            (p) => p.id === newProduct.id,
          );
          let totalPrice = state.products.length
            ? state.products.reduce((sum, product) => sum + product.subTotal, 0)
            : newProduct.subTotal;

          if (productExists) {
            const productsWithUpdatedProduct = state.products.map((product) => {
              if (product.id === productExists.id) {
                const updatedProduct = {
                  ...product,
                  quantity: product.quantity + newProduct.quantity,
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

          return { products: [...state.products, newProduct], totalPrice };
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
