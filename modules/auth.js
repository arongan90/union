import axios from "axios";
import Router from "next/router";
import {setCookie, removeCookie, getCookie} from "../utils/cookie";
import * as constants from "../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const IS_LOGIN = "auth/IS_LOGIN";
const IS_LOGOUT = "auth/IS_LOGOUT";
const RESET_TOKEN = "auth/RESET_TOKEN";
const SET_USER_INFO = "auth/SET_USER_INFO";

export const isLogin = loginInfo => async dispatch => {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        // withCredentials: true,
    }
    try {
        const res = await axios.post('https://reqres.in/api/login', {
            email: loginInfo.userId,
            password: loginInfo.password
        });
        const userInfo = await axios.get(`${serverProtocol}${serverURL}/user`);

        if (res.status === 200) {
            dispatch({
                type: IS_LOGIN,
                payload: {
                    token: res.data,
                }
            });
            setCookie('token', res.data);
            await Router.push(`${userInfo.data.corp_name}`);
        } else {
            alert('아이디와 비밀번호가 일치하지 않습니다.');
        }
    } catch (e) {
        throw new Error(e);
    }
}

export const isLogout = () => dispatch => {
    let uri = window.location;
    removeCookie('token');
    dispatch({type: IS_LOGOUT});
    Router.push(uri);
};

export const resetToken = token => dispatch => dispatch({type: RESET_TOKEN, token});

export const setUserInfo = token => async dispatch => {
    let headers = {
        'Authorization': 'Bearer ' + token,
    }

    try {
        const res = await axios.get(`${serverProtocol}${serverURL}/user`);
        dispatch({type: SET_USER_INFO, userInfo: res.data});
    } catch (e) {
        throw new Error(e);
    }
}

const initialState = {
    token: null,
    userInfo: null,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                token: action.payload.token
            };
        case IS_LOGOUT:
            return {
                token: null,
                userInfo: null,
            };
        case RESET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}
