import React from 'react';
import styled, {css} from "styled-components";
import {BsFillQuestionCircleFill} from "react-icons/bs";
import Sortable from "../../share/sortable/Sortable";
import colors from "../../styles/colors";
import plus from '/public/images/linkBinder/plus.png';
import LongButton from "../../share/components/LongButton";
import * as constants from "../../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const ContentBox = styled.div`
  max-width: 530px;
  min-height: 70vh;
  margin: 10px auto;
  padding: 24px 16px 30px;
  text-align: left;
  overflow-y: scroll;
`;
const Title = styled.div`
  font-size: 16px;
  color: ${colors.chatDefaultColor};
  position: relative;
  margin-bottom: 10px;
`;
const SubText = styled.span`
  font-size: 12px;
  color: ${colors.normalGray};
`;
const ButtonGroup = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: -5px;
`;
const SmallButton = styled.button`
  width: ${({width}) => width};
  height: ${({height}) => height}px;
  background: ${props => props.editOrder ? colors.deepDarkGray : props.bgColor};
  border-radius: 5px;
  color: ${props => props.editOrder ? colors.whiteColor : props.color};
  font-size: 14px;
  font-weight: ${props => props.editOrder ? 'bold' : props.fontWeight};
  border: ${props => props.editOrder ? '1px solid ' + colors.deepDarkGray : 'none'};
  cursor: pointer;
  
  & + & {
    margin-left: 10px;
  }
`;

const IconSvg = styled.img`
  margin: 0 5px;
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
const ToolTip = styled.span`
  font-size: 16px;
  color: ${colors.deepDarkGray};

  &:hover {
    cursor: help;
  }
`;
const ToolTipBox = styled.div`
  width: 220px;
  font-size: 12px;
  color: ${colors.lightBlack};
  border-radius: 5px;
  border: 1px solid ${colors.chatDefaultColor};
  word-break: keep-all;
  background: ${colors.whiteColor};
  padding: 10px;
  position: absolute;
  top: 3px;
  right: 75px;
  z-index: 1;
  visibility: hidden;

  ${ToolTip}:hover & {
    visibility: visible;
  }
`;

function LinkContents({
                          linkList,
                          editOrder,
                          userInfo,
                          router,
                          goPage,
                          onSortEnd,
                          deleteCard,
                          handleEditOpen,
                          handleEditCancel,
                          handleEditComplete,
                          onChangeSecure,
                      }) {
    return (
        <ContentBox>
            {userInfo && userInfo.user_type === 'admin' &&
            <>
                <Title>링크추가</Title>
                <LongButton
                    fontSize={14}
                    marginBottom={40}
                    costumeBgColor="linear-gradient(94.85deg, #2054A5 -10.42%, #1B3A6A 94.56%)"
                    fontColor={colors.whiteColor}
                    onClick={() => router.push(`/linkbinder/${userInfo.corp_name}/addlink`)}
                >
                    <IconSvg src={plus}/>포스트 추가하기
                </LongButton>
                <Title>
                    링크수정&nbsp;
                    <SubText>(링크를 눌러 수정하세요.)
                        <ToolTip>
                            <BsFillQuestionCircleFill/>
                            <ToolTipBox>
                                수정하기를 클릭 후 링크를 누르시면 수정페이지로 이동됩니다.<br/>
                                오른쪽 위,아래 아이콘을 드래그하시면 순서가 변경됩니다.<br/>
                                등록한 링크는 최대 10개까지 노출됩니다.
                            </ToolTipBox>
                        </ToolTip>
                    </SubText>
                    <ButtonGroup>
                        {editOrder
                            ?
                            <>
                                <SmallButton
                                    width={"100px"}
                                    height={30}
                                    color={colors.chatDefaultColor}
                                    bgColor={colors.orangeColor}
                                    onClick={handleEditCancel}
                                >
                                    취 소
                                </SmallButton>
                                <SmallButton
                                    width={"100px"}
                                    height={30}
                                    color={colors.chatDefaultColor}
                                    bgColor={colors.ultraLightGray}
                                    position
                                    editOrder={editOrder}
                                    onClick={() => {
                                        handleEditComplete();
                                    }}
                                >
                                    수정완료
                                </SmallButton>
                            </>
                            : <SmallButton
                                width={"100px"}
                                height={30}
                                color={colors.chatDefaultColor}
                                bgColor={colors.ultraLightGray}
                                position
                                editOrder={editOrder}
                                onClick={() => {
                                    handleEditOpen();
                                }}
                            >
                                수정하기
                            </SmallButton>
                        }
                    </ButtonGroup>
                </Title>
            </>
            }

            <SortableBox>
                {linkList && linkList.length !== 0
                    ?
                    <Sortable
                        itemList={linkList}
                        sort={editOrder}
                        deleteCard={deleteCard}
                        onSortEnd={onSortEnd}
                        userInfo={userInfo}
                        onChangeSecure={onChangeSecure}
                        linkBinder
                    />
                    :
                    <NonePost>등록된 포스트가 없습니다.</NonePost>
                }
            </SortableBox>
        </ContentBox>
    );
}

export default LinkContents;
