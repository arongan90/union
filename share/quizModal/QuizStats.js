import React, { useState } from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {darken, lighten} from "polished";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Wrapper = styled.div`
  width: 400px;
  height: 380px;
  border-radius: 10px;
  padding: 20px;
  margin: 10% auto;
  text-align: center;
  background: ${colors.whiteColor};
`;
const TitleBox = styled.div`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: ${colors.loginPoint};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 30px;
`;
const IconBox = styled.div`
  width: 35px;
  height: 35px;
  line-height: 1.5;
  color: ${colors.whiteColor};
  border-radius: 50%;
  background: ${colors.loginPoint};
`;
const Title = styled.span`
  color: ${colors.gray};
  margin-left: 10px;
`;
const StatsBox = styled.div`
  width: 70%;
  margin: 10px auto 25px;
  font-size: 18px;
  color: ${colors.lightBlack};
  text-align: left;
`;
const Selector = styled.select`
  height: 30px;
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.lightBlack};
  position: relative;
  border-bottom: 2px solid ${colors.lightGray};
  cursor: pointer;
`;
const InfoBox = styled.div`
  font-size: 17px;
  color: ${colors.normalBlack};
  margin-top: 20px;
`;
const Button = styled.button`
  width: 50%;
  height: 50px;
  margin: 0 auto;
  border: none;
  border-radius: 5px;
  color: ${colors.whiteColor};
  font-size: 20px;
  font-weight: bold;
  background: ${colors.activeBlue};

  &:hover {
    background: ${lighten(0.1, colors.activeBlue)};
  }

  &:active {
    background: ${darken(0.1, colors.activeBlue)};
  }
`;

const QuizStats = ({ handleStatClose }) => {
    const [quizNum, setQuizNum] = useState(undefined);
    const quizNumSelect = e => setQuizNum(e.target.value);
    return (
        <Wrapper>
            <TitleBox><IconBox><EqualizerIcon/></IconBox><Title>정답 통계</Title></TitleBox>
            <StatsBox>
                <Selector
                    onChange={quizNumSelect}
                >
                    <option value={1}>1번 문제</option>
                    <option value={2}>2번 문제</option>
                    <option value={3}>3번 문제</option>
                </Selector>
                <InfoBox>응답자 통계 총 : </InfoBox>
                <InfoBox>1번 선택자 : </InfoBox>
                <InfoBox>2번 선택자 : </InfoBox>
            </StatsBox>
            <Button onClick={handleStatClose}>확 인</Button>
        </Wrapper>
    )
}

export default QuizStats;
