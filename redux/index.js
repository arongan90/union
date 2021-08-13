import { combineReducers } from "redux";
import { HYDRATE} from "next-redux-wrapper";

import auth from "./auth";
import isMobile from "./isMobile";

const rootReducer = combineReducers({
    auth,
    isMobile
});

// const rootReducer = (state, action) => {
//     switch (action.type) {
//         case HYDRATE:
//             return {
//                 ...state,
//                 ...action.payload
//             }
//         default:
//             return reducers(state, action);
//     }
// }

export default rootReducer;