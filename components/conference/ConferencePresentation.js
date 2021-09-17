import React, {useState} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import {Drawer} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import Chat from "../../share/chat/Chat";
import {darken} from "polished";
import QuizModal from "../../share/quizModal";
import dynamic from "next/dynamic";
import Head from "next/head";
import {isMobile} from "react-device-detect";
import {useSelector} from "react-redux";

const JitsiModule = dynamic(() => import(('../../share/JitsiModule/JitsiModule')), {
    ssr: false,
});

const Wrapper = styled.div`
  width: 100%;

  .MuiDrawer-paper {
    z-index: 0;
    padding-top: 60px;
    width: 400px;
  }
`;
const ScreenBox = styled.div`
  width: ${({chatDrawer}) => chatDrawer ? 'calc(100vw - 400px)' : '100vw'};
  height: calc(100vh - 60px);
  position: relative;
  transition: 0.18s;
  background: ${colors.lightBlack};

  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 55vh - 60px);
  }
`;
const ScreenIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const ChatBox = styled(Drawer)`
  width: 400px;
  height: 100%;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const MobileChatBox = styled.div`
  display: none;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 45vh);
    position: relative;
    display: block;
  }
`;
const ChatTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  color: ${colors.lightBlack};
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.inputBorder};
`;
const ToggleChat = styled.div`
  width: 34px;
  height: 34px;
  margin-right: 15px;
  border-radius: 50%;
  border: 1px solid ${colors.inputBorder};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${colors.whiteColor};

  &:hover {
    background: ${darken(0.1, colors.whiteColor)};
  }

  ${({chatDrawer}) => chatDrawer && css`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
  `}
`;

const ConferencePresentation = () => {
    const [chatDrawer, setChatDrawer] = useState(true);
    const openChat = () => setChatDrawer(true);
    const closeChat = () => setChatDrawer(false);

    const { userInfo } = useSelector(state => state.auth);

    return (
        <>
            <Head>
                <script async src="https://meet.jit.si/external_api.js"/>
            </Head>

            <Wrapper>
                <ScreenBox chatDrawer={chatDrawer}>
                    {!chatDrawer &&
                    <ToggleChat onClick={openChat} chatDrawer={!chatDrawer}>
                        <ChevronLeft/>
                    </ToggleChat>}
                    <QuizModal />
                    <JitsiModule
                        roomName={'conference1'}
                        displayName={userInfo ? userInfo.nickname : '비회원'}
                        onMeetingEnd={() => console.log('Meeting has ended')}
                        loadingComponent={<p>loading ...</p>}
                        errorComponent={<p>에러가 발생했습니다. 관리자에게 문의해주세요</p>}
                        options={{
                            configOverwrite: {defaultLanguage: 'jp'}
                        }}
                    />
                    {/*<ScreenIframe
                        src={`https://meet.healingt.catbell.xyz/conference`}
                        frameBorder="0"
                        allow="camera; microphone; fullscreen; display-capture"
                        allowFullScreen
                    />*/}
                </ScreenBox>

                {/* Web */}
                <ChatBox anchor="right" open={chatDrawer} variant="persistent">
                    <ChatTitle>
                        <ToggleChat onClick={closeChat}>
                            {chatDrawer ? <ChevronRight/> : <ChevronLeft/>}
                        </ToggleChat>
                        실시간 채팅
                    </ChatTitle>
                    <Chat height={"calc(100vh - 110px)"} />
                </ChatBox>

                {/* Mobile */}
                <MobileChatBox>
                    <Chat height={"100%"}/>
                </MobileChatBox>
            </Wrapper>
        </>
    )
}

export default ConferencePresentation;