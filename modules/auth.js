const IS_LOGIN = "IS_LOGIN";
const IS_LOGOUT = "IS_LOGOUT";

export const isLogin = () => ({ type: IS_LOGIN });
export const isLogout = () => ({ type: IS_LOGOUT });

const initialState = {
    token: null,
    userInfo: null,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                token: action.payload,
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
