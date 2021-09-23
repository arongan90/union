import React from 'react';
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import {useSelector} from "react-redux";
import youtubeSvg from "/public/images/share/footer_youtube.svg";
import facebookeSvg from "/public/images/share/footer_facebook.svg";
import kakaoSvg from "/public/images/share/footer_kakao.svg";
import * as constants from "../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const Wrapper = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding: 35px 25px 25px;
  background: ${colors.footerBackground};
  
  @media screen and (max-width: 767px) {
    padding: 30px 10px;
  }
`;
const Logo = styled.div`
  width: 85px;
  height: 30px;
  margin-bottom: 15px;
`;
const AppImageBox = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;
const InfoText = styled.div`
  color: ${colors.footerText};
  font-size: 14px;
  ${({textAlign}) => textAlign && css`
    text-align: center;
  `};
`;
const IconBox = styled.div`
  margin: 27px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Footer = () => {
    const corpInfo = useSelector(state => state.corpInfo);
    const moveAppLink = link => window.open(link);
    return (
        <Wrapper>
            <Logo>
                <AppImage
                    // src={`${serverProtocol}${serverURL}/${corpInfo.image_path}`}
                    src={corpInfo.image_path}
                    alt="logo"/>
            </Logo>
            <InfoText>{corpInfo.introduction}</InfoText>
            <InfoText>대표자 : {corpInfo.owner_name}</InfoText>
            <InfoText>전화번호 : {corpInfo.tel}</InfoText>
            <InfoText>사업자번호 : {corpInfo.biznum}</InfoText>

            <IconBox>
                {corpInfo.youtube_link &&
                    <AppImageBox
                        onClick={() => moveAppLink(corpInfo.youtube_link)}
                    >
                        <AppImage
                            src={youtubeSvg}
                        />
                    </AppImageBox>
                }
                {corpInfo.facebook_link &&
                    <AppImageBox
                    onClick={() => moveAppLink(corpInfo.facebook_link)}
                    >
                        <AppImage
                            src={facebookeSvg}
                        />
                    </AppImageBox>
                }
                {corpInfo.kakao_link &&
                    <AppImageBox
                        onClick={() => moveAppLink(corpInfo.kakao_link)}
                    >
                        <AppImage
                            src={kakaoSvg}
                        />
                    </AppImageBox>
                }
            </IconBox>

            <InfoText textAlign>Copyrights 2021 {corpInfo.corp_name}. All rights reserved</InfoText>
        </Wrapper>
    )
}

export default Footer;