import * as types from './types';

interface Product {
    products?: [];
    userId: number;
    id: number;
    quantity: number;
}

const initialState: {
    products: Array<Product>;
    productsTotalPrice: number;
} = {
    products: [],
    productsTotalPrice: 0,
};

export default function cartReducer(
    state = initialState,
    action: { type: string; payload: Product },
) {
    switch (action.type) {
        case types.GET_USER_CART_PRODUCTS: {
            console.log(action.payload);
            return {
                ...state,
                products: action.payload.products,
            };
        }
        case types.ADD_PRODUCT_TO_CART: {
            const productAlreadyInCart = state.products.some(
                (product) => product.id === action.payload.id,
            );
            if (productAlreadyInCart) {
                return {
                    ...state,
                    products: state.products.map((product) => {
                        if (product.id === action.payload.id) {
                            return {
                                ...product,
                                quantity:
                                    product.quantity + action.payload.quantity,
                            };
                        }
                        return product;
                    }),
                };
            }
            return {
                ...state,
                products: [...state.products, { ...action.payload }],
            };
        }
        default:
            return state;
    }
}
