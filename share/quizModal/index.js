import React, {useState} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import {lighten, darken} from "polished";
import {Modal} from "@material-ui/core";
import BanUser from "./BanUser.,js";
import * as constants from "../../utils/constants";
import {useSelector} from "react-redux";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const Wrapper = styled.div`
  width: 200px;
  height: 36px;
  border-radius: 20px;
  position: absolute;
  z-index: 5;
  top: 20px;
  left: 20px;
  overflow: hidden;
  background: ${colors.gray};
  
  @media screen and (max-width: 767px) {
    width: 160px;
    height: 30px;
    top: 5px;
    left: 5px;
    background: rgba(69, 80, 88, 0.4);
  }
`;
const Button = styled.button`
  width: 50%;
  height: 100%;
  background: inherit;
  border: none;
  color: ${colors.whiteColor};
  text-align: center;

  @media screen and (max-width: 767px) {
    font-size: 11px;
  }

  &:hover {
    background: ${lighten(0.05, colors.gray)};
    font-weight: bold;
  }

  &:active {
    background: ${darken(0.05, colors.gray)};
  }

  ${({borderRight}) => borderRight && css`
    border-right: 1px solid ${darken(0.1, colors.gray)};
  `}
`;

const Index = () => {
    const [banOpen, setBanOpen] = useState(false);
    const {corpInfo} = useSelector(state => state);

    const handleBanOpen = () => setBanOpen(true);
    const handleBanClose = () => setBanOpen(false);

    const openLiveChat = () => {
        window.open(`${serverProtocol}172.16.1.192:3000/${corpInfo.corp_name}/livechat`, "실시간 채팅", "width=400, height=600, left=500, top=100, _blank");
    }

    return (
        <Wrapper>
            <Button onClick={openLiveChat} borderRight>실시간 채팅</Button>
            <Button onClick={handleBanOpen}>사용자차단</Button>

            <Modal
                open={banOpen}
                onClose={handleBanClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <BanUser handleBanClose={handleBanClose}/>
                </>
            </Modal>
        </Wrapper>
    )
}

export default Index;