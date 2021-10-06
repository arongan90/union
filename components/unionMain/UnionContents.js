import React, {useRef} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Link from 'next/link';
import {useSelector} from "react-redux";
import content1_1 from "/public/images/union/화상회의.svg";
import content1_2 from "/public/images/union/product_recommendations.svg";
import content1_3 from "/public/images/union/shoppingmall.svg";
import content2 from "/public/images/union/menu1.png";
import content3 from "/public/images/union/conference.png";
import content4 from "/public/images/union/onair.png";
import content5 from "/public/images/union/linkbinder2.png";
import content5_reverse from "/public/images/union/linkbinder_mobile.png";
import content6 from "/public/images/union/videos.png";
import content7 from "/public/images/union/shoppingmall.png";
import content7_mobile from "/public/images/union/shoppingmall_mobile.png";
import content8 from "/public/images/union/info_bg.png";
import {lighten, darken} from "polished";
import MobileSwiperSection from "./MobileSwiperSection";
import * as PropTypes from "prop-types";

const Section = styled.div`
  max-width: ${({maxWidth}) => maxWidth ? maxWidth : '1200px'};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${({padding}) => padding ? padding : "60px 0"};

  ${({bgImage}) => bgImage && css`
    background: url(${bgImage});
    background-size: 100% 100%;
  `}
`;
const Title = styled.div`
  color: ${({fontColor}) => fontColor};
  font-size: ${({fontSize}) => fontSize}px;
  margin-bottom: ${({marginBottom}) => marginBottom}px;
  position: relative;
  white-space: nowrap;

  ${({section_1}) => section_1 && css`
    &::after {
      content: '';
      width: 55px;
      height: 3px;
      position: absolute;
      top: 40px;
      right: 60px;
      background: ${colors.skyGreen};
    }
  `}

  @media only screen and (max-width: 960px) {
    font-size: 30px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 25px;
  }
`;
const SubTitle = styled.div`
  font-size: ${({fontSize}) => fontSize ? fontSize : 18}px;
  color: ${({fontcolor}) => fontcolor};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 'normal'};
  text-align: ${({textAlign}) => textAlign ? textAlign : 'center'};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : 0}px;
  white-space: nowrap;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }

  ${({content_8}) => content_8 && css`
    font-size: 14px;
    word-break: keep-all;
    white-space: pre-line;
  `}
`;

const SubContent = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: ${({marginRight}) => marginRight ? marginRight : 0}px;
`;
const PointText = styled.div`
  display: ${({display}) => display ? display : 'block'};
  font-size: ${({fontSize}) => fontSize}px;
  color: ${({fontColor}) => fontColor};
  margin-top: ${({marginTop}) => marginTop}px;
  font-weight: bold;
`;
const ImageBox = styled.div`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  margin-bottom: 10px;
  max-width: ${({maxWidth}) => maxWidth}px;
  
  ${({webImage}) => webImage && css`
    @media only screen and (max-width: 767px) {
      display: none;
    }
  `}
`;
const MobileImageBox = styled.div`
  margin-bottom: 10px;
  max-width: ${({maxWidth}) => maxWidth}px;
  display: none;

  @media only screen and (max-width: 767px) {
    display: block;
    margin: 0 auto;
  }
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
`;
const QnaButton = styled.button`
  width: 300px;
  height: 70px;
  font-size: 16px;
  color: ${colors.whiteColor};
  text-align: center;
  border-radius: 7px;
  border: none;
  line-height: 1.2;
  background: ${colors.deepBlue};

  &:hover {
    background: ${lighten(0.1, colors.deepBlue)};
  }

  &:active {
    background: ${darken(0.1, colors.deepBlue)};
  }
`;
const MailText = styled.span`
  color: ${colors.whiteColor};
  font-size: 14px;
`;

const Content_1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
const Content_2 = styled.div`
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;
const Content_3 = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  
  .left {
    width: 35%;
    padding-left: 30px;
  }
  .right {width: 65%;}
  
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    
    .left {
      width: 90%;
      margin-bottom: 50px;
    }
    .right {width: 110%;}

    ${Title} {
      width: 100%;
      font-size: 22px;
      margin-bottom: 15px;
    }
  }
`;
const Content_4 = styled.div`
  text-align: center;
  
  @media screen and (max-width: 767px) {
    ${Title} {
      font-size: 16px;
      margin-bottom: 30px;
    }
  }
`;
const Content_5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  
  .left {width: 63%;}
  .right {
    width: 37%;
    text-align: right;
    margin-bottom: 20px;
    padding-right: 30px;
  }
  
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column-reverse;
    
    .left, .right {width: 100%;}
    
    ${SubTitle} {
      margin-bottom: 10px;
    }
  }
`;
const Content_6 = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 30px;
  
  .left {width: 35%;}
  .right {width: 65%;}

  @media screen and (max-width: 767px) {
    flex-direction: column;

    .left, .right {width: 100%;}

    ${SubTitle} {
      font-size: 14px;
      margin-bottom: 10px;
      
      ${PointText} {
        font-size: 15px;
      }
    }
  }
`;
const Content_7 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-right: 30px;
  
  .left { width: 63%;}
  .right {
    width: 37%;
    text-align: right;
  }

  @media screen and (max-width: 960px) {
    .left {width: 63%;}
    .right {width: 47%;}
  }

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 10px;

    .right {
      width: 100%;
    }
    .left {
      width: 100%;
    }
  }
`;
const Content_8 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UnionContent = ({ isMobile }) => {
    return (
        <>
            {/* Section 1 */}
            <Section padding="120px 0 60px" id="conference">
                <Title fontColor={colors.lightBlack} fontSize={28} marginBottom={80} section_1>최적의 고객관리</Title>
                <Content_1>
                    <SubContent>
                        <ImageBox width={200} height={150}>
                            <AppImage src={content1_1} alt="image_1"/>
                        </ImageBox>
                        <SubTitle fontcolor={colors.gray}>
                            고객 소통을 위한 <br/>
                            화상회의 솔루션
                        </SubTitle>
                        <PointText fontSize={14} fontColor={colors.activeBlue} marginTop={10}>※기본제공</PointText>
                    </SubContent>
                    <SubContent>
                        <ImageBox width={200} height={150}>
                            <AppImage src={content1_2} alt="image_1"/>
                        </ImageBox>
                        <SubTitle fontcolor={colors.gray}>
                            웹 페이지 <br/>
                            (모바일 선택)
                        </SubTitle>
                        <PointText fontSize={14} fontColor={colors.activeRed} marginTop={10}>※기본제공</PointText>
                    </SubContent>
                    <SubContent>
                        <ImageBox width={200} height={150}>
                            <AppImage src={content1_3} alt="image_1"/>
                        </ImageBox>
                        <SubTitle fontcolor={colors.gray}>
                            온라인 샵 링크 <br/>
                            (쇼핑몰 선택)
                        </SubTitle>
                        <PointText fontSize={14} fontColor={colors.activeRed} marginTop={10}>※기본제공</PointText>
                    </SubContent>
                </Content_1>
            </Section>

            {/* Section 2 */}
            <Section>
                <Content_2>
                    <ImageBox>
                        <AppImage src={content2}/>
                    </ImageBox>
                </Content_2>
                <MobileSwiperSection />
            </Section>

            {/* Section 3 */}
            <Section>
                <Content_3>
                    <div className="left">
                        <Title fontSize={36} marginBottom={33} textAlign={"left"}>
                            맞춤형 고객관리,<br/>
                            온라인 고객응대
                        </Title>
                        <SubTitle fontSize={16} fontcolor={colors.normalBlack} fontWeight={400} textAlign={"left"}>
                            캣벨 유니온 솔루션에서 제공하는<br/>
                            화상 회의를 활용해보세요.
                        </SubTitle>

                        <SubTitle fontSize={16} fontcolor={colors.normalBlack} fontWeight={400} textAlign={"left"}>
                            향후 마케팅 및 재구매 유도를 위한<br/>
                            지속적인 고객 관리가 가능합니다.
                        </SubTitle>
                    </div>
                    <div className="right">
                        <ImageBox>
                            <AppImage src={content3}/>
                        </ImageBox>
                    </div>
                </Content_3>
            </Section>

            {/* Section 4 */}
            <Section id="onAir">
                <Content_4>
                    <Title fontSize={24} fontColor={colors.normalBlack2} marginBottom={40}>
                        이제 화상회의도 라이브로 스트리밍하세요!
                    </Title>
                    <ImageBox maxWidth={1000}>
                        <AppImage src={content4}/>
                    </ImageBox>
                    <PointText fontSize={14} fontColor={colors.activeRed}>※ 개별문의</PointText>
                </Content_4>
            </Section>

            {/* Section 5 */}
            <Section id="linkBinder">
                <Content_5>
                    <div className="left">
                        <ImageBox maxWidth={680} webImage>
                            <AppImage src={content5}/>
                        </ImageBox>
                        <MobileImageBox maxWidth={460}>
                            <AppImage src={content5_reverse} />
                        </MobileImageBox>
                    </div>
                    <div className="right">
                        <Title fontSize={36} fontColor={colors.lightBlack} textAlign={"right"} marginBottom={33}>
                            흩어져 있는 판매 채널 <br/>
                            통합 솔루션
                        </Title>
                        <SubTitle fontcolor={colors.normalBlack} textAlign={"right"} marginBottom={12} fontSize={14}>
                            매출을 극대화하기 위해서는<br/>
                            더 많은, 더 다양한 고객과 마주해야 합니다.
                        </SubTitle>
                        <SubTitle fontcolor={colors.normalBlack} textAlign={"right"} marginBottom={140} fontSize={14}>
                            매출 극대화를 위해<br/>
                            흩어져 있는 오픈마켓 링크들을 한데<br/>
                            모아보세요.
                        </SubTitle>
                    </div>
                </Content_5>
            </Section>

            {/* Section 6 */}
            <Section id="uploadVideo">
                <Content_6>
                    <div className="left">
                        <Title fontSize={36} marginBottom={33} fontColor={colors.lightBlack} textAlign={"left"}>
                            판매 제품과 관련된<br/>
                            홍보 영상 클립 추가
                        </Title>

                        <SubTitle fontcolor={colors.normalBlack} marginBottom={8} textAlign="left" fontSize={16}>
                            판매 중인 제품과 관련된 홍보 영상을 모아서<br/>
                            보여주고 싶다면 <PointText fontSize={19} display="inline-block"
                                                fontColor={colors.activeRed}>임베드기능</PointText>을 활용해 보세요.
                        </SubTitle>
                        <SubTitle fontcolor={colors.normalBlack} textAlign="left" fontSize={14} marginBottom={50}>
                            추가적인 비용 지출 없이<br/>
                            효과적인 마케팅 효과를 누릴 수 있습니다.
                        </SubTitle>
                    </div>
                    <div className="right">
                        <ImageBox maxWidth={680}>
                            <AppImage src={content6}/>
                        </ImageBox>
                    </div>
                </Content_6>
            </Section>

            {/* Section 7 */}
            <Section id="shoppingMall">
                <Content_7>
                    <div className="left">
                        <ImageBox webImage>
                            <AppImage src={content7} />
                        </ImageBox>
                        <MobileImageBox maxWidth={500}>
                            <AppImage src={content7_mobile} />
                        </MobileImageBox>
                    </div>
                    <div className="right">
                        <Title fontSize={36} fontColor={colors.lightBlack} marginBottom={33} textAlign="right">
                            독자적인 판매 채널<br/>
                            쇼핑몰 서비스 지원
                        </Title>
                        <SubTitle marginBottom={12} textAlign="right" fontSize={16}>
                            판매 중인 제품군이 유통 채널을 이용하기 힘들거나, <br/>
                            판매 제품이 너무 많아 통합할 필요가 있는 경우, <br/>
                            캣벨 유니온 솔루션의 쇼핑몰 서비스를 이용해보세요.
                        </SubTitle>
                        <SubTitle marginBottom={80} textAlign="right" fontSize={16}>
                            <PointText display="inline-block" fontColor={colors.activeBlue} fontSize={17}>독자적인 판매
                                채널 확보</PointText>를 통해<br/>
                            효과적인 제품 노출 및 고객 이벤트&프로모션 진행에도<br/>
                            용이합니다.
                        </SubTitle>
                    </div>
                </Content_7>
            </Section>

            {/* Section 8 */}
            <Section bgImage={content8} maxWidth="none">
                <Content_8>
                    <Title textAlign="center" fontSize={24} fontColor={colors.lightBlack} marginBottom={16}>
                        CATBELL UNION<br/>
                        솔루션 가격제안
                    </Title>
                    <SubTitle fontSize={16} fontcolor={colors.normalBlack} marginBottom={10} content_8>
                        고객관리와 고객 응대를 위한 화상회의는 기본,<br/>
                        저렴한 비용으로 제품 홍보/마케팅 및 쇼핑몰까지 캣벨 유니온 솔루션으로 한 번에 이용해보세요.
                    </SubTitle>
                    <SubTitle fontSize={24} fontcolor={colors.lightBlack} marginBottom={55}>
                        070-4515-6313
                    </SubTitle>
                    <Link href="mailto:stan@catbellcompany.com">
                        <a>
                            <QnaButton>
                                캣벨유니온 문의하기
                                <MailText>stan@catbellcompany.com</MailText>
                            </QnaButton>
                        </a>
                    </Link>
                </Content_8>
            </Section>
        </>
    )
}

export default UnionContent;