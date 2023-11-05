import * as types from './types';

const initialState = {
    user: {},
    token: '',
    isLoggedIn: false,
};

const userReducer = (
    state = initialState,
    action: { type: string; payload: { user: object; accessToken: string } },
) => {
    const actionPayload = action.payload;

    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            const newState = { ...state };
            newState.user = actionPayload.user;
            newState.token = actionPayload.accessToken;
            newState.isLoggedIn = true;
            return newState;
        }
        default:
            return state;
    }
};

export default userReducer;
