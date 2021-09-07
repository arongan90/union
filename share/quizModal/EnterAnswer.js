import React, {useState} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import {TextField} from "@material-ui/core";
import {darken, lighten} from "polished";
import useInput from "../../hooks/useInput";
import ErrorIcon from '@material-ui/icons/Error';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const Wrapper = styled.div`
  width: 400px;
  height: 380px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 30px;
`;
const Title = styled.span`
  color: ${colors.gray};
`;
const RadioBox = styled(RadioGroup)`
  margin: 30px 0;

  .MuiFormGroup-root {
    flex-direction: row;
    justify-content: space-around;
  }

  .MuiRadio-colorSecondary.Mui-checked {
    color: ${colors.activeBlue};
  }
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

const EnterAnswer = ({socket, handleAnswerClose}) => {
    const [{quizNum}, onChange, onReset] = useInput({
        quizNum: 1,
    });
    const [answer, setAnswer] = useState('');
    const handleChange = e => {
        setAnswer(e.target.value);
    };
    const onSubmit = () => {
        if (answer === '') {
            alert('정답을 선택해주세요.');
        } else {
            let answerData = {
                quizNum: parseInt(quizNum, 10),
                answer: answer
            }
            console.info(answerData);
            handleAnswerClose();
        }
    }
    return (
        <Wrapper>
            <TitleBox><ErrorIcon fontSize={"large"}/>&nbsp;<Title>정답 입력</Title></TitleBox>
            <TextField
                id="quizNum"
                name="quizNum"
                onChange={onChange}
                type="number"
                defaultValue="1"
                variant="outlined"
                label="퀴즈번호"
                margin="normal"
                autoFocus
                required
                fullWidth
            />
            <RadioBox>
                <RadioGroup onChange={handleChange} value={answer} name="answer">
                    <FormControlLabel value="1" control={<Radio/>} label="1번"/>
                    <FormControlLabel value="2" control={<Radio/>} label="2번"/>
                    <FormControlLabel value="3" control={<Radio/>} label="둘 다"/>
                </RadioGroup>
            </RadioBox>
            <Button onClick={handleAnswerClose} bgColor={colors.loginTabBorder}>취소</Button>
            <Button onClick={onSubmit} bgColor={colors.activeBlue}>제출하기</Button>
        </Wrapper>
    )
}

export default EnterAnswer;