import * as types from './types';

export function loginSuccess(payload: object) {
    return {
        type: types.LOGIN_SUCCESS,
        payload,
    };
}
