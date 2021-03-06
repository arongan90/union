import Head from 'next/head'
import React, {useState, useRef} from 'react';
import styled, { css } from 'styled-components';
import {darken, lighten} from "polished";
import colors from "../styles/colors";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UnionContents from "../components/unionMain/UnionContents";
import Drawer from "../components/unionMain/Drawer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import mainBgImage from "/public/images/union/Mainview_bg.png"
import catbellLogo from "/public/images/union/logo_catbellunion.svg"
import bannerImage from "/public/images/union/CATBELL_UNION.png";
import iphoneImage from "/public/images/union/iphoneImage.png";
import arrowDownImage from "/public/images/union/arrow-down.svg";
import footerImage from "/public/images/union/logo_footer.svg";
import {isLogout} from "../modules/auth";
import {scrollTo} from "../utils/scrollTo";

const Wrapper = styled.div`
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
  @media only screen and (max-width: 767px) {
    height: 100%;
  }
`;
const HeaderBox = styled.div`
  max-width: 1200px;
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
  @media only screen and (max-width: 767px) {
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
  
  ${({ bgColor }) => bgColor && css`
    background: ${bgColor};
    &:hover {
      background: lighten(0.1, bgColor);
      
    }
    &:active {
      background: darken(0.1, bgColor);
    }
  `}
`;
const BannerContent = styled.div`
  max-width: 900px;
  margin: 55px auto 0;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  
  @media only screen and (max-width: 960px) {
    max-width: 767px;
    padding: 0 10px;
  }
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
const BannerTextBox = styled.div`
  margin-right: 217px;
  @media only screen and (max-width: 960px) {
    margin-right: 18%;
    text-align: center;
  }
  @media only screen and (max-width: 767px) {
    margin: 0 0 20px 0;
  }
`;
const BannerImage = styled.div`
  width: 390px;
  height: 60px;
  background: url(${bannerImage}) no-repeat;
  background-size: 100%;
  @media only screen and (max-width: 767px) {
    width: 215px;
    height: 33px;
    margin-bottom: 10px;
  }
`;
const BannerText = styled.div`
  font-size: 24px;
  color: ${colors.deepSkyBlue};

  @media only screen and (max-width: 767px) {
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
  
  @media only screen and (max-width: 767px) {
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
  
  @media only screen and (max-width: 767px) {
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

  @media only screen and (max-width: 767px) {
    ${({ address }) => address && css`
      width: 78%;
    `}
  }
`;
const FooterLogo = styled.div`
  width: 132px;
  height: 58px;
  @media only screen and (max-width: 767px) {
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
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);

    const handleTabChange = (event, newValue) => setTabValue(newValue);
    const handleScrollMove = id => scrollTo({ id });
    const onLogin = () => router.push(`/login`);
    const onLogout = () => dispatch(isLogout());

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Wrapper>
                <MainBanner>
                    <HeaderBox>
                        <HeaderLeft>
                            <CatBellLogo src={catbellLogo} alt="logo"/>
                            <TabBar
                                value={tabValue}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <TabMenu label="????????????" onClick={() => handleScrollMove("conference" )} />
                                <TabMenu label="On Air"  onClick={() => handleScrollMove("onAir")} />
                                <TabMenu label="???????????????"  onClick={() => handleScrollMove("linkBinder")} />
                                <TabMenu label="????????????"  onClick={() => handleScrollMove("uploadVideo")} />
                                <TabMenu label="?????????"  onClick={() => handleScrollMove("shoppingMall")} />
                            </TabBar>
                        </HeaderLeft>
                        <HeaderRight>
                            {!!userInfo
                                ? <LoginButton bgColor={colors.activeRed} onClick={onLogout}>LOGOUT</LoginButton>
                                : <LoginButton bgColor={colors.deepYellow} onClick={onLogin}>LOGIN</LoginButton>
                            }
                            <Drawer />
                        </HeaderRight>
                    </HeaderBox>

                    <BannerContent>
                        <BannerTextBox>
                            <BannerImage />
                            <BannerText>
                                ???????????? ??? ??????????????? ??????<br/>
                                ????????? ?????????
                            </BannerText>
                        </BannerTextBox>
                        <IphoneImage>
                            <AppImage width={226} height={437} src={iphoneImage} />
                        </IphoneImage>
                    </BannerContent>
                    <MoveArrow>
                        <AppImage src={arrowDownImage}/>
                    </MoveArrow>
                </MainBanner>

                <UnionContents />

                <FooterBox>
                    <FooterContent>
                        <FooterInfo>
                            <FootTitle verticalAlign={"top"}>
                                ????????? <br/>
                                ??????????????? <br/>
                            </FootTitle>
                            <FootTitle address>
                                ???????????????(???) <br/>
                                ??????????????? ????????? ?????????1?????? 5, G702(?????????????????? ???????????????)<br/>
                            </FootTitle>
                            <FootTitle display={"block"} fontColor={colors.lightGray}>
                                COPYRIGHT ??? Catbell Company. ALL RIGHTS RESERVED.
                            </FootTitle>
                        </FooterInfo>
                        <FooterLogo>
                            <AppImage src={footerImage} />
                        </FooterLogo>
                    </FooterContent>
                </FooterBox>
            </Wrapper>
        </div>
    )
}

Index.getInitialProps = async (ctx) => {

}

export default Index;