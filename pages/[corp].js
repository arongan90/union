import React from 'react';
import styled from "styled-components";
import TopLink from "../components/corpMain/TopLink";
import MainVideo from "../components/corpMain/MainVideo";
import UploadVideo from "../components/corpMain/UploadVideo";
import MainLinkBinder from "../components/corpMain/MainLinkBinder";
import Footer from "../components/Footer";
import colors from "../styles/colors";
import initialize from "../utils/initialize";
import * as constants from "../utils/constants";
import axios from "axios";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const MainWrapper = styled.div`
  padding: 25px 0;
  background: ${colors.tabMenu};
`;
const IntroductionBox = styled.div`
  max-width: 530px;
  margin: 10px auto;
  padding: 15px 10px;
  background: ${colors.whiteColor};
  box-shadow: 0 0 8px ${colors.shadowColor};
`;
const Introduction = styled.div`
  min-height: 90px;
  padding: 10px;
  font-size: 16px;
  color: ${colors.normalBlack};
  border-top: 1px solid ${colors.loginTabBorder};
  border-bottom: 1px solid ${colors.loginTabBorder};
`;

const Corp = ({ corpInfo, mainView, videoList, linkBinderList }) => {
    const { corp_name } = corpInfo;
    return (
        <MainWrapper>
            <TopLink
                corpName={corp_name}
            />
            <MainVideo
                mainView={mainView}
            />
            <IntroductionBox>
                <Introduction>
                    {corpInfo.introduction}
                </Introduction>
            </IntroductionBox>
            <UploadVideo
                videoList={videoList}
            />
            <MainLinkBinder
                linkBinderList={linkBinderList}
            />
            <Footer/>
        </MainWrapper>
    )
}

Corp.getInitialProps = async (ctx) => {
    initialize(ctx);



    const mainRes = await axios.get(`${serverProtocol}${serverURL}/mainSetting`);
    const videoRes = await axios.get(`${serverProtocol}${serverURL}/videoLink`);
    const linkRes = await axios.get(`${serverProtocol}${serverURL}/linkbinder`);

    return {
        mainView: mainRes.data,
        videoList: videoRes.data,
        linkBinderList: linkRes.data,
    }

}

export default Corp;