import React, {useState, useEffect} from 'react';
import styled, {css} from "styled-components";
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import Link from 'next/link';
import Router from "next/router";
import * as constants from "../../utils/Constants";
import colors from "../../styles/colors";
// Image
import deleteSvg from "/public/images/share/delete.svg";
import sortSvg from "/public/images/share/sort.svg";
import viewIcon from "/public/images/share/viewIcon.png";
import cartSvg from "/public/images/share/cart.svg";

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
  justify-content: space-around;
  padding: 10px 5px;
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
  
  ${({ sort }) => sort && css`
    transform: rotateY(180deg);
  `}
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
  ${({ sort }) => sort && css`
    transform: rotateY(0);
  `}
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
  width: 100%;
  font-size: 16px;
  color: #444444;
  text-align: left;
  cursor: pointer;
`;
const LinkTitle = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
`;
const ViewCountBox = styled.div`
  font-size: 12px;
`;
const ViewCountImage = styled.img`
  margin-right: 5px;
`;
const OnOff = styled.div`
  width: 27px;
  height: 18px;
  text-align: center;
  font-size: 10px;
  line-height: 1.8;
  border-radius: 11px;
  color: ${colors.whiteColor};
  position: absolute;
  top: -5px;
  right: -35px;
  background: ${props => props.secure ? '#8DC89D' : '#838081'}
`;
const RightBox = styled.div`
  position: relative;
`;
const BuyButton = styled.div`
  width: 100%;
  height: 100%;
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
  width: 50%;
`;

const DragHandle = SortableHandle(() => <SortIconImage src={sortSvg}/>);
const SortableItem = SortableElement((props) => {
    const { list, sort, deleteCard, corpName, userInfo, router, linkBinder } = props;

    return (
        <SortableBox>
            <ImageBox>
                <EmbedImage src={`${list.image_path || 'http://img.youtube.com/vi/' + list.youtubeId + '/0.jpg'}`} alt="image"/>
                {/*<EmbedImage src={`${serverProtocol}/${serverURL}/${list.image_path}`} alt="Image" />*/}
            </ImageBox>

            {linkBinder ?
                <Link href={sort ? `/${corpName}/linkbinder/addlink/${list.id}` : `${list.address}`}>
                    <a target={!sort ? "_blank" : null} style={{width: '50%'}}>
                        <LinkTitleBox>
                            <LinkTitle>
                                {list.title}
                                <OnOff secure={list.secure}>
                                    {list.secure ? 'On' : 'Off'}
                                </OnOff>
                            </LinkTitle>
                            <ViewCountBox>
                                <ViewCountImage src={viewIcon}/>
                                {list.link_count}
                            </ViewCountBox>
                        </LinkTitleBox>
                    </a>
                </Link>
                :
                <VideoTitleBox>
                    <LinkTitleBox>
                        <LinkTitle>
                            {list.title}
                        </LinkTitle>
                    </LinkTitleBox>
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
});

const SortableContainerBox = SortableContainer(({itemList, sort, deleteCard, corpName, userInfo, router, linkBinder}) => {
    return (
        <div>
            {itemList.map((list, index) => (
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
                />
            ))}
        </div>
    )
});

const LinkSortable = (props) => {
    const {itemList, onSortEnd, sort, deleteCard, userInfo, linkBinder} = props;
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
            />
        </SortableWrap>

    )
}

export default LinkSortable;