import Router from "next/router";

const IS_LOGIN = "IS_LOGIN";
const IS_LOGOUT = "IS_LOGOUT";

export const isLogin = loginInfo => dispatch => {
    try {
        dispatch({type: IS_LOGIN, payload: { loginInfo: loginInfo}});
        Router.push(`/`);
    } catch (e) {
        console.info('isLogin Error: ', e);
    }
}
export const isLogout = () => async dispatch => ({ type: IS_LOGOUT });

const initialState = {
    token: null,
    userInfo: null,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                userInfo: action.payload.loginInfo,
                token: 'token'
            };
        case IS_LOGOUT:
            return {
                token: null,
                userInfo: null,
            };
        default:
            return state;
    }
}
