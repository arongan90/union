import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {darken, lighten} from "polished";
import colors from "../../styles/colors";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UnionContent from "./UnionContent";
import Drawer from "./Drawer";
import MobileDetect from "mobile-detect";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import Image from 'next/image';
// Image
import mainBgImage from "/public/images/union/Mainview_bg.png"
import catbellLogo from "/public/images/union/logo_catbellunion.svg"
import bannerImage from "/public/images/union/CATBELL_UNION.png";
import iphoneImage from "/public/images/union/iphoneImage.png";
import arrowDownImage from "/public/images/union/arrow-down.svg";
import footerImage from "/public/images/union/logo_footer.svg";

const Wrap = styled.div`
  width: 100vw;
  height: 100%;
`;
const MainBanner = styled.div`
  width: 100vw;
  height: 650px;
  background: url(${mainBgImage}) no-repeat;
  background-size: cover;
  @media only screen and (max-width: 960px) {
    background-position: 33%;
  }
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
`;
const HeaderBox = styled.div`
  max-width: 1065px;
  height: 65px;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
`;
const HeaderLeft = styled.div`
  display: inline-flex;
`;
const CatBellLogo = styled.img`
  width: 102px;
  height: 45px;
`;
const TabBar = styled(Tabs)`
  width: auto;
  margin-left: 55px;
  display: flex;
  align-items: center;

  .MuiTabs-fixed {
    height: 28px;
  }

  .MuiTab-root {
    padding: 0;
    min-width: auto;
    min-height: auto;
  }

  .MuiTab-textColorPrimary.Mui-selected {
    color: ${colors.skyBlue};
  }

  .PrivateTabIndicator-root-1 {
    height: 3px;
    background: ${colors.skyBlue};
  }
  
  @media only screen and (max-width: 960px) {
    margin-left: 30px;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const TabMenu = styled(Tab)`
  color: #4D4D4D;
  font-size: 15px;
  margin-right: 30px;
`;
const LoginButton = styled.button`
  width: 95px;
  height: 41px;
  font-size: 16px;
  color: ${colors.whiteColor};
  border-radius: 8px;
  border: none;
  background: ${colors.deepYellow};
  
  &:hover {
    background: ${lighten(0.1, colors.deepYellow)};  
  }
  &:active {
    background: ${darken(0.1, colors.deepYellow)};
  }
`;
const BannerContent = styled.div`
  max-width: 900px;
  margin: 55px auto 0;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  
  @media only screen and (max-width: 960px) {
    max-width: 768px;
    padding: 0 10px;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const BannerTextBox = styled.div`
  margin-right: 217px;
  @media only screen and (max-width: 960px) {
    margin-right: 18%;
    text-align: center;
  }
  @media only screen and (max-width: 768px) {
    margin: 0 0 20px 0;
  }
`;
const BannerImage = styled.div`
  width: 390px;
  height: 60px;
  background: url(${bannerImage}) no-repeat;
  background-size: 100%;
  @media only screen and (max-width: 768px) {
    width: 215px;
    height: 33px;
    margin-bottom: 10px;
  }
`;
const BannerText = styled.div`
  font-size: 24px;
  color: ${colors.deepSkyBlue};

  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
  
`;
const IphoneImage = styled.div``;
const AppImage = styled.img`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;
const MoveArrow = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
  margin: 45px auto 0;
  background: ${colors.darkDeepSkyBlue};
  animation: moving 2s infinite ease-in-out alternate;
  -webkit-animation: moving 2s infinite ease-in-out alternate;
  -moz-animation: moving 2s infinite ease-in-out alternate;
  -ms-animation: moving 2s infinite ease-in-out alternate;
  -o-animation: moving 2s infinite ease-in-out alternate;
  
  @keyframes moving {
    0% {bottom: 20px;}
    20% {bottom: 10px;}
    40% {bottom: 20px;}
    60% {bottom: 10px;}
    80% {bottom: 20px;}
    100% {bottom: 20px;}
  }
`;

const FooterBox = styled.div`
  width: 100%;
  height: 80px;
  background: ${colors.deepGray};
`;
const FooterContent = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding: 11px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FooterInfo = styled.div`
  padding-top: 5px;
`;
const FootTitle = styled.div`
  display: ${({display}) => display ? display : 'inline-block'};
  margin-right: 8px;
  font-size: 11px;
  line-height: 1.5;
  color: ${colors.lightGray};
`;
const FooterLogo = styled.div`
  width: 132px;
  height: 58px;
`;
const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Union = ({ isMobile }) => {
    const [tabValue, setTabValue] = useState(0);
    const [viewPortWidth, setViewPortWidth] = useState();
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    useEffect(() => {
        if (window.innerWidth > 768) {
            setViewPortWidth(false);
        } else {
            setViewPortWidth(true);
        }
    }, []);

    // const isMobile = useMediaQuery({
    //     query: "(min-width: 280px) and (max-width: 768px)"
    // });

    // console.info('Union.js isMobile ::: ',isMobile, viewPortWidth);

    return (
        <Wrap>
            <MainBanner>
                <HeaderBox>
                    <HeaderLeft>
                        <CatBellLogo src={catbellLogo} alt={"catbell"}/>
                        <TabBar
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <TabMenu label="화상회의"/>
                            <TabMenu label="On Air"/>
                            <TabMenu label="링크바인더"/>
                            <TabMenu label="게시영상"/>
                            <TabMenu label="쇼핑몰"/>
                        </TabBar>
                    </HeaderLeft>
                    <HeaderRight>
                        <LoginButton>LOGIN</LoginButton>
                        {isMobile && <Drawer isMobile={isMobile} />}
                    </HeaderRight>
                </HeaderBox>

                <BannerContent>
                    <BannerTextBox>
                        <BannerImage />
                        <BannerText>
                            고객관리 및 고객응대를 위한<br/>
                            하나의 솔루션
                        </BannerText>
                    </BannerTextBox>
                    <IphoneImage>
                        <AppImage width={226} height={437} src={iphoneImage } />
                    </IphoneImage>
                </BannerContent>
                <MoveArrow>
                    <AppImage src={arrowDownImage}/>
                </MoveArrow>
            </MainBanner>

            <UnionContent
                isMobile={viewPortWidth}
            />

            <FooterBox>
                <FooterContent>
                    <FooterInfo>
                        <FootTitle>
                            회사명 <br/>
                            사업장주소 <br/>
                        </FootTitle>
                        <FootTitle>
                            캣벨컴퍼니(주) <br/>
                            서울특별시 성동구 뚝섬로1나길 5, G702(헤이그라운드 성수시작점)<br/>
                        </FootTitle>
                        <FootTitle display={"block"}>
                            COPYRIGHT ⓒ Catbell Company. ALL RIGHTS RESERVED.
                        </FootTitle>
                    </FooterInfo>
                    <FooterLogo>
                        <AppImage src={footerImage} />
                    </FooterLogo>
                </FooterContent>
            </FooterBox>
        </Wrap>
    )
}

export default Union;

