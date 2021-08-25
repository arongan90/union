const MOBILE_VERSION = "isMobile/IS_MOBILE";
const WEB_VERSION = "isMobile/IS_WEB";

export const mobileVersion = (mobile) => ({type: MOBILE_VERSION, mobile});
export const webVersion = (mobile) => ({type: WEB_VERSION, mobile});

const initialState = {
    isMobile: false,
}

export default function isMobileReducer(state = initialState, action) {
    switch (action.type) {
        case MOBILE_VERSION:
            return {
                isMobile: action.mobile,
            }
        case WEB_VERSION:
            return {
                isMobile: action.mobile,
            }
        default:
            return state;
    }
}