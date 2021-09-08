import React, { useState } from 'react';
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import { lighten, darken } from "polished";
import { Modal } from "@material-ui/core";
import MakeQuiz from "./MakeQuiz";
import EnterAnswer from "./EnterAnswer";
import QuizStats from "./QuizStats";
import BanUser from "./BanUser.,js";

const Wrapper = styled.div`
  width: 200px;
  height: 36px;
  border-radius: 20px;
  position: absolute;
  z-index: 100;
  top: 20px;
  left: 20px;
  overflow: hidden;
  background: ${colors.gray};
`;
const Button = styled.button`
  width: 50%;
  height: 100%;
  background: inherit;
  border: none;
  color: ${colors.whiteColor};
  text-align: center;
  
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

    const handleBanOpen = () => setBanOpen(true);
    const handleBanClose = () => setBanOpen(false);

    const openLiveChat = () => {
        window.open(`http://localhost:3000/odeng/livechat`, "실시간 채팅", "_blank");
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