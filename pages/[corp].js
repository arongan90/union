import React, {useState} from 'react';
import styled, {css} from "styled-components";
import TopLink from "../components/corpMain/TopLink";
import MainVideo from "../components/corpMain/MainVideo";
import UploadVideo from "../components/corpMain/UploadVideo";
import MainLinkBinder from "../components/corpMain/MainLinkBinder";
import Footer from "../components/Footer";
import colors from "../styles/colors";
import initialize from "../utils/initialize";
import * as constants from "../utils/constants";
import axios from "axios";
import Board from "../share/components/Board";
import plusSvg from "/public/images/share/plus.svg";
import minusSvg from "/public/images/share/minusIcon.svg";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const MainWrapper = styled.div`
  padding: 25px 0 0;
  background: ${colors.whiteColor};

  @media screen and (max-width: 767px) {
    padding: 25px 10px 0;
  }
`;
const IntroductionBox = styled.div`
  max-width: 530px;
  margin: 10px auto;
  padding: 15px 10px;
  background: ${colors.whiteColor};
  border: 1px solid ${colors.corpMainBorder};
  box-shadow: 0 0 10px ${colors.ultraLightGray};
`;
const Introduction = styled.div`
  min-height: 90px;
  padding: 10px;
  font-size: 16px;
  color: ${colors.normalBlack};
  border-top: 1px solid ${colors.loginTabBorder};
  border-bottom: 1px solid ${colors.loginTabBorder};
`;
const MainBoardBox = styled.div`
  max-width: 530px;
  overflow: hidden;
  margin: 10px auto;
  border: 1px solid ${colors.corpMainBorder};
  box-shadow: 0 0 10px ${colors.ultraLightGray};
  padding: 10px;
`;

const BoardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.chatDefaultColor};
`;
const MoreButton = styled.div`
  font-size: 14px;
  color: ${colors.loginDefaultFont};
  margin: 28px 0 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlusImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Corp = ({corpInfo, mainView, videoList, linkBinderList, userInfo, settingBoardData}) => {
    const {corp_name} = corpInfo;

    const [toggleClicked, setToggleClicked] = useState(false);
    const [boardMoreView, setBoardMoreView] = useState(false);

    const toggleVisible = id => {
        if (toggleClicked === id) return setToggleClicked(null);
        setToggleClicked(id);
    }

    const toggleMoreView = () => setBoardMoreView(!boardMoreView);

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

            <MainBoardBox>
                <BoardTitle>게시판</BoardTitle>
                <Board
                    userInfo={userInfo}
                    boardData={settingBoardData}
                    toggleClicked={toggleClicked}
                    toggleVisible={toggleVisible}
                    boardMoreView={boardMoreView}
                    toggleMoreView={toggleMoreView}
                    mainComponent
                />

                <MoreButton onClick={toggleMoreView}>더보기
                    {boardMoreView ? <PlusImage src={minusSvg} /> : <PlusImage src={plusSvg}/>}
                </MoreButton>
            </MainBoardBox>

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
    const res = await axios.get(`${serverProtocol}${serverURL}/boardSetting`);

    return {
        mainView: mainRes.data,
        videoList: videoRes.data,
        linkBinderList: linkRes.data,
        settingBoardData: res.data,
    }

}

export default Corp;