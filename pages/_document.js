import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/styles';
import {ServerStyleSheet, createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: auto;
    margin: 0 !important;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  #__next {
    height: 100%;
  }
`;

class _Document extends Document {
    static async getInitialProps(ctx) {
        const styledComponentsSheet = new ServerStyleSheet();
        const materialSheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => styledComponentsSheet.collectStyles(materialSheets.collect(
                    <>
                        <GlobalStyles/>
                        <App {...props}/>
                    </>
                ))
            });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <React.Fragment>
                        {initialProps.styles}
                        {materialSheets.getStyleElement()}
                        {styledComponentsSheet.getStyleElement()}
                    </React.Fragment>
                )
            }
        } finally {
            styledComponentsSheet.seal();
        }
    }

    render() {
        return (
            <Html lang="kr" dir="ltr">
            <Head />
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>);
    }
}

export default _Document;


// import React from "react";
// import Document, {Html, Main, NextScript, Head} from "next/document"; //next 의 html 과 나머지 기타 기능들을 넣어주는 Main 과 NextScript
// import Helmet from "react-helmet"; // head 태그에 넣을 정보를 jsx 로 작성할 수 있게 도와준다.
// import {ServerStyleSheet, createGlobalStyle} from "styled-components";
// import {ServerStyleSheets} from "@material-ui/styles";
//
// // _document.js는 index.html 을 꾸며주는거다라고 생각하면 된다.
// // class 형으로 밖에 못 하는게 조금 아쉽다.
// // ServerStyleSheet 을 사용하여 서버사이드렌더링을 하게 할 수 있다.
// // 전체적으로 css 를 주고 싶은 부분은 createGlobalStyle 을 사용하여 가능하다.
// const GlobalStyles = createGlobalStyle`
//   html, body {
//     height: 100%;
//     overflow: auto;
//     margin: 0 !important;
//     padding: 0;
//   }
//
//   button {
//     cursor: pointer;
//   }
//
//   #__next {
//     height: 100%;
//   }
// `;
//
// class MyDocument extends Document {
//     static async getInitialProps(ctx) {
//         const styledComponentsSheet = new ServerStyleSheet(); // 서버사이드 렌더링 할 수 있게함.
//         const materialSheets = new ServerStyleSheets();
//
//         const page = ctx.renderPage(App => props =>
//             styledComponentsSheet.collectStyles(
//                 materialSheets.collect(
//                     <>
//                         <GlobalStyles/>
//                         <App {...props} />
//                     </>
//                 ))
//         ); // 아래의 스타일들을 모아서 페이지를 그려준다. 원래는 <GlobalStyles/> 없이 하는데 글로벌 스타일을 지정해주기 위해 저렇게 적었다.
//         const styleTags = styledComponentsSheet.getStyleElement();
//         return {
//             ...page,
//             helmet: Helmet.renderStatic(),
//             styleTags
//         };
//     }
//
//     render() {
//         const {htmlAttributes, bodyAttributes, ...helmet} = this.props.helmet; // helmet 으로 부터 받아온다.
//         const htmlAttrs = htmlAttributes.toComponent();
//         const bodyAttrs = bodyAttributes.toComponent();
//         return (
//             // html 이랑 head, body 부분에 각각 props 들을 넣어준다
//             <Html {...htmlAttrs}>
//                 <Head>
//                     {this.props.styleTags}
//                     {Object.values(helmet).map(el => el.toComponent())}
//                 </Head>
//                 <body {...bodyAttrs} onContextMenu={() => {
//                     return false;
//                 }} onDragStart={() => {
//                     return false
//                 }} onSelect={() => {
//                     return false;
//                 }}>
//                     <Main/>
//                     <NextScript/>
//                 </body>
//             </Html>
//         );
//     }
// }
//
// export default MyDocument;
