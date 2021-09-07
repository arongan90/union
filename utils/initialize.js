import Router from 'next/router';
import { getCookie } from './cookie';
import {resetToken, setUserInfo} from "../modules/auth";

// 페이지가 서버에 로드되고 있는지 확인하고, 쿠키에서 인증 토큰을 가져옵니다.
export default function initialize(ctx) {
    //서버사이드 렌더링으로 돌고 있다면 쿠키에 값을 넣어준다.
    if (typeof window === 'undefined') {
        console.info('SererSide Rendering...');
        if (ctx.req.headers.cookie) {
            ctx.store.dispatch(resetToken(getCookie('token', ctx.req)));
        }
    } else {
        console.info('ClientSide Rendering...');
        const token = ctx.store.getState().auth.token;

        // 토큰과 함께 signin 페이지 || signup 페이지에서 처리 진행을 하였다면 Router 로 페이지로 이동
        if (token && (ctx.pathname === '/signin' || ctx.pathname === '/signup')) {
            setTimeout(function() {
                Router.push('/');
            }, 0);
        }
    }
}