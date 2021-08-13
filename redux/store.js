import {applyMiddleware, compose, createStore} from "redux";
import {createWrapper} from "next-redux-wrapper";
import ReduxThunk from 'redux-thunk';
import logger, {createLogger} from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./index";

const makeStore = () => {
    console.info("111111111");
    const logger = createLogger();
    const enhancer = composeWithDevTools(compose(applyMiddleware(ReduxThunk, logger)));
    return createStore(rootReducer, enhancer);
}

export const wrapper = createWrapper(makeStore, {debug: process.env.NODE_ENV === 'dev'});