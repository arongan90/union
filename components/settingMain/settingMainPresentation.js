import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import ContentTitle from "../../share/components/ContentTitle";
import LongButton from "../../share/components/LongButton";
import Sortable from "../../share/sortable/Sortable";
import {Modal} from "@material-ui/core";
import AddMainSettingModal from "../../share/modal/AddMainSettingModal";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 16px;
  background: ${colors.tabMenu};
`;
const ContentBox = styled.div`
  max-width: 530px;
  border-radius: 12px;
  padding: 20px 15px;
  margin: 0 auto;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};
`;
const Subtitle = styled.div`
  color: ${colors.deepDarkGray};
  font-size: 14px;
  margin-bottom: 30px;
`;
const SortableBox = styled.div`
  margin: 10px 0;
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
const ButtonGroup = styled.div`
  max-width: 530px;
  margin: 36px auto;
`;

const SettingMainPresentation = ({
                                     addLinkOpen,
                                     handleAddLinkOpen,
                                     handleAddLinkClose,
                                     tabActive,
                                     onImageTab,
                                     onVideoTab,
                                     imageFileList,
                                     handleUploadImage,
                                     handleDeleteImage,
                                     videoUrl_1,
                                     videoUrl_2,
                                     videoUrl_3,
                                     onVideoUrlChange,
                                     onReset,
                                     handleImageUpload,
                                     handleVideoUpload,
                                     introduction,
                                     onIntroductionChange,
                                     handleMainSettingComplete,
                                 }) => {
    return (
        <Wrapper>
            <ContentBox>
                <ContentTitle
                    padding="0 0 0 10px"
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
                >추가 +</LongButton>
            </ContentBox>
            <SortableBox>
                {/*<Sortable

                />*/}
            </SortableBox>
            <ContentBox>
                <ContentTitle padding="0 0 0 10px">소개글</ContentTitle>
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
            <ButtonGroup>
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
                        imageFileList={imageFileList}
                        handleUploadImage={handleUploadImage}
                        handleDeleteImage={handleDeleteImage}
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