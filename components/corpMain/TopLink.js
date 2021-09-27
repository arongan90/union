import React from 'react';
import styled, {css} from "styled-components";
import ConferenceSVG from "/public/images/home/conference.svg";
import OnAirSVG from "/public/images/home/on-air.svg";
import StoreSVG from "/public/images/home/store.svg";
import Link from "next/link";
import {useSelector} from "react-redux";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  max-width: 530px;
  height: 75px;
  border-top: 2px solid ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
  margin: 0 auto;
  position: -webkit-sticky;
  position: sticky;
  z-index: 10;
  top: 59px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 8px ${colors.shadowColor};
  background-color: ${colors.chatDefaultColor};
`;
const NavLink = styled.div`
  width: 33%;
  flex-grow: 1;
  color: ${colors.whiteColor};
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: ${colors.whiteColor};
  }

  &:hover {
    cursor: pointer;
  }
  
  ${({ border }) => border && css`
    border-right: 1px solid ${colors.inputBorder};
  `}
`;

const NavImage = styled.img`
  margin-right: 9px;
  width: ${({width}) => width};
`;

const TopLink = ({corpName}) => {
    const {token} = useSelector(state => state.auth);

    // 홈쇼핑 이동하기
    const redirectMall = () => {
        if (!!token) document.getElementById('mall_redirect_form').submit();
        else alert('로그인후 이용해주세요.');
    }

    return (
        <>
            <Wrapper>
                <NavLink border>
                    <Link href={`/${corpName}/conference`}>
                        <a>
                            <NavImage src={ConferenceSVG} width={25}/>
                            화상회의
                        </a>
                    </Link>
                </NavLink>

                <NavLink border>
                    <Link href={`/${corpName}/live`}>
                        <a>
                            <NavImage src={OnAirSVG} width={20}/>
                            On-Air
                        </a>
                    </Link>
                </NavLink>

                <NavLink onClick={redirectMall}>
                    <NavImage src={StoreSVG} width={16}/>
                    스토어
                </NavLink>
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
                    value={!!token ? token : ''}
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
