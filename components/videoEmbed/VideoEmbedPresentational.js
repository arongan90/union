import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import OrderButton from "../../share/components/OrderButton";
import ContentTitle from "../../share/components/ContentTitle";
import Sortable from "../../share/sortable/Sortable";
import LongButton from "../../share/components/LongButton";
import {Modal} from "@material-ui/core";
import AddVideoEmbedModal from "../../share/modal/AddVideoEmbedModal";
import ToolTip from "../../share/components/ToolTip";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 16px;
  background: ${colors.tabMenu};
  
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;
const ContentBox = styled.div`
  max-width: 500px;
  min-height: 500px;
  border-radius: 12px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};

  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;
const ContentTop = styled.div`
   margin: 10px 0 20px;
  text-align: right;
`;
const SubTitle = styled.div`
  position: relative;
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
const LineChange = styled.br`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const VideoEmbedPresentational = ({
                                    videoList,
                                    editOrder,
                                    deleteCard,
                                    onSortEnd,
                                    userInfo,
                                    handleEditOpen,
                                    handleEditCancel,
                                    handleEditComplete,
                                    openModal,
                                    handleOpenModal,
                                    handleCloseModal,
                                    subject,
                                    explain,
                                    videoUrl,
                                    videoInputsChange,
                                    onVideoUpload,
                                    handleUpdateOpen,
                                    handleRadioChange,
                                    isOpen,
                                    editData
                                }) => {
    return (
        <Wrapper>
            <ContentTitle
                height="150px"
                padding="20px 30px"
                beforePosition
            >????????? ?????????
                <LongButton
                    fontColor={colors.whiteColor}
                    bgColor={colors.deepDarkBlue}
                    marginTop={30}
                    onClick={handleOpenModal}
                >?????????????????? +
                </LongButton>
            </ContentTitle>
            <ContentBox>
                <SubTitle>
                    ??????????????? ??????????????? <LineChange /> ??????????????? ???????????? ???????????????.
                    <ToolTip>
                        ??????????????? ?????? ??? ????????? ???????????? ????????? ????????? ???????????? ??? ????????????.<br/>
                        ????????? ???,?????? ???????????? ?????????????????? ????????? ???????????????.<br/>
                        ????????? ???????????? ?????? 4????????? ??????????????? ???????????? ??? ????????????.
                    </ToolTip>
                </SubTitle>
                <ContentTop>
                    {editOrder ?
                        <>
                            <OrderButton
                                width={100}
                                height={30}
                                fontColor={colors.whiteColor}
                                bgColor={colors.orangeYellow}
                                editOrder={editOrder}
                                onClick={handleEditCancel}
                            >
                                ??? ???
                            </OrderButton>
                            <OrderButton
                                width={100}
                                height={30}
                                fontColor={colors.whiteColor}
                                bgColor={colors.chatDefaultColor}
                                editOrder={editOrder}
                                onClick={handleEditComplete}
                            >
                                ????????????
                            </OrderButton>
                        </>
                        : <OrderButton
                            width={100}
                            height={30}
                            fontColor={colors.chatDefaultColor}
                            bgColor={colors.whiteColor}
                            border={`1px solid ${colors.chatDefaultColor}`}
                            editOrder={editOrder}
                            onClick={handleEditOpen}
                        >
                            ????????????
                        </OrderButton>
                    }
                </ContentTop>
                <SortableBox>
                    {videoList ?
                        <Sortable
                            videoEmbed
                            itemList={videoList}
                            sort={editOrder}
                            deleteCard={deleteCard}
                            onSortEnd={onSortEnd}
                            userInfo={userInfo}
                            handleUpdateOpen={handleUpdateOpen}
                        />
                        :
                        <NonePost>????????? ???????????? ????????????.</NonePost>
                    }
                </SortableBox>
            </ContentBox>

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
                        videoInputsChange={videoInputsChange}
                        onVideoUpload={onVideoUpload}
                        editOrder={editOrder}
                        handleRadioChange={handleRadioChange}
                        isOpen={isOpen}
                        editData={editData}
                    />
                </>
            </Modal>
        </Wrapper>
    )
}

export default VideoEmbedPresentational;