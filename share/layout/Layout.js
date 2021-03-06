import React, { useState } from 'react';
import styled from "styled-components";
import LayoutLink from "./LayoutLink";
import {useDispatch, useSelector} from "react-redux";
import { Drawer } from "@material-ui/core";
import {useRouter} from "next/router";
import hamburgerImage from "/public/images/layout/TopHamburger.svg";
import topLockImage from "/public/images/layout/TopLock.svg";
import topUnlockImage from "/public/images/layout/TopUnlock.svg";
import {isLogout} from "../../modules/auth";
import colors from "../../styles/colors";

const HeaderTop = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid ${colors.borderLightGray};
  display: flex;
`;
const ToolBox = styled.div`
  width: 33.3%;
  height: 100%;
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent ? justifyContent : 'center'};
  align-items: center;
  padding: 20px;
`;
const LogoBox = styled.div`
  width: 100px;
  height: 30px;
  cursor: pointer;
`;
const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const NavIconBox = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 15px;
  cursor: pointer;
`;
const NavIconImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { token, userInfo } = useSelector(state => state.auth);
    const corpInfo = useSelector(state => state.corpInfo);
    const dispatch = useDispatch();
    const router = useRouter();
    const toggleDrawer = () => e => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(true);
    };

    const onLogout = () => {
        alert('정상적으로 로그아웃 되었습니다.');
        dispatch(isLogout());
    };

    return (
        <>
            <HeaderTop>
                <ToolBox/>
                <ToolBox>
                    <LogoBox onClick={() => router.push(`/${corpInfo.corp_name}`)} >
                        <LogoImage
                            src={corpInfo.image_path}
                            alt={"corpLogo"} />
                    </LogoBox>
                </ToolBox>
                <ToolBox justifyContent={"flex-end"}>
                    {!!token
                        ?
                        <NavIconBox onClick={onLogout}>
                            <NavIconImg src={topLockImage}/>
                        </NavIconBox>
                        :
                        <NavIconBox onClick={() => router.push(`/login`)}>
                            <NavIconImg src={topUnlockImage}/>
                        </NavIconBox>
                    }

                    <NavIconBox onClick={toggleDrawer()}>
                        <NavIconImg src={hamburgerImage}/>
                    </NavIconBox>
                </ToolBox>
            </HeaderTop>
            <Drawer anchor={"right"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <LayoutLink
                    toggleDrawer={toggleDrawer}
                    setDrawerOpen={setDrawerOpen}
                    corpInfo={corpInfo}
                    userInfo={userInfo}
                />
            </Drawer>
            {children}
        </>
    )
}

export default Layout;