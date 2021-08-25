import React from 'react';
import styled from "styled-components";
import TopLink from "../components/CorpMain/TopLink";
import MainVideo from "../components/CorpMain/MainVideo";
import UploadVideo from "../components/CorpMain/UploadVideo";
import MainLinkBinder from "../components/CorpMain/MainLinkBinder";
import Footer from "../components/Footer";

const MainWrap = styled.div`
  padding: 85px 0;
   background: #F3F5F7;
`;

const Corp = () => {
    return (
        <MainWrap>
            <TopLink />
            <MainVideo />
            <UploadVideo />
            <MainLinkBinder />
            <Footer />
        </MainWrap>
    )
}

Corp.getInitialProps = async (ctx) => {
    const store = ctx.store.getState();
    console.info('CTX ::: ', store);
}

export default Corp;