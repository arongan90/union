import React from 'react';
import styled, {css} from "styled-components";
import {BsFillQuestionCircleFill} from "react-icons/bs";
import Sortable from "../../share/sortable/Sortable";
import colors from "../../styles/colors";
import plus from '/public/images/linkBinder/plus.png';
import LongButton from "../../share/components/LongButton";
import * as constants from "../../utils/constants";
import OrderButton from "../../share/components/OrderButton";
import ToolTip from "../../share/components/ToolTip";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const ContentBox = styled.div`
  max-width: 530px;
  min-height: 500px;
  margin: 20px auto;
  padding: 24px 16px 30px;
  text-align: left;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background: ${colors.tabMenu};
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;
const Title = styled.div`
  font-size: 16px;
  color: ${colors.chatDefaultColor};
  margin-bottom: 10px;
`;
const SubText = styled.span`
  font-size: 12px;
  color: ${colors.normalGray};
`;
const ButtonGroup = styled.div`
  display: block;
  text-align: right;
  margin-top: 10px;
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
                            수정하기를 클릭 후 링크를 누르시면 수정페이지로 이동됩니다.<br/>
                            오른쪽 위,아래 아이콘을 드래그하시면 순서가 변경됩니다.<br/>
                            등록한 링크는 최대 10개까지 노출됩니다.
                        </ToolTip>
                    </SubText>
                    <ButtonGroup>
                        {editOrder ?
                            <>
                                <OrderButton
                                    width={120}
                                    height={25}
                                    fontColor={colors.deepDarkBlue}
                                    bgColor={colors.ultraLightGray}
                                    onClick={handleEditCancel}
                                >
                                    취 소
                                </OrderButton>
                                <OrderButton
                                    width={120}
                                    height={25}
                                    fontColor={colors.whiteColor}
                                    bgColor={colors.deepOrange}
                                    editOrder={editOrder}
                                    onClick={handleEditComplete}
                                >
                                    수정완료
                                </OrderButton>
                            </>
                            : <OrderButton
                                width={120}
                                height={25}
                                fontColor={colors.deepBlueBorder}
                                bgColor={colors.whiteColor}
                                border={`1px solid ${colors.deepBlueBorder}`}
                                editOrder={editOrder}
                                onClick={handleEditOpen}
                            >
                                수정하기
                            </OrderButton>
                        }
                    </ButtonGroup>
                </Title>
            </>
            }

            <SortableBox>
                {linkList && linkList.length !== 0
                    ?
                    <Sortable
                        linkBinder
                        itemList={linkList}
                        sort={editOrder}
                        deleteCard={deleteCard}
                        onSortEnd={onSortEnd}
                        userInfo={userInfo}
                    />
                    :
                    <NonePost>등록된 포스트가 없습니다.</NonePost>
                }
            </SortableBox>
        </ContentBox>
    );
}

export default LinkContents;
