import React, {useEffect} from "react";
import {StylesProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from "next/head";
import MobileDetect from "mobile-detect";
import {isMobile} from "react-device-detect";
import {wrapper} from "../modules/store";
import {mobileVersion, webVersion} from "../modules/isMobile";
import Layout from "../share/Layout/Layout";
import { CookiesProvider } from 'react-cookie';

const MyApp = ({Component, pageProps, mobile, cpInfo}) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
                <title>CATBELL UNION</title>
            </Head>

            <StylesProvider injectFirst>
                <CookiesProvider>
                    <CssBaseline/>
                    {/*<Layout>
                        <Component {...pageProps} mobile={mobile} cpInfo={cpInfo} />
                    </Layout>*/}
                    {cpInfo ?
                        <Layout>
                            <Component {...pageProps} mobile={mobile} cpInfo={cpInfo} />
                        </Layout>
                        :
                        <Component {...pageProps} mobile={mobile} />
                    }
                </CookiesProvider>
            </StylesProvider>

        </>
    );
}

// 모든 해당 컴포넌트를 열때 store 값을 전달하기위한 메서드
MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps;
    let mobile;
    let cpInfo = true;
    const dispatch = ctx.store.dispatch;

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
        cpInfo,
    }
}
;

export default wrapper.withRedux(MyApp);
