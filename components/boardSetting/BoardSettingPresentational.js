import React, {useState, useEffect} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import ContentTitle from "../../share/components/ContentTitle";
import triangleArrowSvg from "/public/images/share/triangleArrow.svg";
import OrderButton from "../../share/components/OrderButton";
import LongButton from "../../share/components/LongButton";
import AddBoardSettingModal from "../../share/modal/AddBoardSettingModal";
import {Modal} from "@material-ui/core";
import Board from "../../share/components/Board";

const Wrapper = styled.div`
  width: 100%;

  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;
const ContentBox = styled.div`
  max-width: 530px;
  min-height: 500px;
  margin: 25px auto;
  padding: 20px 10px;
  border: 1px solid ${colors.corpMainBorder};
  box-shadow: 0 0 10px ${colors.ultraLightGray};
`;
const SubTitle = styled.div`
  color: ${colors.deepDarkGray};
  padding-left: 5px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${({justify}) => justify};
  align-items: center;
`;

const BoardSettingPresentational = ({
                                        userInfo,
                                        boardData,
                                        checkedBoard,
                                        toggleClicked,
                                        toggleVisible,
                                        onCheckedHandler,
                                        deleteBoard,
                                        imageFile,
                                        onImageUpload,
                                        onImageDelete,

                                        addBoardOpen,
                                        handleAddBoardOpen,
                                        handleAddBoardClose
                                    }) => {
    return (
        <Wrapper>
            <ContentBox>
                <ContentTitle padding="0 0 0 10px" setting>게시판 관리</ContentTitle>
                <SubTitle>게시글을 등록하시면 메인화면 게시판에 업로드됩니다.</SubTitle>

                <Board
                    userInfo={userInfo}
                    boardData={boardData}
                    toggleClicked={toggleClicked}
                    toggleVisible={toggleVisible}
                    onCheckedHandler={onCheckedHandler}
                />

                <ButtonGroup justify="space-between">
                    <OrderButton
                        width={62}
                        height={34}
                        border={checkedBoard.size > 0 ? 'none' : `1px solid ${colors.footerText}`}
                        bgColor={checkedBoard.size > 0 ? colors.activePink : colors.whiteColor}
                        fontColor={checkedBoard.size > 0 ? colors.whiteColor : colors.chatDefaultColor}
                        onClick={deleteBoard}
                    >삭제</OrderButton>
                    <OrderButton
                        width={104}
                        height={34}
                        bgColor={colors.activeOrange}
                        fontColor={colors.whiteColor}
                        onClick={handleAddBoardOpen}
                    >게시물 등록</OrderButton>
                </ButtonGroup>
            </ContentBox>
            <LongButton
                maxWidth={530}
                height={50}
                fontColor={colors.whiteColor}
                bgColor={colors.deepDarkBlue}
                margin="36px auto 0"
            >저 장</LongButton>

            <Modal
                open={addBoardOpen}
                onClose={handleAddBoardClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <AddBoardSettingModal
                        handleAddBoardClose={handleAddBoardClose}
                        imageFile={imageFile}
                        onImageUpload={onImageUpload}
                        onImageDelete={onImageDelete}
                    />
                </>
            </Modal>
        </Wrapper>
    )
}

export default BoardSettingPresentational;