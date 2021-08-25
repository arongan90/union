import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { useRouter } from "next/router";
import { lighten, darken } from 'polished';
import error404Image from '/public/images/share/error404.svg';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 960px) {
    flex-direction: column-reverse;
    padding: 10px;
  }
  @media only screen and (max-width: 460px) {
    padding: 10px;
  }
`;
const LeftBox = styled.div`
  @media only screen and (max-width: 960px) {
    text-align: center;
    margin-top: 25px;
  }
  @media only screen and (max-width: 460px) {
    margin-top: 0;
  }
`;
const RightBox = styled.div``;
const MainText = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: ${colors.normalBlack};
  margin-bottom: 21px;
  @media only screen and (max-width: 460px) {
    font-size: 20px;
  }
`;
const SubText = styled.div`
  font-size: 16px;
  color: ${colors.gray};
  margin-bottom: 53px;
  .mobileBrTag {
    display: none;
  }
  @media only screen and (max-width: 460px) {
    word-break: keep-all;
    margin: 0 auto 44px;
    .mobileBrTag {
      display: block;
    }
  }
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
`;
const BackButton = styled.button`
  width: 145px;
  height: 55px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: ${colors.whiteColor};
  background: ${colors.loginPoint};
  &:hover {
    background: ${lighten(0.1, colors.loginPoint)};
  }
  &:active {
    background: ${darken(0.1, colors.loginPoint)};
  }
`;

const Page404 = () => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return (
        <Wrap>
            <LeftBox>
                <MainText>요청하신 페이지를 찾을 수 없습니다.</MainText>
                <SubText>
                    불편을 드려 죄송합니다.<br className={"mobileBrTag"}/> 요청하신 페이지를 찾을 수 없습니다.<br/>
                    정확한 주소를 확인해주세요.
                </SubText>
                <BackButton onClick={goBack}>홈으로 돌아기기</BackButton>
            </LeftBox>
            <RightBox>
                <AppImage src={error404Image} alt="ErrorImage" />
            </RightBox>
        </Wrap>
    )
}

export default Page404;