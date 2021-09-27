import React, {useState} from 'react';
import styled, { css } from "styled-components";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import colors from "/styles/colors";
// Image
import hamburgerImage from "/public/images/union/menu_bar.svg";
import logoImage from "/public/images/union/logo_catbellunion.svg";
import closeImage from "/public/images/union/close-btn.svg";

const Wrapper = styled.div`
  width: 0;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  @media only screen and (max-width: 767px) {
       width: auto;
       opacity: 1;
       visibility: visible;
       overflow: visible;
  }
`;

const DrawerMenu = styled(List)`
  width: 280px;
  height: 100vh;
  background: ${colors.deepWhite};
`;
const HamburgerMenu = styled.div`
  width: 25px;
  heighT: 25px;
  margin-left: 20px;
  background: url(${hamburgerImage});
  cursor: pointer;
`;
const DrawerTop = styled.div`
  width: 100%;
  padding: 40px 25px;
  position : relative;
`;
const AppImage = styled.img`
  width: ${({width}) => width};
  height: ${({height}) => height};
  ${({ close }) => close && css`
    position: absolute;
    top: 25px;
    right: 20px;
    cursor: pointer;
  `}
`;
const LogoBox = styled.div`
  width: 115px;
  height: 50px;
`;
const TabMenu = styled(ListItem)`
  width: 100%;
  height: 60px;
  padding-left: 25px;
  color: ${colors.lightBlack};
  border-bottom: 1px solid ${colors.borderLightGray};
  background: ${colors.whiteColor};
`;

const Drawer = () => {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(open);
    };
    const list = () => (
        <DrawerMenu onKeyDown={toggleDrawer(false)}>
            <DrawerTop>
                <LogoBox>
                    <AppImage src={logoImage} alt="logo" />
                </LogoBox>
                <AppImage width={17} height={17} src={closeImage} close onClick={toggleDrawer(false)} alt="close" />
            </DrawerTop>
            <TabMenu>
                화상회의
            </TabMenu>
            <TabMenu>
                On Air
            </TabMenu>
            <TabMenu>
                링크바인더
            </TabMenu>
            <TabMenu>
                게시영상
            </TabMenu>
            <TabMenu>
                쇼핑몰
            </TabMenu>
        </DrawerMenu>
    );

    return (
        <Wrapper>
            <HamburgerMenu onClick={toggleDrawer(true)} />
            <SwipeableDrawer
                anchor={'right'}
                open={drawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </Wrapper>
    );
}

export default Drawer;