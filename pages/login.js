import React, { useState } from 'react';
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import showPwdImage from "/public/images/union/showPwd.svg";
import hidePwdImage from "/public/images/union/hidePwd.svg";
import useInput from "../hooks/useInput";
import { lighten, darken } from "polished";
import { useRouter } from "next/router";
import { isLogin } from "../modules/auth";
import { useDispatch, useSelector } from "react-redux";
// Image
import catbellImage from "/public/images/union/logo_catbellunion.svg";

const Wrap = styled.div`
  max-width: 350px;
  margin: 15% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 375px) {
    max-width: 100%;
    margin-top: 20%;
    padding: 10px;  
  }
`;
const AppImageBox = styled.div`
  width: ${({width}) => width};
  height: ${({height}) => height};
  cursor: pointer;
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
`;
const TabMenuBox = styled.ul`
  width: 100%;
  display: flex;
  margin: 59px 0 43px;
  position: relative;
  &:after {
    content: '';
    width: 50%;
    border-bottom: 3px solid ${colors.loginPoint};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.2s;
  }
  ${({active}) => active.store && css`
    &:after {
      left: 50%;
    }
  `}
`;
const TabMenu = styled.li`
  width: 50%;
  text-align: center;
  height: 43px;
  line-height: 3;
  font-size: 16px;
  color: ${colors.loginDefaultFont};
  border-bottom: 1px solid ${colors.loginTabBorder};
  cursor: pointer;
  ${({active}) => active && css`
    color: ${colors.loginFont};
    font-weight: 900;
  `}
`;
const InputLabel = styled.label`
  width: 100%;
  height: 54px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;
  margin-bottom: 12px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StoreText = styled.div`
  font-size: 14px;
  color: ${colors.lightBlack};
  margin-bottom: 16px;
`;
const Inputs = styled.input`
  width: 100%;
  height: 100%;
  font-size: 15px;
  box-sizing: border-box;
  border: none;
  outline: none;
  &::placeholder {
    color: ${colors.inputBorder};
  }
`;
const Button = styled.button`
  width: 100%;
  height: 54px;
  text-align: center;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  margin-top: 23px;
  color: ${({fontColor}) => fontColor ? fontColor : colors.whiteColor};
  ${({border}) => border && css`
    border: 1px solid ${colors.loginPoint};
  `};
  ${({bgColor}) => bgColor && css`
    background: ${bgColor};
    &:hover {
      background: ${lighten(0.1, bgColor)}
    }
    &:active {
      background: ${darken(0.1, bgColor)}
    }
  `}
  & + & {
    margin-top: 12px;
  }
`;

const Login = () => {
    const [visible, setVisible] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const [tabActive, setTabActive] = useState({
        login: true,
        store: false,
    });
    const loginTab = () => {
        setTabActive({
            login: true,
            store: false,
        });
    }
    const storeTab = () => {
        setTabActive({
            login: false,
            store: true,
        });
    }

    const [{ userId, passWd, corpName }, onChange] = useInput({
        userId: '',
        passWd: '',
        corpName: ''
    });

    const handleVisible = () => setVisible(visible => !visible);
    const goBack = () => router.back();
    const onLogin = () => {
        let loginInfo = {};
        if (userId === '' || passWd === '') {
           alert('아이디와 비밀번호를 입력해주세요.');
        } else {
            loginInfo = {
                userId: userId,
                passWd: passWd,
            }
            dispatch(isLogin(loginInfo));
        }
    }

    return (
        <Wrap>
            <AppImageBox width={'142px'} height={'63px'}>
                <AppImage src={catbellImage} />
            </AppImageBox>
            <TabMenuBox active={tabActive}>
                <TabMenu active={tabActive.login} onClick={loginTab}>로그인</TabMenu>
                <TabMenu active={tabActive.store} onClick={storeTab}>스토어 바로가기</TabMenu>
            </TabMenuBox>

            {tabActive.login
                ?  <>
                    <InputLabel>
                        <Inputs
                            type="text"
                            name="userId"
                            value={userId}
                            onChange={onChange}
                            placeholder="아이디"
                        />
                    </InputLabel>
                    <InputLabel>
                        <Inputs
                            type={visible ? "password" : "text"}
                            name="passWd"
                            value={passWd}
                            onChange={onChange}
                            placeholder="비밀번호"
                        />
                        <AppImageBox width={visible ? '26px' : '25px'} height={visible ? '26px' : '25px'} onClick={handleVisible}>
                            <AppImage src={visible ? showPwdImage : hidePwdImage} />
                        </AppImageBox>
                    </InputLabel>
                </>
                : <>
                    <StoreText>오피스의 사용자로 로그인하기 위해 회사이름을 입력하세요.</StoreText>
                    <InputLabel>
                        <Inputs
                            type="text"
                            name="corpName"
                            value={corpName}
                            onChange={onChange}
                            placeholder="회사명을 입력해주세요."
                        />
                    </InputLabel>
                </>
            }
            <Button bgColor={colors.loginPoint} onClick={onLogin}>
                {tabActive.login ? '로그인' : '바로가기' }
            </Button>
            <Button bgColor={colors.whiteColor} border fontColor={colors.loginPoint} onClick={goBack}>
                취소
            </Button>
        </Wrap>
    )
}

export default Login;