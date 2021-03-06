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
                          toggleVisible
                      }) {
    return (
        <ContentBox>
            {userInfo && userInfo.user_type === 'admin' &&
            <>
                <LongButton
                    height={54}
                    fontSize={14}
                    marginBottom={40}
                    costumeBgColor="linear-gradient(94.85deg, #2054A5 -10.42%, #1B3A6A 94.56%)"
                    fontColor={colors.whiteColor}
                    onClick={() => router.push(`/linkbinder/${userInfo.corp_name}/addlink`)}
                >
                    <IconSvg src={plus}/>????????? ????????????
                </LongButton>
                <Title>
                    ????????????&nbsp;
                    <SubText>(????????? ?????? ???????????????.)
                        <ToolTip>
                            ??????????????? ?????? ??? ????????? ???????????? ?????????????????? ???????????????.<br/>
                            ????????? ???,?????? ???????????? ?????????????????? ????????? ???????????????.<br/>
                            ????????? ????????? ?????? 10????????? ???????????????.
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
                                    ??? ???
                                </OrderButton>
                                <OrderButton
                                    width={120}
                                    height={25}
                                    fontColor={colors.whiteColor}
                                    bgColor={colors.deepOrange}
                                    editOrder={editOrder}
                                    onClick={handleEditComplete}
                                >
                                    ????????????
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
                                ????????????
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
                        toggleVisible={toggleVisible}
                    />
                    :
                    <NonePost>????????? ???????????? ????????????.</NonePost>
                }
            </SortableBox>
        </ContentBox>
    );
}

export default LinkContents;
