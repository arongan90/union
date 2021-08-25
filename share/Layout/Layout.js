import React, { useState } from 'react';
import styled from "styled-components";
import Head from "next/head";
import LayoutLink from "./LayoutLink";
import { useSelector } from "react-redux";
import { Drawer } from "@material-ui/core";
// Image
import hamburgerImage from "/public/images/layout/TopHamburger.svg";
import topLockImage from "/public/images/layout/TopLock.svg";
import topUnlockImage from "/public/images/layout/TopUnlock.svg";

const HeaderTop = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
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

const Layout = ({setLoginOpen, cpInfo, children}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {token, userInfo} = useSelector(state => state.auth);
    const toggleDrawer = () => e => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(true);
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"/>
            </Head>

            <HeaderTop>
                <ToolBox/>
                <ToolBox>
                    <LogoBox>
                        <LogoImage alt={"corpLogo"} />
                    </LogoBox>
                </ToolBox>
                <ToolBox justifyContent={"flex-end"}>
                    {!!token
                        ?
                        <NavIconBox onClick={() => {
                            // dispatch(actions.deauthenticate());
                            // dispatch(userActions.logout());
                        }}>
                            <NavIconImg src={topUnlockImage}/>
                        </NavIconBox>
                        :
                        <NavIconBox onClick={() => setLoginOpen(true)}>
                            <NavIconImg src={topLockImage}/>
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
                    cpInfo={cpInfo}
                    userInfo={userInfo}
                    setLoginOpen={setLoginOpen}
                />
            </Drawer>
            {children}
        </>
    )
}

export default Layout;