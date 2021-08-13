import React, {useState, useEffect} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Link from 'next/link';

// Image
import content1_1 from "/public/images/union/화상회의.svg";
import content1_2 from "/public/images/union/product_recommendations.svg";
import content1_3 from "/public/images/union/shoppingmall.svg";
import content2 from "/public/images/union/menu1.png";
import content3 from "/public/images/union/conference.png";
import content4 from "/public/images/union/onair.png";
import content5 from "/public/images/union/linkbinder2.png";
import content6 from "/public/images/union/videos.png";
import content7 from "/public/images/union/shoppingmall.png";
import content8 from "/public/images/union/info_bg.png";
import {lighten, darken} from "polished";
import MobileSwiperSection from "./MobileSwiperSection";

const Wrap = styled.div`
  width: 100%;
  height: ${({height}) => height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({bgColor}) => bgColor ? bgColor : colors.whiteColor}
}

;
${({bgImage}) => bgImage && css`
  background: url(${bgImage});
  background-size: 100% 100%;
`}

@media only screen and (max-width: 768px) {
  height: auto;
  padding: 100px 0;
}

${({isModule}) => isModule && css`
  display: none;
`}
`;
const Content = styled.div`
  width: ${({width}) => width ? width : 1000}px;
  display: flex;
  flex-direction: ${({flexDirection}) => flexDirection};
  justify-content: center;
  align-items: center;
  padding-right: ${({paddingRight}) => paddingRight ? paddingRight : 0}px;
  padding-left: ${({paddingLeft}) => paddingLeft ? paddingLeft : 0}px;

  @media only screen and (max-width: 768px) {
    
  }
`;
const SubContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent ? justifyContent : 'space-around'};
  align-items: center;
  flex-direction: ${({flexDirection}) => flexDirection ? 'column' : 'row'};

  @media only screen and (max-width: 768px) {
    flex-direction: ${({flexDirection}) => flexDirection ? 'column' : 'row'};
    ${({Sec3_isMobile}) => Sec3_isMobile && css`
      max-width: 375px;
      align-items: flex-start;
    `};
    ${({Sec4_isMobile}) => Sec4_isMobile && css`
      max-width: 375px;
    `};
  }

  @media only screen and (max-width: 375px) {
    ${({Sec3_isMobile}) => Sec3_isMobile && css`
      padding: 25px;
    `};
  }

`;
const ImageBox = styled.div`
  width: ${({width}) => width};
  height: ${({height}) => height};
  margin-bottom: 10px;
  max-width: ${({maxWidth}) => maxWidth}px;
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
`;
const SubContent = styled.div`
  display: inline-block;
  text-align: center;
  ${({marginRight}) => marginRight ? marginRight : 0}px;

  @media only screen and (max-width: 768px) {
    ${({Sec3_isMobile}) => Sec3_isMobile && css`
      margin-bottom: 55px;
    `};
  }
`;
const Title = styled.div`
  color: ${({fontColor}) => fontColor};
  font-size: ${({fontSize}) => fontSize}px;
  text-align: ${({textAlign}) => textAlign};
  margin-bottom: ${({marginBottom}) => marginBottom}px;
  position: relative;
  white-space: nowrap;

  ${({sector_1}) => sector_1 && css`
    &::after {
      content: '';
      width: 55px;
      height: 3px;
      position: absolute;
      top: 40px;
      right: 60px;
      background: ${colors.skyGreen};
    }
  `} @media only screen and (max-width: 768px) {
  ${({Sec3_isMobile}) => Sec3_isMobile && css`
    font-size: 25px;
    margin-bottom: 15px;
  `};
}
`;
const SubTitle = styled.div`
  font-size: ${({fontSize}) => fontSize ? fontSize : 18}px;
  color: ${({fontcolor}) => fontcolor};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 'normal'};
  text-align: ${({textAlign}) => textAlign ? textAlign : 'center'};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : 0}px;
  white-space: nowrap;

  ${({Sec3_isMobile}) => Sec3_isMobile && css`
    margin-bottom: 5px;
    font-size: 14px;
  `}
`;
const PointText = styled.div`
  display: ${({display}) => display ? display : 'block'};
  font-size: ${({fontSize}) => fontSize}px;
  color: ${({fontColor}) => fontColor};
  margin-top: ${({marginTop}) => marginTop}px;
  font-weight: bold;
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

const UnionContent = ({isMobile}) => {
    // console.info('유니온 콘텐트 isMobile :: ', isMobile);
    return (
        <>
            {/* Section 1 */}
            <Wrap height={593}>
                <Content flexDirection={"column"}>
                    <Title fontColor={colors.lightBlack} fontSize={28} marginBottom={90} sector_1>
                        최적의 고객관리
                    </Title>
                    <SubContentBox flexDirection={isMobile}>
                        <SubContent>
                            <ImageBox width={'200px'} height={150}>
                                <AppImage src={content1_1}/>
                            </ImageBox>
                            <SubTitle fontcolor={colors.gray}>
                                고객 소통을 위한 <br/>
                                화상회의 솔루션
                            </SubTitle>
                            <PointText fontSize={14} fontColor={colors.activeBlue} marginTop={10}>※기본제공</PointText>
                        </SubContent>
                        <SubContent>
                            <ImageBox width={'200px'} height={150}>
                                <AppImage src={content1_2}/>
                            </ImageBox>
                            <SubTitle fontcolor={colors.gray}>
                                웹 페이지 <br/>
                                (모바일 선택)
                            </SubTitle>
                            <PointText fontSize={14} fontColor={colors.activeRed} marginTop={10}>※기본제공</PointText>
                        </SubContent>
                        <SubContent>
                            <ImageBox width={'200px'} height={150}>
                                <AppImage src={content1_3}/>
                            </ImageBox>
                            <SubTitle fontcolor={colors.gray}>
                                온라인 샵 링크 <br/>
                                (쇼핑몰 선택)
                            </SubTitle>
                            <PointText fontSize={14} fontColor={colors.activeRed} marginTop={10}>※기본제공</PointText>
                        </SubContent>
                    </SubContentBox>
                </Content>
            </Wrap>

            {/* Section 2 */}
            {!isMobile &&
            <Wrap height={780} bgColor={colors.deepWhite} isMobile={isMobile}>
                <Content>

                    <ImageBox>
                        <AppImage src={content2}/>
                    </ImageBox>
                </Content>
            </Wrap>
            }
            {isMobile && <MobileSwiperSection />}


            {/* Section 3 */}
            <Wrap height={620}>
                <Content width={isMobile ? '100%' : 'auto'}>
                    <SubContentBox flexDirection={isMobile} Sec3_isMobile={isMobile}>
                        <SubContent Sec3_isMobile={isMobile}>
                            <Title fontSize={36} marginBottom={33} textAlign={"left"} Sec3_isMobile={!!isMobile}>
                                맞춤형 고객관리,<br/>
                                온라인 고객응대
                            </Title>
                            <SubTitle fontcolor={colors.normalBlack} fontWeight={400} textAlign={"left"}
                                      Sec3_isMobile={!!isMobile}>
                                캣벨 유니온 솔루션에서 제공하는<br/>
                                화상 회의를 활용해보세요.
                            </SubTitle>
                            <SubTitle fontcolor={colors.normalBlack} fontWeight={400} textAlign={"left"}
                                      Sec3_isMobile={!!isMobile}>
                                향후 마케팅 및 재구매 유도를 위한<br/>
                                지속적인 고객 관리가 가능합니다.
                            </SubTitle>
                        </SubContent>
                        <ImageBox width={isMobile ? '100%' : '640px'}>
                            <AppImage src={content3}/>
                        </ImageBox>
                    </SubContentBox>
                </Content>
            </Wrap>

            {/* Section 4 */}
            <Wrap height={734} bgColor={colors.deepWhite}>
                <Content flexDirection={"column"}>
                    <Title fontSize={24} fontColor={colors.normalBlack2} marginBottom={41}>
                        이제 화상회의도 라이브로 스트리밍하세요!
                    </Title>
                    <SubContentBox Sec4_isMobile={isMobile}>
                        <ImageBox>
                            <AppImage src={content4}/>
                        </ImageBox>
                    </SubContentBox>
                </Content>
            </Wrap>

            {/* Section 5 */}
            <Wrap height={620}>
                <Content width={isMobile ? 375 :1170} paddingRight={10}>
                    <SubContentBox flexDirection={isMobile && 'column-reverse'}>
                        <ImageBox maxWidth={680}>
                            <AppImage src={content5}/>
                        </ImageBox>
                        <SubContent>
                            <Title fontSize={36} fontColor={colors.lightBlack} textAlign={"right"} marginBottom={33}>
                                흩어져 있는 판매 채널 <br/>
                                통합 솔루션
                            </Title>
                            <SubTitle fontcolor={colors.normalBlack} textAlign={"right"} marginBottom={12}>
                                매출을 극대화하기 위해서는<br/>
                                더 많은, 더 다양한 고객과 마주해야 합니다.
                            </SubTitle>

                            <SubTitle fontcolor={colors.normalBlack} textAlign={"right"} marginBottom={140}>
                                매출 극대화를 위해<br/>
                                흩어져 있는 오픈마켓 링크들을 한데<br/>
                                모아보세요.
                            </SubTitle>
                        </SubContent>
                    </SubContentBox>
                </Content>
            </Wrap>

            {/* Section 6 */}
            <Wrap height={584} bgColor={colors.deepWhite}>
                <Content width={1200} paddingLeft={10}>
                    <SubContentBox justifyContent={"flex-end"}>
                        <SubContent marginRight={50}>
                            <Title fontSize={36} marginBottom={33} fontColor={colors.lightBlack} textAlign={"left"}>
                                판매 제품과 관련된<br/>
                                홍보 영상 클립 추가
                            </Title>
                            <SubTitle fontcolor={colors.normalBlack} marginBottom={8} textAlign={"left"}>
                                판매 중인 제품과 관련된 홍보 영상을 모아서<br/>
                                보여주고 싶다면 <PointText fontSize={19} display={"inline-block"}
                                                    fontColor={colors.activeRed}>임베드기능</PointText>을 활용해 보세요.
                            </SubTitle>
                            <SubTitle fontcolor={colors.normalBlack} textAlign={"left"}>
                                추가적인 비용 지출 없이<br/>
                                효과적인 마케팅 효과를 누릴 수 있습니다.
                            </SubTitle>
                        </SubContent>
                        <ImageBox maxWidth={680}>
                            <AppImage src={content6}/>
                        </ImageBox>
                    </SubContentBox>
                </Content>
            </Wrap>

            {/* Section 7 */}
            <Wrap height={620}>
                <Content width={1170} paddingRight={10}>
                    <SubContentBox>
                        <ImageBox>
                            <AppImage src={content7}/>
                        </ImageBox>
                        <SubContent>
                            <Title fontSize={36} fontColor={colors.lightBlack} marginBottom={33} textAlign={"right"}>
                                독자적인 판매 채널<br/>
                                쇼핑몰 서비스 지원
                            </Title>
                            <SubTitle marginBottom={12} textAlign={"right"}>
                                판매 중인 제품군이 유통 채널을 이용하기 힘들거나, <br/>
                                판매 제품이 너무 많아 통합할 필요가 있는 경우, <br/>
                                캣벨 유니온 솔루션의 쇼핑몰 서비스를 이용해보세요.
                            </SubTitle>
                            <SubTitle marginBottom={80} textAlign={"right"}>
                                <PointText display={"inline-block"} fontColor={colors.activeBlue} fontSize={19}>독자적인 판매
                                    채널 확보</PointText>를 통해<br/>
                                효과적인 제품 노출 및 고객 이벤트&프로모션 진행에도<br/>
                                용이합니다.
                            </SubTitle>
                        </SubContent>
                    </SubContentBox>
                </Content>
            </Wrap>

            {/* Section 8 */}
            <Wrap height={462} bgImage={content8}>
                <Content flexDirection={"column"}>
                    <Title textAlign={"center"} fontSize={24} fontColor={colors.lightBlack} marginBottom={16}>
                        CATBELL UNION<br/>
                        솔루션 가격제안
                    </Title>
                    <SubTitle fontSize={16} fontcolor={colors.normalBlack} marginBottom={10}>
                        고객관리와 고객 응대를 위한 화상회의는 기본,<br/>
                        저렴한 비용으로 제품 홍보/마케팅 및 쇼핑몰까지 캣벨 유니온 솔루션으로 한 번에 이용해보세요.
                    </SubTitle>
                    <SubTitle fontSize={24} fontcolor={colors.lightBlack} marginBottom={65}>
                        070-4515-6313
                    </SubTitle>
                    <Link href={"mailto:stan@catbellcompany.com"}>
                        <a>
                            <QnaButton>
                                캣벨유니온 문의하기
                                <MailText>stan@catbellcompany.com</MailText>
                            </QnaButton>
                        </a>
                    </Link>
                </Content>
            </Wrap>
        </>
    )
}

export default UnionContent;