import * as types from './types';

export function getUserCartProducts(payload: []) {
    return {
        type: types.GET_USER_CART_PRODUCTS,
        payload,
    }
}

export function addProductToCart(payload: object) {
    return {
        type: types.ADD_PRODUCT_TO_CART,
        payload,
    };
}
