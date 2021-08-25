import React, {useEffect, useState} from 'react';
import styled, { css } from "styled-components";
import { Drawer } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { lighten, darken } from "polished";
import colors from "../../styles/colors";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  .MuiDrawer-paper {
    z-index: 0;
    padding-top: 60px;
    width: 400px;
  }
`;
const ScreenBox = styled.div`
  width: 100%;
  height: 100vh;
  background: #006600;
`;
const ChatBox = styled(Drawer)`
  width: 400px;
`;
const ChatTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 22px;
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
    top: 70px;
    right: 10px;
  `}
`;

const LivePresentational = () => {
    const [chatDrawer, setChatDrawer] = useState(true);
    const openChat = () => setChatDrawer(true);
    const closeChat = () => setChatDrawer(false);

    useEffect(() => {
        console.info('바뀔때 마다 ::: ', !chatDrawer);
    }, [chatDrawer]);

    return (
        <Wrap>
            <ScreenBox>
                {!chatDrawer &&
                    <ToggleChat onClick={openChat} chatDrawer={!chatDrawer}>
                        <ChevronLeft />
                    </ToggleChat>}
            </ScreenBox>
            <ChatBox anchor="right" open={chatDrawer} variant="persistent">
                <ChatTitle>
                    <ToggleChat onClick={closeChat}>
                        {chatDrawer ? <ChevronRight/> : <ChevronLeft />}
                    </ToggleChat>
                    실시간 채팅
                </ChatTitle>
            </ChatBox>
        </Wrap>
    )
}

export default LivePresentational;