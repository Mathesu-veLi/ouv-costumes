import * as types from './types';

interface Product {
    products?: [];
    userId: number;
    id: number;
    name: string;
    price: number;
    imagePath: string;
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
        default:
            return state;
    }
}
