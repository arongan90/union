import React from 'react';
import styled from "styled-components";
import TopLink from "../components/corpMain/TopLink";
import MainVideo from "../components/corpMain/MainVideo";
import UploadVideo from "../components/corpMain/UploadVideo";
import MainLinkBinder from "../components/corpMain/MainLinkBinder";
import Footer from "../components/Footer";
import colors from "../styles/colors";
import initialize from "../utils/initialize";

const MainWrapper = styled.div`
  padding: 25px 0;
  background: ${colors.tabMenu};
`;

const Corp = ({ corpInfo }) => {
    const { corp_name } = corpInfo;
    return (
        <MainWrapper>
            <TopLink
                corpName={corp_name}
            />
            <MainVideo/>
            <UploadVideo/>
            <MainLinkBinder/>
            <Footer/>
        </MainWrapper>
    )
}

Corp.getInitialProps = async (ctx) => {
    initialize(ctx);
}

export default Corp;