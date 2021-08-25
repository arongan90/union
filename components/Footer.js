import React from 'react';
import styled, { css } from "styled-components";
import colors from "../styles/colors";

const Wrap = styled.div`
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
    return (
        <Wrap>
            <Logo>
                <AppImage alt={"logo"}/>
            </Logo>
            <InfoText>Ut malesuada et, netus viverra.</InfoText>
            <InfoText> Massa 010-1234-1234</InfoText>
            <InfoText>commodo pharetra placerat.</InfoText>
            <InfoText>Cras vitae sagittis, elementum</InfoText>

            <IconBox>
                <AppImage/>
                <AppImage/>
                <AppImage/>
            </IconBox>

            <InfoText textAlign>Copyrights 2021 힐링타임즈. All rights reserved</InfoText>
        </Wrap>
    )
}

export default Footer;