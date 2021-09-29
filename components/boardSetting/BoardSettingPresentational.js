import React, {useState, useEffect} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import ContentTitle from "../../share/components/ContentTitle";
import triangleArrowSvg from "/public/images/share/triangleArrow.svg";
import OrderButton from "../../share/components/OrderButton";
import LongButton from "../../share/components/LongButton";
import AddBoardSettingModal from "../../share/modal/AddBoardSettingModal";
import {Modal} from "@material-ui/core";

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
const BorderWrapper = styled.div`
  width: 100%;
  margin: 30px 0 20px;
  padding-top: 2px;
  border-top: 3px solid ${colors.loginDefaultFont};
  border-bottom: 1px solid ${colors.loginTabBorder};
`;
const BoardBox = styled.div`
  max-height: 50px;
  padding: 15px 10px;
  overflow: hidden;
  border-top: 1px solid ${colors.loginTabBorder};
  transition: 0.8s;

  ${({detailView}) => detailView && css`
    max-height: 800px;
    overflow-y: scroll;
  `}
`;
const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.label`
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  position: relative;
  cursor: pointer;
`;
const CheckBox = styled.input`
  width: 0;
  height: 0;
  position: absolute;
  cursor: pointer;

  &:checked {
    &:after {
      content: "✓";
      text-align: center;
      width: 20px;
      height: 20px;
      background: ${colors.activeChecked};
      position: absolute;
      top: -1px;
      left: -1px;
      border-radius: 5px;
    }
  }
`;
const InfoBox = styled.span`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const UploadDate = styled.div`
  width: 20%;
  text-align: center;
  color: ${colors.loginDefaultFont};
`;
const Title = styled.div`
  width: 72%;
  color: ${colors.chatDefaultColor};
`;
const ArrowBox = styled.div`
  width: 24px;
  height: 24px !important;
  margin-top: 1px;
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const DetailBox = styled.div`
  padding-top: 10px;
  width: 100%;

  //display: none;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${({justify}) => justify};
  align-items: center;
`;
const ImageBox = styled.div`
  width: 100%;
  height: 430px;
  margin: 15px 0;

  @media screen and (max-width: 420px) {
    height: 300px;
  }
`;
const BoardContent = styled.div`
  color: ${colors.blackColor};
  font-size: 14px;
`;

const BoardComponent = ({
                            board,
                            allDetailClose,
                            setAllDetailClose,

                        }) => {
    const [detailView, setDetailView] = useState(false);
    const toggleDetailView = () => {
        setAllDetailClose(!allDetailClose);

        if (allDetailClose) {
            setDetailView(false);
        }

        setDetailView(!detailView);
    }

    return (
        <BoardBox detailView={detailView}>
            <BoardHeader>
                <Label htmlFor={board.id}><CheckBox id={board.id} type="checkbox"/></Label>
                <InfoBox onClick={toggleDetailView}>
                    <UploadDate>{board.date}</UploadDate>
                    <Title>{board.subject}</Title>
                    <ArrowBox><AppImage src={triangleArrowSvg}/></ArrowBox>
                </InfoBox>
            </BoardHeader>
            <DetailBox>
                <ButtonGroup justify="flex-end">
                    <OrderButton width={62} height={34} bgColor={colors.corpMainBorder}
                                 color={colors.chatDefaultColor}>수정</OrderButton>
                </ButtonGroup>
                <ImageBox>
                    <AppImage src={board.image_path}/>
                </ImageBox>
                <BoardContent>
                    {board.content}
                </BoardContent>
            </DetailBox>
        </BoardBox>
    )
}

const BoardSettingPresentational = ({
                                        boardData,
                                        allDetailClose,
                                        setAllDetailClose,

                                        addBoardOpen,
                                        handleAddBoardOpen,
                                        handleAddBoardClose
                                    }) => {

    return (
        <Wrapper>
            <ContentBox>
                <ContentTitle padding="0 0 0 10px" setting>게시판 관리</ContentTitle>
                <SubTitle>게시글을 등록하시면 메인화면 게시판에 업로드됩니다.</SubTitle>
                <BorderWrapper>
                    {boardData.map(board =>
                        <BoardComponent
                            key={board.id}
                            board={board}
                            allDetailClose={allDetailClose}
                            setAllDetailClose={setAllDetailClose}
                        />)}
                </BorderWrapper>
                <ButtonGroup justify="space-between">
                    <OrderButton
                        width={62}
                        height={34}
                        border={`1px solid ${colors.footerText}`}
                        bgColor={colors.whiteColor}
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
                    />
                </>
            </Modal>
        </Wrapper>
    )
}

export default BoardSettingPresentational;