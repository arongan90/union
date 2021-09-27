import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import auth from "./auth";
import isMobile from "./isMobile";
import chat from "./chat";
import corpInfo from "./corpInfo";

const hydrated = Symbol('hydrated');
const composeHydrateReducer = (reducerName, reducer) => (state, action) => {
    const reducers = action.payload;
    const newState = reducers && reducers[reducerName];

    if (action.type === HYDRATE) {
        if (newState[hydrated] !== true) {
            if (typeof window !== 'undefined') {
                Object.assign(newState, {[hydrated]: true});
            }
            return {
                ...state,
                ...newState,
            }
        }
    }
    return reducer(state, action);
}

const composeHydrateReducers = (reducers) => {
    const ret = {};
    Object.keys(reducers).forEach(name => {
        const reducer = reducers[name];
        ret[name] = composeHydrateReducer(name, reducer);
    });
    return ret;
}

const reducer = combineReducers(composeHydrateReducers({
    auth,
    isMobile,
     chat,
    corpInfo
}));

// const reducer = combineReducers({
//     auth: auth,
//     isMobile: isMobile,
//     chat: chat,
//     corpInfo: corpInfo
// });

const reducerWithHydrate = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return reducer(state, action);
    }
}

const makeStore = () => {
    return createStore(reducer, composeWithDevTools(compose(applyMiddleware(ReduxThunk))));
}

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'dev'
});
