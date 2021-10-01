import React, {useState, useEffect} from 'react';
import styled, {css} from "styled-components";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import Link from 'next/link';
import Router from "next/router";
import * as constants from "../../utils/constants";
import colors from "../../styles/colors";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import 'react-toastify/dist/ReactToastify.css';
import deleteSvg from "/public/images/share/delete.svg";
import sortSvg from "/public/images/share/sort.svg";
import cartSvg from "/public/images/share/cart.svg";
import viewIcon from "/public/images/share/viewIcon.png";

const serverURL = constants.config.chatServer.URL;
const serverProtocol = constants.config.chatServer.PROTOCOL;

const SortableWrap = styled.ul`
  width: 100%;
`;
const SortableBox = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
  background: ${colors.whiteColor};
  border: 1px solid ${colors.borderLightGray};
  box-shadow: 0 0 8px ${colors.borderLightGray};
`;
const DeleteIconBox = styled.div`
  width: 30px;
  height: 30px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.8s;
  backface-visibility: hidden;
  transform: rotateY(0);

  ${({sort}) => sort && css`
    transform: rotateY(180deg);
  `} @media screen and(max-width: 767 px) {
  width: 25px;
  height: 25px;
}
`;
const SortIconBox = styled.div`
  width: 30px;
  font-size: 17px;
  cursor: move;
  transition: 1s;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  transform: rotateY(-180deg);
  ${({sort}) => sort && css`
    transform: rotateY(0);
  `} @media screen and(max-width: 767 px) {
  width: 25px;
  height: 25px;
}
`;
const SortIconImage = styled.img`
  width: 100%;
  height: 100%;
`;
const ImageBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 5px ${colors.shadowColor};
`;
const EmbedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const LinkTitleBox = styled.div`
  width: 70%;
  margin: 0 10px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  color: ${colors.chatDefaultColor};

  @media screen and (max-width: 767px) {
    padding-right: 10px;
  }
`;
const LinkTitle = styled.div`
  width: 100%;
  font-size: 15px;
  color: ${colors.chatDefaultColor};
  cursor: pointer;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
const ViewCountBox = styled.div`
  font-size: 12px;
`;
const VisibleIcon = styled.span`
  font-size: 16px;
  color: ${colors.loginDefaultFont};
  vertical-align: middle;
  margin: 0 10px;

  color: ${({secure}) => secure ? colors.activeGreen : colors.activePink};

  ${({userType}) => userType && css`
    cursor: pointer;
  `}
`;
const ViewCountImage = styled.img`
  margin-right: 5px;
`;
const RightBox = styled.div`
  position: relative;
`;
const BuyButton = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 13px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.borderLightGray};
  cursor: pointer;
`;
const CartImage = styled.img`
  font-size: 13px;
`;
const VideoTitleBox = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 20px;
`;

const DragHandle = SortableHandle(() => <SortIconImage src={sortSvg}/>);
const SortableItem = SortableElement((props) => {
        const {list, sort, deleteCard, corpName, userInfo, router, linkBinder, handleUpdateOpen, toggleVisible} = props;

        return (
            <SortableBox id={list.id}>
                <ImageBox>
                    <EmbedImage
                        src={`${list.image_path ? 'http://172.16.1.192:3000' + list.image_path : 'http://img.youtube.com/vi/' + list.youtubeId + '/0.jpg'}`}
                        alt="image"/>
                    {/*<EmbedImage src={`${serverProtocol}/${serverURL}/${list.image_path}`} alt="Image" />*/}
                </ImageBox>

                {linkBinder ?
                    <>
                        <LinkTitleBox>
                            <Link href={sort ? `/linkbinder/${corpName}/addlink/${list.id}` : `${list.address}`}>
                                <a target={!sort ? "_blank" : null}>
                                    <LinkTitle>
                                        {list.title}
                                    </LinkTitle>
                                </a>
                            </Link>
                            <ViewCountBox>
                                {list.link_count}
                                {userInfo && userInfo.user_type === 'admin'
                                    ? <VisibleIcon userType={userInfo.user_type} onClick={() => toggleVisible(list.secure)}
                                                   secure={list.secure}>
                                        {list.secure ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </VisibleIcon>
                                    : <VisibleIcon secure={list.secure}>
                                        {list.secure ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </VisibleIcon>
                                }
                            </ViewCountBox>
                        </LinkTitleBox>
                    </>
                    :
                    <VideoTitleBox>
                        <LinkTitle onClick={() => sort ? handleUpdateOpen(list.id) : window.open(list.link)}>
                            {list.title}
                        </LinkTitle>
                        <ViewCountBox>
                            {userInfo && userInfo.user_type === 'admin'
                                ? <VisibleIcon userType={userInfo.user_type} onClick={() => toggleVisible(list.secure)}
                                               secure={list.secure}>
                                    {list.secure ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                </VisibleIcon>
                                : <VisibleIcon secure={list.secure}>
                                    <VisibilityIcon/>
                                </VisibleIcon>
                            }
                        </ViewCountBox>
                    </VideoTitleBox>
                }

                {userInfo && userInfo.user_type === 'admin'
                    ? <RightBox>
                        <DeleteIconBox sort={sort} onClick={() => deleteCard(list.id)}>
                            <SortIconImage src={deleteSvg}/>
                        </DeleteIconBox>
                        <SortIconBox sort={sort}>
                            <DragHandle/>
                        </SortIconBox>
                    </RightBox>
                    : <RightBox>
                        <BuyButton onClick={() => router.push(`${list.address}`)}>
                            <CartImage src={cartSvg}/>
                            BUY
                        </BuyButton>
                    </RightBox>
                }
            </SortableBox>
        )
    }
);

const SortableContainerBox = SortableContainer(({
                                                    itemList,
                                                    sort,
                                                    deleteCard,
                                                    corpName,
                                                    userInfo,
                                                    router,
                                                    linkBinder,
                                                    handleUpdateOpen,
                                                    toggleVisible,
                                                }) => {
        let visibleItemList = [];
        itemList.map(list => {
            if (list.secure === 1) {
                visibleItemList.push(list);
            }
        });

        return (
            <div>
                {userInfo && userInfo.user_type === 'admin'
                    ?
                    itemList.map((list, index) => (
                        <SortableItem
                            key={`item-${index}`}
                            list={list}
                            sort={sort}
                            index={index}
                            deleteCard={deleteCard}
                            corpName={corpName}
                            userInfo={userInfo}
                            router={router}
                            linkBinder={linkBinder}
                            handleUpdateOpen={handleUpdateOpen}
                            toggleVisible={toggleVisible}
                        />
                    ))
                    :
                    visibleItemList.map((list, index) => (
                        <SortableItem
                            key={`item-${index}`}
                            list={list}
                            sort={sort}
                            index={index}
                            deleteCard={deleteCard}
                            corpName={corpName}
                            userInfo={userInfo}
                            router={router}
                            linkBinder={linkBinder}
                            handleUpdateOpen={handleUpdateOpen}
                            toggleVisible={toggleVisible}
                        />
                    ))
                }
            </div>
        )
    }
);

const LinkSortable = (props) => {
    const {itemList, onSortEnd, sort, deleteCard, userInfo, linkBinder, handleUpdateOpen, toggleVisible} = props;

    return (
        <SortableWrap>
            <SortableContainerBox
                useDragHandle
                onSortEnd={onSortEnd}
                itemList={itemList}
                sort={sort}
                deleteCard={deleteCard}
                corpName={userInfo && userInfo.corp_name}
                userInfo={userInfo}
                router={Router}
                linkBinder={linkBinder}
                handleUpdateOpen={handleUpdateOpen && handleUpdateOpen}
                toggleVisible={toggleVisible}
            />
        </SortableWrap>
    )
}

export default LinkSortable;