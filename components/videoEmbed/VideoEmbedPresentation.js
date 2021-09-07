import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import OrderButton from "../../share/components/OrderButton";
import ContentTitle from "../../share/components/ContentTitle";
import Sortable from "../../share/sortable/Sortable";
import LongButton from "../../share/components/LongButton";
import {Modal} from "@material-ui/core";
import AddVideoEmbedModal from "../../share/modal/AddVideoEmbedModal";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  background: ${colors.tabMenu};
`;
const ContentBox = styled.div`
  width: 500px;
  min-height: 500px;
  border-radius: 12px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};
`;
const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SubTitle = styled.div`
  color: ${colors.deepDarkGray};
  font-size: 14px;
`;
const SortableBox = styled.div`
  margin-top: 20px;
`;
const NonePost = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${colors.chatDefaultColor};
  font-weight: bold;
  background: #fff;
`;
const ButtonGroup = styled.div`
  max-width: 500px;
  margin: 30px auto 0;
`;


const VideoEmbedPresentation = ({
                                    videoList,
                                    editOrder,
                                    deleteCard,
                                    onSortEnd,
                                    userInfo,
                                    updateOrder,
                                    handleEditOrder,
                                    openModal,
                                    handleOpenModal,
                                    handleCloseModal,
                                    goBack,
                                    subject,
                                    explain,
                                    videoUrl,
                                    modalInputOnChange,
                                    onVideoUpload
                                }) => {
    return (
        <Wrapper>
            <ContentTitle
                height="80px"
                padding="20px 30px"
                beforePosition
            >동영상 임베드</ContentTitle>
            <ContentBox>
                <ContentTop>
                    <SubTitle>영상링크를 등록하시면 메인화면에 자동으로 보여집니다.</SubTitle>
                    <OrderButton
                        width={95}
                        height={30}
                        bgColor={colors.deepDarkGray}
                        fontColor={colors.whiteColor}
                        editOrder={editOrder}
                        handleEditOrder={handleEditOrder}
                    >
                        {editOrder ? '순서 저장' : '순서 변경'}
                    </OrderButton>
                </ContentTop>
                <SortableBox>
                    {videoList ?
                        <Sortable
                            itemList={videoList}
                            sort={editOrder}
                            deleteCard={deleteCard}
                            onSortEnd={onSortEnd}
                            userInfo={userInfo}
                            videoEmbed
                        />
                        :
                        <NonePost>등록된 동영상이 없습니다.</NonePost>
                    }
                </SortableBox>
            </ContentBox>
            <ButtonGroup>
                <LongButton
                    fontColor={colors.deepDarkBlue}
                    border={`1px solid ${colors.deepDarkBlue}`}
                    bgColor={colors.whiteColor}
                    onClick={handleOpenModal}
                >영상등록하기 +
                </LongButton>
                <LongButton
                    fontColor={colors.whiteColor}
                    bgColor={colors.deepDarkBlue}
                >완료
                </LongButton>
                <LongButton
                    fontColor={colors.normalGray}
                    border={`1px solid ${colors.loginDefaultFont}`}
                    bgColor={colors.whiteColor}
                    onClick={goBack}
                >취소
                </LongButton>
            </ButtonGroup>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <AddVideoEmbedModal
                        handleCloseModal={handleCloseModal}
                        subject={subject}
                        explain={explain}
                        videoUrl={videoUrl}
                        modalInputOnChange={modalInputOnChange}
                        onVideoUpload={onVideoUpload}
                    />
                </>
            </Modal>
        </Wrapper>
    )
}

export default VideoEmbedPresentation;