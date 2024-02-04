import { ICartItem } from '@/interfaces/ICartItem';
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
          let totalPrice = state.products.length
            ? state.products.reduce((sum, product) => sum + product.subTotal, 0)
            : newProduct.subTotal;
          const quantityOfProducts = state.products.reduce(
            (sum, product) => sum + product.quantity,
            0,
          );

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

            return {
              products: productsWithUpdatedProduct,
              totalPrice,
              quantityOfProducts,
            };
          }

          return {
            products: [...state.products, newProduct],
            totalPrice,
            quantityOfProducts,
          };
        }),

      incrementQuantity: (productId: number) =>
        set((state: CartState) => ({
          products: state.products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: product.quantity + 1,
              };
            }

            return product;
          }),
        })),

      decrementQuantity: (productId: number) =>
        set((state: CartState) => ({
          products: state.products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            }

            return product;
          }),
        })),

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
