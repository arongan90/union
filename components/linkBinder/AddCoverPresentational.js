import React from 'react';
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import ContentTitle from "../../share/components/ContentTitle";
import FileUpload from "../../share/fileUpload/FileUpload";
import youtubeIcon from '/public/images/linkBinder/youtubeIcon.png';
import instaIcon from '/public/images/linkBinder/instaIcon.png';
import naverIcon from '/public/images/linkBinder/naverIcon.png';
import kakaoIcon from '/public/images/linkBinder/kakaoIcon.png';
import LongButton from "../../share/components/LongButton";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 16px 0 50px;
  background: ${colors.tabMenu};
  
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;
const UploadBox = styled.div`
  max-width: 500px;
  border-radius: 12px;
  margin: 0 auto;
  padding: 15px 15px 70px;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};
`;
const Title = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  ${({marginTop}) => marginTop && css`
    margin-top: ${marginTop}px;
  `}
  color: ${colors.chatDefaultColor};
`;
const LinkInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const AppImage = styled.img`
  width: 30px;
  height: 30px;
`;
const InputBox = styled.div`
  width: 90%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;

  @media screen and (max-width: 767px) {
    width: 85%;
  }
`;
const LinkInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;
const ButtonGroup = styled.div`
  margin-top: 50px;
`;

const AddCover = ({
                      fileUpload,
                      handleFileUpload,
                      snsLinkChange,
                      youtubeLink,
                      instaLink,
                      blogLink,
                      kakaoLink,
                      handleCancel
                  }) => {
    return (
        <Wrapper>
            <ContentTitle
                height="80px"
                padding="20px 30px"
                beforePosition
            >커버 이미지 추가하기</ContentTitle>

            <UploadBox>
                <Title>배경이미지 등록하기</Title>
                <FileUpload
                    width={160}
                    height={120}
                    fileUpload={fileUpload}
                    handleFileUpload={handleFileUpload}
                >
                </FileUpload>

                <Title marginTop={28}>SNS 링크 추가</Title>
                <LinkInputBox>
                    <AppImage src={youtubeIcon} />
                    <InputBox>
                        <LinkInput
                            name="youtubeLink"
                            placeholder="링크 url주소를 입력해주세요."
                            value={youtubeLink}
                            onChange={snsLinkChange}
                        />
                    </InputBox>
                </LinkInputBox>
                <LinkInputBox>
                    <AppImage src={instaIcon} />
                    <InputBox>
                        <LinkInput
                            name="instaLink"
                            placeholder="링크 url주소를 입력해주세요."
                            value={instaLink}
                            onChange={snsLinkChange}
                        />
                    </InputBox>
                </LinkInputBox>
                <LinkInputBox>
                    <AppImage src={naverIcon} />
                    <InputBox>
                        <LinkInput
                            name="blogLink"
                            placeholder="링크 url주소를 입력해주세요."
                            value={blogLink}
                            onChange={snsLinkChange}
                        />
                    </InputBox>
                </LinkInputBox>
                <LinkInputBox>
                    <AppImage src={kakaoIcon} />
                    <InputBox>
                        <LinkInput
                            name="kakaoLink"
                            placeholder="링크 url주소를 입력해주세요."
                            value={kakaoLink}
                            onChange={snsLinkChange}
                        />
                    </InputBox>
                </LinkInputBox>
                <ButtonGroup>
                    <LongButton
                        fontColor={colors.whiteColor}
                        bgColor={colors.deepDarkBlue}
                    >등 록</LongButton>
                    <LongButton
                        fontColor={colors.loginDefaultFont}
                        bgColor={colors.whiteColor}
                        border={`1px solid ${colors.footerText}`}
                        onClick={handleCancel}
                    >취 소</LongButton>
                </ButtonGroup>
            </UploadBox>
        </Wrapper>
    )
}

export default AddCover;