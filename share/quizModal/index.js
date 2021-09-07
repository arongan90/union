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
  width: 320px;
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
  width: 25%;
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
    const [quizOpen, setQuizOpen] = useState(false);
    const [answerOpen, setAnswerOpen] = useState(false);
    const [statOpen, setStatOpen] = useState(false);
    const [banOpen, setBanOpen] = useState(false);

    const handleQuizOpen = () => setQuizOpen(true);
    const handleAnswerOpen = () => setAnswerOpen(true);
    const handleStatOpen = () => setStatOpen(true);
    const handleBanOpen = () => setBanOpen(true);

    const handleQuizClose = () => setQuizOpen(false);
    const handleAnswerClose = () => setAnswerOpen(false);
    const handleStatClose = () => setStatOpen(false);
    const handleBanClose = () => setBanOpen(false);



    return (
        <Wrapper>
            <Button onClick={handleQuizOpen} borderRight>퀴즈 만들기</Button>
            <Button onClick={handleAnswerOpen} borderRight>정답 입력</Button>
            <Button onClick={handleStatOpen} borderRight>정답 통계</Button>
            <Button onClick={handleBanOpen}>사용자차단</Button>

            <Modal
                open={quizOpen}
                onClose={handleQuizClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <MakeQuiz handleQuizClose={handleQuizClose}/>
                </>
            </Modal>
            <Modal
                open={answerOpen}
                onClose={handleAnswerClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <EnterAnswer handleAnswerClose={handleAnswerClose}/>
                </>
            </Modal>
            <Modal
                open={statOpen}
                onClose={handleStatClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <QuizStats handleStatClose={handleStatClose}/>
                </>
            </Modal>
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