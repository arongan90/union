import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import ContentTitle from "../../share/components/ContentTitle";
import LongButton from "../../share/components/LongButton";
import Sortable from "../../share/sortable/Sortable";
import {Modal} from "@material-ui/core";
import AddMainSettingModal from "../../share/modal/AddMainSettingModal";
import addImageSvg from "/public/images/share/addImage.svg";
import OrderButton from "../../share/components/OrderButton";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 16px 0 30px;
  background: ${colors.tabMenu};
  
  @media screen and (max-width: 767px) {
    padding: 16px 10px 30px;
  }
`;
const ContentBox = styled.div`
  max-width: 530px;
  border-radius: 12px;
  padding: 20px 15px;
  margin: 0 auto;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};

  & + & {
    margin-top: 10px;
  }

  @media screen and (max-width: 767px) {
    padding: 20px 10px;
  }
`;
const Subtitle = styled.div`
  color: ${colors.deepDarkGray};
  font-size: 14px;
  margin-bottom: 30px;
`;
const SortableBox = styled.div`
  margin: 10px auto;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 160px;
  resize: none;
  outline: none;
  padding: 10px;
  border: 1px solid ${colors.ultraLightGray};
  border-radius: 7px;

  &::placeholder {
    color: ${colors.inputBorder};
  }
`;

const AddLogoLabel = styled.label`
  width: 100%;
  height: 120px;
  display: block;
  border: 1px solid ${colors.ultraLightGray};
  border-radius: 7px;
  position: relative;
  background: url(${addImageSvg}) no-repeat 50% 40%;

  &:after {
    content: "로고 이미지 추가";
    color: ${colors.loginTabBorder};
    font-size: 16px;
    position: absolute;
    z-index: -1;
    top: 60%;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
const LogoPreviewBox = styled.img`
  width: 300px;
  height: 100px;
  margin: 10px auto;
  display: block;
  object-fit: cover;
`;
const LogoFileInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  max-width: 530px;
  margin: ${({margin}) => margin};
  text-align: right;
`;

const SettingMainPresentation = ({
                                     userInfo,
                                     settingList,
                                     addLinkOpen,
                                     handleAddLinkOpen,
                                     handleAddLinkClose,
                                     tabActive,
                                     onImageTab,
                                     onVideoTab,
                                     fileList,
                                     handleUploadImage,
                                     handleDeleteImage,
                                     handleDeleteUrl,
                                     videoUrl_1,
                                     videoUrl_2,
                                     videoUrl_3,
                                     onVideoUrlChange,
                                     onReset,
                                     handleImageUpload,
                                     handleVideoUpload,
                                     introduction,
                                     onIntroductionChange,
                                     logoFile,
                                     handleLogoUpload,

                                     editOrder,
                                     onSortEnd,
                                     handleEditOpen,
                                     handleEditCancel,
                                     handleEditComplete,


                                     handleMainSettingComplete,
                                 }) => {

    return (
        <Wrapper>
            <ContentBox>
                <ContentTitle
                    padding="0 0 0 10px"
                    settingMain
                >
                    메인화면 설정
                </ContentTitle>
                <Subtitle>
                    영상링크를 등록하시면 메인화면에 자동으로 보여집니다.
                </Subtitle>
                <LongButton
                    fontColor={colors.deepDarkBlue}
                    bgColor={colors.ultraLightGray}
                    fontSize={16}
                    border={`1px solid ${colors.shadowColor}`}
                    onClick={handleAddLinkOpen}
                >추가 +
                </LongButton>
                <ButtonGroup margin="20px auto 10px">
                    {editOrder ?
                        <>
                            <OrderButton
                                width={120}
                                height={25}
                                fontColor={colors.deepDarkBlue}
                                bgColor={colors.ultraLightGray}
                                onClick={handleEditCancel}
                            >취 소
                            </OrderButton>
                            <OrderButton
                                width={120}
                                height={25}
                                fontColor={colors.whiteColor}
                                bgColor={colors.deepOrange}
                                onClick={handleEditComplete}
                            >수정완료
                            </OrderButton>
                        </>
                        :
                        <OrderButton
                            width={120}
                            height={25}
                            fontColor={colors.deepBlueBorder}
                            bgColor={colors.whiteColor}
                            border={`1px solid ${colors.deepBlueBorder}`}
                            onClick={handleEditOpen}
                        >수정하기
                        </OrderButton>
                    }
                </ButtonGroup>
                <SortableBox>
                    <Sortable
                        userInfo={userInfo}
                        itemList={settingList}
                        sort={editOrder}
                        onSortEnd={onSortEnd}
                    />
                </SortableBox>
            </ContentBox>
            <ContentBox>
                <ContentTitle padding="0 0 0 10px" settingMain>소개글</ContentTitle>
                <Subtitle>소개글을 등록하시면 메인화면에 보여집니다. (300자 이내)</Subtitle>
                <TextArea
                    name="introduction"
                    placeholder="소개글을 등록해주세요."
                    maxLength={300}
                    value={introduction}
                    onChange={onIntroductionChange}
                >
                </TextArea>
            </ContentBox>

            <ContentBox>
                <ContentTitle padding="0 0 0 10px" settingMain>로고이미지 설정</ContentTitle>
                <Subtitle>로고 이미지를 120x40px사이즈로 올려주세요. (svg, jpeg, png)</Subtitle>
                <AddLogoLabel htmlFor="logoInput">
                    <LogoFileInput
                        id="logoInput"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                    />
                    {!!logoFile && <LogoPreviewBox src={logoFile}/>}
                </AddLogoLabel>
            </ContentBox>

            <ButtonGroup
                margin="36px auto"
            >
                <LongButton
                    fontColor={colors.whiteColor}
                    bgColor={colors.deepDarkBlue}
                    onClick={handleMainSettingComplete}
                >저 장</LongButton>
            </ButtonGroup>

            <Modal
                open={addLinkOpen}
                onClose={handleAddLinkClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <AddMainSettingModal
                        handleAddLinkClose={handleAddLinkClose}
                        tabActive={tabActive}
                        onImageTab={onImageTab}
                        onVideoTab={onVideoTab}
                        fileList={fileList}
                        handleUploadImage={handleUploadImage}
                        handleDeleteImage={handleDeleteImage}
                        handleDeleteUrl={handleDeleteUrl}
                        videoUrl_1={videoUrl_1}
                        videoUrl_2={videoUrl_2}
                        videoUrl_3={videoUrl_3}
                        onVideoUrlChange={onVideoUrlChange}
                        onReset={onReset}
                        handleImageUpload={handleImageUpload}
                        handleVideoUpload={handleVideoUpload}
                    />
                </>
            </Modal>
        </Wrapper>
    )
}

export default SettingMainPresentation;