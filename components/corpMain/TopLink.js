import React from 'react';
import styled, {css} from "styled-components";
import ConferenceSVG from "/public/images/home/conference.svg";
import OnAirSVG from "/public/images/home/on-air.svg";
import StoreSVG from "/public/images/home/store.svg";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import {useSelector} from "react-redux";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  max-width: 530px;
  height: 85px;
  border-top: 2px solid ${colors.normalGray};
  border-bottom: 1px solid ${colors.borderLightGray};
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 8px ${colors.shadowColor};
  background-color: ${colors.whiteColor};
`;
const NavLink = styled.div`
  flex-grow: 1;
  color: ${colors.deepDarkGray};
  font-weight: bold;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
  ${props => props.border && css`
    &:after {
      content: '';
      position: relative;
      left: ${props.isMobile ? '20%' : '40px'};
      border-right: 1px solid ${colors.inputBorder};
    }
  `}
`;
const StoreDiv = styled.div``;

const NavImage = styled.img`
  margin: 5px 9px 0 0;
  width: ${({width}) => width};
`;

const TopLink = ({corpName}) => {
    const { token } = useSelector(state => state.auth);

    // 홈쇼핑 이동하기
    const redirectMall = () => {
        if (!!token)
            document.getElementById('mall_redirect_form').submit();
        else
            alert('로그인후 이용해주세요.');
    }

    return (
        <>
            <Wrapper>
                <Link href={`/${corpName}/conference`}>
                    <a>
                        <NavLink border={true} isMobile={isMobile}>
                            <NavImage src={ConferenceSVG} width={23}/>
                            화상회의
                        </NavLink>
                    </a>
                </Link>

                <Link href={`/${corpName}/live`}>
                    <a>
                        <NavLink border isMobile={isMobile}>
                            <NavImage src={OnAirSVG} width={23}/>
                            On-Air
                        </NavLink>
                    </a>
                </Link>
                <StoreDiv>
                    <NavLink onClick={redirectMall}>
                        <NavImage src={StoreSVG} width={15}/>
                        스토어
                    </NavLink>
                </StoreDiv>
            </Wrapper>
            <form
                id="mall_redirect_form"
                name="mall_redirect_form"
                method="post"
                action="https://shop.healingt.online/bbs/login_check.php"
                target="_blank"
            >
                <input
                    type="hidden"
                    name="jwt_token"
                    value={!!token ? token : undefined}
                />
            </form>
        </>
    )
}

export default TopLink;

/*
<Wrapper>
    <Link href={`/${corpName}/conference`}>
        <a>
            <NavLink border isMobile={isMobile}>
                <NavImage src={ConferenceSVG} width={23}/>
                화상회의
            </NavLink>
        </a>
    </Link>

    <Link href={`/${corpName}/live`}>
        <a>
            <NavLink border isMobile={isMobile}>
                <NavImage src={OnAirSVG} width={23}/>
                On-Air
            </NavLink>
        </a>
    </Link>
    <StoreDiv>
        <NavLink onClick={redirectMall}>
            <NavImage src={StoreSVG} width={15}/>
            스토어
        </NavLink>
    </StoreDiv>
</Wrapper>*/