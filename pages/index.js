import Head from 'next/head'
import React, {useState, useEffect, useRef, useCallback, useLayoutEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import {darken, lighten} from "polished";
import colors from "../styles/colors";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UnionContent from "../components/UnionMain/UnionContent";
import Drawer from "../components/UnionMain/Drawer";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
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
  
  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;
const FooterContent = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding: 11px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const FooterInfo = styled.div`
  padding-top: 5px;
`;
const FootTitle = styled.div`
  width: ${({width}) => width};
  display: ${({display}) => display ? display : 'inline-block'};
  margin-right: 8px;
  font-size: 11px;
  line-height: 1.5;
  word-break: keep-all;
  color: ${({fontColor}) => fontColor ? fontColor : '#BDBDBD'};
  vertical-align: ${({verticalAlign}) => verticalAlign};
`;
const FooterLogo = styled.div`
  width: 132px;
  height: 58px;
  @media only screen and (max-width: 768px) {
    margin-top: 24px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Index() {
    const [tabValue, setTabValue] = useState(0);
    const router = useRouter();
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const isMobile = useMediaQuery({
        query: "(min-width: 280px) and (max-width: 768px)"
    });

    const isMobileFooter = useMediaQuery({
        query: "(min-width: 280px) and (max-width: 400px)"
    });

    const onLogin = () => router.push(`/login`);

    const handleScrollClick = useCallback(() => {
        console.info('윈도우 ?:: ', window.scrollTo)
        window.scrollTo(0, 3000);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollClick);
        return () => window.removeEventListener('scroll', handleScrollClick);
    }, [handleScrollClick])

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

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
                                <TabMenu label="화상회의" onClick={handleScrollClick} />
                                <TabMenu label="On Air" onClick={handleScrollClick} />
                                <TabMenu label="링크바인더" onClick={handleScrollClick} />
                                <TabMenu label="게시영상" onClick={handleScrollClick} />
                                <TabMenu label="쇼핑몰" onClick={handleScrollClick} />
                            </TabBar>
                        </HeaderLeft>
                        <HeaderRight>
                            <LoginButton onClick={onLogin}>LOGIN</LoginButton>
                            <Drawer isMobile={isMobile} />
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
                    isMobile={isMobile}
                />

                <FooterBox>
                    <FooterContent>
                        <FooterInfo>
                            <FootTitle verticalAlign={"top"}>
                                회사명 <br/>
                                사업장주소 <br/>
                            </FootTitle>
                            <FootTitle width={isMobileFooter ? "78%" : "auto"}>
                                캣벨컴퍼니(주) <br/>
                                서울특별시 성동구 뚝섬로1나길 5, G702(헤이그라운드 성수시작점)<br/>
                            </FootTitle>
                            <FootTitle display={"block"} fontColor={"#969696"}>
                                COPYRIGHT ⓒ Catbell Company. ALL RIGHTS RESERVED.
                            </FootTitle>
                        </FooterInfo>
                        <FooterLogo>
                            <AppImage src={footerImage} />
                        </FooterLogo>
                    </FooterContent>
                </FooterBox>
            </Wrap>
        </div>
    )
}

Index.getInitialProps = async (ctx) => {

}

export default Index;