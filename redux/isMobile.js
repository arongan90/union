const IS_MOBILE = "isMobile/IS_MOBILE";

export const flexible = (mobile) => ({type: IS_MOBILE, mobile});

const initialState = {
    isMobile: false,
}

export default function isMobileReducer(state = initialState, action) {
    switch (action.type) {
        case IS_MOBILE:
            return {
                isMobile: action.mobile,
            }
        default:
            return state;
    }
}