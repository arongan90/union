import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {Drawer} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import {lighten, darken} from "polished";
import colors from "../../styles/colors";
import Chat from "../../share/chat/Chat";
import QuizModal from "../../share/quizModal";
import {useSelector} from "react-redux";
// import ResizePanel from "react-resize-panel";

const Wrapper = styled.div`
  width: 100%;

  .MuiDrawer-paper {
    z-index: 0;
    padding-top: 60px;
    width: 400px;
  }

  @media screen and (max-width: 768px) {
    .MuiDrawer-paper {
      width: 250px;
    }
  }
`;
const ScreenBox = styled.div`
  width: ${({chatDrawer}) => chatDrawer ? 'calc(100vw - 400px)' : '100vw'};
  height: calc(100vh - 60px);
  position: relative;
  transition: 0.18s;
  background: ${colors.lightBlack};

  // @media screen and (max-width: 768px) {
  //   width: ${({chatDrawer}) => chatDrawer ? 'calc(100vw - 200px)' : '100vw'};
  // }
  
  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 55vh - 60px);
  }
`;
const ScreenIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;
const ChatBox = styled(Drawer)`
  max-width: 200px;
  height: 100%;

  //@media screen and (max-width: 768px) {
  //  max-width: 200px;
  //}
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const MobileChatBox = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
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
  padding: 0 10px;
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

const LivePresentational = ({ chatDrawer, openChat, closeChat }) => {
    return (
        <Wrapper>
            <ScreenBox chatDrawer={chatDrawer}>
                {!chatDrawer &&
                <ToggleChat onClick={openChat} chatDrawer={!chatDrawer}>
                    <ChevronLeft/>
                </ToggleChat>}
                <QuizModal/>
                <ScreenIframe
                    src={`https://vimeo.com/event/605039/embed?autoplay=1&title=0&byline=0&portrait=0&playsinline=1`}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                />
            </ScreenBox>

            {/* Web */}
            <ChatBox anchor="right" open={chatDrawer} variant="persistent">
                <ChatTitle>
                    <ToggleChat onClick={closeChat}>
                        {chatDrawer ? <ChevronRight/> : <ChevronLeft/>}
                    </ToggleChat>
                    실시간 채팅
                </ChatTitle>
                <Chat height={"calc(100vh - 110px)"}/>
            </ChatBox>

            {/* Mobile */}
            <MobileChatBox>
                <Chat height={"100%"}/>
            </MobileChatBox>
        </Wrapper>
    )
}

export default LivePresentational;