import React, {useState} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import triangleArrowSvg from "../../public/images/share/triangleArrow.svg";
import OrderButton from "../../share/components/OrderButton";

const BorderWrapper = styled.div`
  width: 100%;
  max-height: 258px;
  margin: 30px 0 20px;
  padding-top: 2px;
  border-top: 3px solid ${colors.loginDefaultFont};
  overflow-y: scroll;
  transition: max-height 0.4s ease;
  
  ${({boardMoreView, toggleClicked}) => (boardMoreView || toggleClicked) && css`
    height: auto;
    max-height: 1000px;
    transition-timing-function: ease-in;
    transition-duration: 0.8s;
  `}

`;
const BoardBox = styled.div`
  max-height: 50px;
  padding: 15px 0;
  overflow: hidden;
  border-top: 1px solid ${colors.loginTabBorder};
  transition: max-height 0.6s ease;

  &:last-child {
    border-bottom: 1px solid ${colors.loginTabBorder};
  }

  ${({toggleClicked}) => toggleClicked && css`
    max-height: 800px;
    overflow-y: scroll;
    transition-timing-function: ease-in;
  `}

  @media screen and (max-width: 420px) {
    padding-left: 5px;
  }
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
  margin-left: 10px;
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
      position: absolute;
      top: -2px;
      left: -1px;
      border-radius: 5px;
      line-height: 1.4;
      background: ${colors.activeChecked};
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

  ${({mainComponent}) => mainComponent && css`
    width: 100%;
  `}
`;
const UploadDate = styled.div`
  width: 20%;
  text-align: center;
  color: ${colors.loginDefaultFont};

  @media screen and (max-width: 420px) {
    font-size: 14px;
  }
`;
const Title = styled.div`
  width: 72%;
  color: ${colors.chatDefaultColor};
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap;
  
  @media screen and (max-width: 420px) {
    font-size: 14px;
    padding-left: 10px;
  }
`;
const ArrowBox = styled.div`
  width: 24px;
  height: 24px !important;
  margin-top: 1px;
  transition: 0.3s;

  ${({toggleClicked}) => toggleClicked && css`
    transform: rotate(180deg);
  `}
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const DetailBox = styled.div`
  padding-top: 10px;
  width: 100%;
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


const MainBoard = ({
                       userInfo,
                       boardData,
                       toggleClicked,
                       toggleVisible,
                       onCheckedHandler,
                       boardMoreView,
                       mainComponent,
                   }) => {
    return (
        <>
            <BorderWrapper dataLength={boardData && boardData.length} boardMoreView={boardMoreView} toggleClicked={toggleClicked}>
                {boardData.map(board => (
                        <BoardBox key={board.id} toggleClicked={toggleClicked === board.id}>
                            <BoardHeader>
                                {(!mainComponent && userInfo && userInfo.user_type) === 'admin' &&
                                <Label htmlFor={board.id}>
                                    <CheckBox id={board.id} type="checkbox"
                                              onChange={e => onCheckedHandler(board.id, e)}/>
                                </Label>
                                }

                                <InfoBox onClick={() => toggleVisible(board.id)} mainComponent>
                                    <UploadDate>{board.date}</UploadDate>
                                    <Title>{board.subject}</Title>
                                    <ArrowBox toggleClicked={toggleClicked === board.id}><AppImage
                                        src={triangleArrowSvg}/></ArrowBox>
                                </InfoBox>
                            </BoardHeader>

                            <DetailBox>
                                {(!mainComponent && userInfo && userInfo.user_type) === 'admin' &&
                                <ButtonGroup justify="flex-end">
                                    <OrderButton width={62} height={34} bgColor={colors.corpMainBorder}
                                                 color={colors.chatDefaultColor}>수정</OrderButton>
                                </ButtonGroup>
                                }
                                <ImageBox>
                                    <AppImage src={board.image_path}/>
                                </ImageBox>
                                <BoardContent>
                                    {board.content}
                                </BoardContent>
                            </DetailBox>
                        </BoardBox>
                    )
                )}
            </BorderWrapper>

        </>
    )
}

export default MainBoard;