import React from 'react';
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import {useSelector} from "react-redux";

const Wrapper = styled.div`
  max-width: 530px;
  margin: 0 auto;
  padding: 35px 25px 25px;
  background: ${colors.footerBackground};
`;
const Logo = styled.div`
  width: 85px;
  height: 30px;
  margin-bottom: 15px;
`;
const AppImageBox = styled.div`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = () => {
    const corpInfo = useSelector(state => state.corpInfo);

    return (
        <Wrapper>
            <Logo>
                <AppImage
                    src={"http://imagescdn.gettyimagesbank.com/500/201708/a10913676.jpg"}
                    alt={"logo"}/>
            </Logo>
            <InfoText>{corpInfo.introduction}</InfoText>
            <InfoText>대표자 : {corpInfo.owner_name}</InfoText>
            <InfoText>전화번호 : {corpInfo.tel}</InfoText>
            <InfoText>사업자번호 : {corpInfo.biznum}</InfoText>

            <IconBox>
                <AppImage/>
                <AppImage/>
                <AppImage/>
            </IconBox>

            <InfoText textAlign>Copyrights 2021 {corpInfo.corp_name}. All rights reserved</InfoText>
        </Wrapper>
    )
}

export default Footer;