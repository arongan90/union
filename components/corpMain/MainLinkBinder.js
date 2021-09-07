import React, {useEffect, useState, useCallback} from 'react';
import styled, { css } from "styled-components";
import cartSvg from "/public/images/home/cart.svg";
import rightArrowSvg from "/public/images/home/rightArrow.svg";
import Router, {useRouter} from "next/router";
import MoreButton from ".//MoreButton";
// import * as constants from "../../utils/Constants";

// const serverURL = constants.config.chatServer.URL;
// const serverProtocol = constants.config.chatServer.PROTOCOL;

const LinkBinderWrapper = styled.div`
  max-width: 530px;
  height: ${props => props.linkLength > 5 ? 600 : props.linkLength * 94 + 125}px;
  margin: 10px auto;
  padding: 20px 15px 50px;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 0 8px #E3E2E2;
  transition: 0.3s;
  border: none;
  ${props => props.moreView && css`
    height: ${props.linkLength * 94 + 125}px;
    max-height: none;
  `}
`;
const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: left;
  margin: 0 0 24px 5px;
  display: flex;
  justify-content: space-between;
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
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  border-radius: 13px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #EEEEEE;
  cursor: pointer;
`;
const CartImage = styled.img`
  font-size: 13px;
`;
const BuyText = styled.div`
  color: #666666;
`;
const MoveStore = styled.span`
  font-size: 14px;
  color: #7B7C7D;
  cursor: pointer;
`;
const ArrowIcon = styled.img`
  margin: 0 0 5px 3px;
`;

const MainLinkBinder = ({linkData, corpName}) => {
    const router = useRouter();
    const [moreView, setMoreView] = useState(false);

    const onToggleMore = useCallback(() => {
        setMoreView(prevView => !prevView);
    }, []);

    return (
        <LinkBinderWrapper linkLength={linkData && linkData.length} moreView={moreView}>
            <TitleText>
                링크바인더
                <MoveStore
                    onClick={() => router.push(`/${corpName}/linkbinder/${corpName}`)}
                >
                    스토어로 이동<ArrowIcon src={rightArrowSvg} />
                </MoveStore>
            </TitleText>

            {/*{!moreView
                ? linkData.slice(0, 5).sort((a,b) => a.list_index - b.list_index).map(list => {
                    return (
                        <LinkItemBox
                            key={list.link_id}
                            onClick={() => window.open(`${list.address}`)}
                        >
                            <LinkItemImgBox>
                                <LinkItemImage src={`${serverProtocol}${serverURL}/` + list.image_path} />
                            </LinkItemImgBox>
                            <LinkItemExplain>{list.title}</LinkItemExplain>
                            <LinkButton>
                                <CartImage src={cartSvg}/>
                                <BuyText>BUY</BuyText>
                            </LinkButton>
                        </LinkItemBox>
                    )})
                : linkData.sort((a,b) => a.list_index - b.list_index).map(list => {
                    return (
                        <LinkItemBox
                            key={list.link_id}
                            onClick={() => window.open(`${list.address}`)}
                        >
                            <LinkItemImgBox>
                                <LinkItemImage src={`${serverProtocol}${serverURL}/` + list.image_path} />
                            </LinkItemImgBox>
                            <LinkItemExplain>{list.title}</LinkItemExplain>
                            <LinkButton>
                                <CartImage src={cartSvg}/>
                                <BuyText>BUY</BuyText>
                            </LinkButton>
                        </LinkItemBox>
                    )})
            }*/}

            {(linkData && linkData.length) > 5 &&
            <MoreButton
                onToggle={onToggleMore}
                moreView={moreView}
            />
            }
        </LinkBinderWrapper>
    )
}

export default MainLinkBinder;