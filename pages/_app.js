import React, {useEffect} from "react";
import {StylesProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from "next/head";
import MobileDetect from "mobile-detect";
import {isMobile} from "react-device-detect";
import {wrapper} from "../modules/store";
import {mobileVersion, webVersion} from "../modules/isMobile";
import Layout from "../share/layout/Layout";
import {CookiesProvider} from 'react-cookie';
import '../resources/css/floatingHeart.css';
import styled from "styled-components";
import initialize from "../utils/initialize";
import {setUserInfo} from "../modules/auth";
import {removeCookie} from "../utils/cookie";
import axios from "axios";
import {setCorp} from "../modules/corpInfo";
import {ToastContainer} from "react-toastify";
import * as constants from "../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const ComponentWrapper = styled.div`
  padding-top: 60px;
`;

const MyApp = ({Component, pageProps, mobile, userInfo, corpInfo}) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

        // return () => removeCookie('token');
    }, []);

    const stopScrolling = (e) => e.preventDefault();
    useEffect(() => {
        document.addEventListener('touchstart', stopScrolling, false);
        document.addEventListener('touchmove', stopScrolling, false);
    }, []);


    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="minimum-scale=1.0, initial-scale=1.0, width=device-width, shrink-to-fit=no, maximum-scale=1, user-scalable=no"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"/>
            </Head>

            <CookiesProvider>
                <StylesProvider injectFirst>
                    <CssBaseline/>
                    {corpInfo ?
                        <Layout>
                            <ComponentWrapper>
                                <Component
                                    {...pageProps}
                                    isMobile={mobile}
                                    userInfo={userInfo}
                                    corpInfo={corpInfo}
                                />
                            </ComponentWrapper>
                            <ToastContainer autoClose={3000}/>
                        </Layout>
                        :
                        <Component {...pageProps} isMobile={mobile}/>
                    }
                </StylesProvider>
            </CookiesProvider>

        </>
    );
}

// 모든 해당 컴포넌트를 열때 store 값을 전달하기위한 메서드
MyApp.getInitialProps = async ({Component, ctx}) => {
    initialize(ctx);

    const dispatch = ctx.store.dispatch;
    const token = ctx.store.getState().auth.token;
    let corpInfo;
    let pageProps;
    let mobile;

    if (!!token) await dispatch(setUserInfo(token));

    const userInfo = ctx.store.getState().auth.userInfo;

    if (!!ctx.query.corp || ctx.query.linkbinder) {
        let res = await axios.get(`${serverProtocol}${serverURL}/cpInfo`);
        corpInfo = res.data;
        dispatch(setCorp(corpInfo));
    }
    if (ctx.req) {
        const md = new MobileDetect(ctx.req.headers["user-agent"]);
        mobile = !!md.mobile();
        dispatch(mobileVersion(mobile));
    } else {
        mobile = isMobile;
        dispatch(webVersion(mobile));
    }

    if (Component.getInitialProps) {
        pageProps = (await Component.getInitialProps(ctx)) || {}
    }

    return {
        pageProps,
        mobile,
        userInfo,
        corpInfo,
    }
}


export default wrapper.withRedux(MyApp);
