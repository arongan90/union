import React, {useEffect, useState, useCallback} from 'react';
import styled, { css } from "styled-components";
import cartSvg from "/public/images/home/cart.svg";
import viewSvg from "/public/images/home/right.svg";
import rightArrowSvg from "/public/images/home/rightArrow.svg";
import Router, {useRouter} from "next/router";
import MoreButton from "./MoreButton";
import colors from "../../styles/colors";
import {useSelector} from "react-redux";
import * as constants from "../../utils/Constants";
import PreviewModal from "../../share/modal/PreviewModal";

const serverURL = constants.config.chatServer.URL;
const serverProtocol = constants.config.chatServer.PROTOCOL;

const LinkBinderWrapper = styled.div`
  max-width: 530px;
  height: ${props => props.linkLength > 5 ? 600 : props.linkLength * 94 + 125}px;
  margin: 10px auto;
  padding: 20px 15px 50px;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  border: 1px solid ${colors.corpMainBorder};
  box-shadow: 0 0 10px ${colors.ultraLightGray};
  transition: 0.3s;
  ${props => props.moreView && css`
    height: ${props.linkLength * 94 + 125}px;
    max-height: none;
  `}
  
  @media screen and (max-width: 767px) {
    padding: 20px 10px 50px;
  }
  @media screen and (max-width: 374px) {
    padding: 20px 5px 50px;
  }
`;
const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: left;
  margin: 0 0 24px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LinkItemBox = styled.div`
  width: 100%;
  height: 84px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 5px 0 #F5F5F5;
  padding: 7px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const LinkItemImgBox = styled.div`
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  flex-grow: 1;
`;
const LinkItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const LinkItemExplain = styled.div`
  width: 100%;
  color: #333333;
  text-align: left;
  margin: 0 20px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LinkButton = styled.div`
  min-width: 100px;
  max-width: 60px;
  height: 60px;
  border-radius: 13px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid #EEEEEE;
  cursor: pointer;
  
  @media screen and (max-width: 767px) {
    min-width: 80px;
  }
`;
const CartImage = styled.img`
  font-size: 13px;
`;
const BuyText = styled.div`
  font-size: 13px;
  color: ${colors.normalGray};
  margin-left: 9px;
`;
const MoveStore = styled.span`
  font-size: 14px;
  display: flex;
  color: ${colors.normalGray};
  cursor: pointer;
`;
const ArrowIcon = styled.img`
  margin-left: 3px;
`;

const MainLinkBinder = ({linkBinderList, corpName}) => {
    const router = useRouter();
    const [moreView, setMoreView] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImagePath, setModalImagePath] = useState('');
    const {corp_name} = useSelector(state => state.corpInfo);

    const onToggleMore = () => setMoreView(prevView => !prevView);
    const handleModalClose = () => setModalOpen(false);
    const handleModalOpen = imagePath => {
        setModalImagePath(imagePath);
        setModalOpen(true);
    }

    return (
        <LinkBinderWrapper linkLength={linkBinderList && linkBinderList.length} moreView={moreView}>
            <TitleText>
                링크바인더
                <MoveStore onClick={() => router.push(`/linkbinder/${corp_name}`)}>
                    더보기<ArrowIcon src={rightArrowSvg} />
                </MoveStore>
            </TitleText>

            {!moreView
                ? linkBinderList.slice(0, 5).sort((a,b) => a.list_index - b.list_index).map(list => {
                    return (
                        <LinkItemBox key={list.id}>
                            <LinkItemImgBox onClick={() => handleModalOpen(list.image_path)}>
                                <LinkItemImage
                                    src={`http://172.16.1.192:3000` + list.image_path}
                                    // src={`${serverProtocol}${serverURL}/` + list.image_path}
                                />
                            </LinkItemImgBox>
                            <LinkItemExplain>{list.title}</LinkItemExplain>
                            <LinkButton onClick={() => window.open(`${list.address}`)}>
                                <CartImage src={list.link_type === 'shopping' ?  cartSvg : viewSvg}/>
                                <BuyText>{list.link_type === 'shopping' ? 'BUY' : 'VIEW'}</BuyText>
                            </LinkButton>
                        </LinkItemBox>
                    )})
                : linkBinderList.sort((a,b) => a.list_index - b.list_index).map(list => {
                    return (
                        <LinkItemBox key={list.link_id}>
                            <LinkItemImgBox onClick={() => handleModalOpen(list.image_path)}>
                                <LinkItemImage src={`${serverProtocol}${serverURL}/` + list.image_path} />
                            </LinkItemImgBox>
                            <LinkItemExplain>{list.title}</LinkItemExplain>
                            <LinkButton onClick={() => window.open(`${list.address}`)}>
                                <CartImage src={list.link_type === 'shopping' ?  cartSvg : viewSvg}/>
                                <BuyText>{list.link_type === 'shopping' ? 'BUY' : 'VIEW'}</BuyText>
                            </LinkButton>
                        </LinkItemBox>
                    )})
            }

            {(linkBinderList && linkBinderList.length) > 5 &&
                <MoreButton
                    onToggle={onToggleMore}
                    moreView={moreView}
                />}

            <PreviewModal
                videoModal={modalOpen}
                handleClose={handleModalClose}
                imagePath={modalImagePath}
            />
        </LinkBinderWrapper>
    )
}

export default MainLinkBinder;