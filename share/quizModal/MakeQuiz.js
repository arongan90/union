import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import { TextField } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { lighten, darken } from "polished";
import useInput from "../../hooks/useInput";

const Wrapper = styled.div`
  width: 400px;
  height: 480px;
  border-radius: 10px;
  padding: 20px;
  margin: 10% auto;
  background: ${colors.whiteColor};
`;
const TitleBox = styled.div`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: ${colors.loginPoint};
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 30px;
`;
const Title = styled.span`
  color: ${colors.gray};
`;
const Inputs = styled(TextField)`
  margin-bottom: 15px;
`;
const Button = styled.button`
  width: 49%;
  height: 50px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  color: ${colors.whiteColor};
  font-size: 20px;
  font-weight: bold;
  
  ${({bgColor}) => bgColor && css`
    background: ${bgColor};
    &:hover {
      background: ${lighten(0.1, bgColor)};
    }
    &:active {
      background: ${darken(0.1, bgColor)};
    }
  `};
  
  & + & {
    margin-left: 2%;
  }
`;


const MakeQuiz = ({ socket, handleQuizClose }) => {
    const [{quizNum, quizText, q1, q2}, onChange, onReset] = useInput({
       quizNum: 1,
       quizText: '',
       q1: '',
       q2: '',
    });

    const onMakeQuiz = () => {
        if (quizNum === '' || quizText === '' || q1 === '' || q2 === '') {
            alert('퀴즈 정보를 모두 입력해주세요.');
        } else {
            let quizInfo = {
                quizNum: parseInt(quizNum, 10),
                quizText: quizText,
                q1: q1,
                q2: q2
            }

            console.info(quizInfo);

            handleQuizClose();
            onReset();
        }
    }


    return (
        <Wrapper>
            <TitleBox><HelpIcon fontSize={"large"} />&nbsp;<Title>퀴즈 만들기</Title></TitleBox>
            <Inputs
                id="quizNum"
                name="quizNum"
                onChange={onChange}
                type="number"
                defaultValue="1"
                variant="outlined"
                label="퀴즈번호"
                autoFocus
                required
                fullWidth
            />
            <Inputs
                id="quizText"
                name="quizText"
                onChange={onChange}
                variant="outlined"
                label="퀴즈내용"
                required
                fullWidth
            />
            <Inputs
                id="q1"
                name="q1"
                onChange={onChange}
                variant="outlined"
                label="정답1"
                required
                fullWidth
            />
            <Inputs
                id="q2"
                name="q2"
                onChange={onChange}
                variant="outlined"
                label="정답2"
                required
                fullWidth
            />
            <Button onClick={handleQuizClose} bgColor={colors.loginTabBorder}>취소</Button>
            <Button onClick={onMakeQuiz} bgColor={colors.activeBlue}>제출하기</Button>
        </Wrapper>
    )
}

export default React.memo(MakeQuiz);