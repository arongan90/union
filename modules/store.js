import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";

import auth from "./auth";
import isMobile from "./isMobile";

const reducer = combineReducers({
    auth: auth,
    isMobile: isMobile
});

const rootReducer = (state, action) => {
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
    return createStore(rootReducer, composeWithDevTools(compose(applyMiddleware(ReduxThunk, logger))));
}

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'dev'
});