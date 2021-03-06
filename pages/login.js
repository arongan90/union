import React, { useState } from 'react';
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import useInput from "../hooks/useInput";
import { lighten, darken } from "polished";
import { useRouter } from "next/router";
import { isLogin } from "../modules/auth";
import { useDispatch, useSelector } from "react-redux";
// Image
import catbellImage from "/public/images/union/logo_catbellunion.svg";
import showPwdImage from "/public/images/union/showPwd.svg";
import hidePwdImage from "/public/images/union/hidePwd.svg";

const Wrapper = styled.div`
  max-width: 350px;
  margin: 12% auto;
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
    const router = useRouter();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(true);
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

    const [{ userId, password, corpInput }, onChange] = useInput({
        userId: '',
        password: '',
        corpInput: ''
    });

    const handleVisible = () => setVisible(visible => !visible);
    const goBack = () => router.back();

    const onLogin = async () => {
        if (userId === '' || password === '') {
           alert('???????????? ??????????????? ??????????????????.');
        } else {
            try {
                dispatch(isLogin({
                    userId: userId,
                    password: password,
                }));
            } catch(e) {
                throw new Error(e);
            }
        }
    }

    const onStore = async corpName => {
        try {
            // const res = await axios.get(``);
            await router.push(`${corpName}`);
        } catch(e) {

        }
    }

    return (
        <Wrapper>
            <AppImageBox width={'142px'} height={'63px'}>
                <AppImage src={catbellImage} />
            </AppImageBox>
            <TabMenuBox active={tabActive}>
                <TabMenu active={tabActive.login} onClick={loginTab}>?????????</TabMenu>
                <TabMenu active={tabActive.store} onClick={storeTab}>????????? ????????????</TabMenu>
            </TabMenuBox>

            {tabActive.login
                ?  <>
                    <InputLabel>
                        <Inputs
                            type="text"
                            name="userId"
                            value={userId}
                            onChange={onChange}
                            placeholder="?????????"
                        />
                    </InputLabel>
                    <InputLabel>
                        <Inputs
                            type={visible ? "password" : "text"}
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="????????????"
                        />
                        <AppImageBox width={visible ? '26px' : '25px'} height={visible ? '26px' : '25px'} onClick={handleVisible}>
                            <AppImage src={visible ? showPwdImage : hidePwdImage} />
                        </AppImageBox>
                    </InputLabel>
                </>
                : <>
                    <StoreText>???????????? ???????????? ??????????????? ?????? ??????????????? ???????????????.</StoreText>
                    <InputLabel>
                        <Inputs
                            type="text"
                            name="corpInput"
                            value={corpInput}
                            onChange={onChange}
                            placeholder="???????????? ??????????????????."
                        />
                    </InputLabel>
                </>
            }
            <Button bgColor={colors.loginPoint} onClick={() => tabActive.login ? onLogin() : onStore(corpInput)}>
                {tabActive.login ? '?????????' : '????????????' }
            </Button>
            <Button bgColor={colors.whiteColor} border fontColor={colors.loginPoint} onClick={goBack}>
                ??????
            </Button>
        </Wrapper>
    )
}

export default Login;