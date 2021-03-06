import React, {useState} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Block from '@material-ui/icons/Block';
import {TextField} from "@material-ui/core";
import useInput from "../../hooks/useInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import {darken, lighten} from "polished";
import {banUser} from "../../modules/chat";

const Wrapper = styled.div`
  max-width: 400px;
  height: 380px;
  border-radius: 10px;
  padding: 20px;
  margin: 10% auto;
  background: ${colors.whiteColor};
  
  @media screen and (max-width: 767px) {
    max-width: 95%;
    padding: 10px;
  }
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
const IconBox = styled.div`
  width: 30px;
  height: 30px;
  font-size: 19px;
  line-height: 2.2;
  color: ${colors.whiteColor};
  border-radius: 50%;
  background: ${colors.loginPoint};
`;
const Title = styled.span`
  color: ${colors.gray};
  margin-left: 10px;
`;
const Inputs = styled(TextField)`
  margin-top: 15px;
`;
const RadioBox = styled(RadioGroup)`
  width: 70%;
  margin: 20px auto;
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

const BanUser = ({ handleBanClose }) => {
    const [{ nickName }, onChange, onReset] = useInput({ nickName: '' });
    const [enabled, setEnabled] = useState('');
    const handleChange = e => {
        setEnabled(e.target.value);
    };
    const handleBanUser = () => {
        if (nickName === '') {
            alert('???????????? ???????????? ???????????? ??????????????????.');
        } else {
            let banUserData = {
                nickName: nickName,
                enabled: enabled,
            }
            console.info(banUserData);
            onReset();
            handleBanClose();
        }
    }

    return (
        <Wrapper>
            <TitleBox><IconBox><Block /></IconBox><Title>????????? ??????</Title></TitleBox>
            <Title>???????????? ???????????? ???????????? ??????????????????.</Title>
            <Inputs
                id="nickName"
                name="nickName"
                onChange={onChange}
                value={nickName}
                label="?????????"
                variant="outlined"
                autoFocus
                required
                fullWidth
            />
            <RadioBox>
                <RadioGroup onChange={handleChange} value={enabled} name="enabled">
                    <FormControlLabel value="1" control={<Radio />} label="??????" />
                    <FormControlLabel value="0" control={<Radio />} label="??????" />
                </RadioGroup>
            </RadioBox>
            <Button bgColor={colors.loginTabBorder} onClick={handleBanClose}>??????</Button>
            <Button bgColor={colors.activeBlue} onClick={handleBanUser}>????????????</Button>
        </Wrapper>
    )
}

export default BanUser;