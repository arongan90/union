import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import {createWrapper} from "next-redux-wrapper";
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";

import auth from "./auth";
import isMobile from "./isMobile";

const rootReducer = combineReducers({
    auth,
    isMobile
});

const makeStore = () => {
    return createStore(rootReducer, composeWithDevTools(compose(applyMiddleware(ReduxThunk, logger))));
}

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'dev'
});