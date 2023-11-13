import * as types from './types';

export function getUserCartProducts(payload: []) {
    return {
        type: types.GET_USER_CART_PRODUCTS,
        payload,
    }
}
