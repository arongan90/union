import React, {useEffect} from "react";
import {StylesProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from "next/head";
import MobileDetect from "mobile-detect";
import {isMobile} from "react-device-detect";
import { wrapper } from "../redux/store";

const  MyApp = ({Component, pageProps}) => {
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
                <CssBaseline/>
                <Component {...pageProps} />
            </StylesProvider>

        </>
    );
}

// 모든 해당 컴포넌트를 열때 store 값을 전달하기위한 메서드
MyApp.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {};
    let mobile;
    // const dispatch = ctx.store.dispatch;

    console.info(' ctx.store :::', ctx.store);

    if (ctx.req) {
        const md = new MobileDetect(ctx.req.headers["user-agent"]);
        // dispatch(flexible(mobile));
        mobile = !!md.mobile();
    } else {
        mobile = isMobile;
    }

    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {}
      //   pageProps = {
      //       ...(Component.getInitialProps ? await  Component.getInitialProps(ctx) : {}),
      //       pathname: ctx.pathname
      //   }
    }

    return {
        pageProps,
        mobile,
    }
};

export default wrapper.withRedux(MyApp);
