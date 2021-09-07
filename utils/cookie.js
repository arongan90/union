import {Cookies} from "react-cookie";
import axios from "axios";
import cookies from "next-cookies";

const cookie = new Cookies();

export const setCookie = (name, value, option) => {
    const expires = new Date();
    expires.setDate(Date.now() + 24 * 60 * 60 * 1000);

    if (process.browser) {
        return cookie.set(name, value, {
            path: '/',
            expires,
            ...option
        });
    }
}

export const getCookie = (name, req) => {
    return process.browser
        ? getCookieFromBrowser(name)
        : getCookieFromServer(name, req);
}

export const removeCookie = name => {
    if (process.browser) {
        cookie.remove(name, {
            expires: 1
        });
    }
}

const getCookieFromBrowser = name => cookie.get(name);
const getCookieFromServer = (name, req) => {
    if (!req.headers.cookie) return undefined;
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${name}=`));
    if (!rawCookie) return undefined;

    return rawCookie.split('=')[1];
}