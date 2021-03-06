import React, { useEffect } from "react";
import Link from 'next/link';
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {useRouter} from "next/router";
import colors from "../../styles/colors";
import unlockSvg from "/public/images/layout/TopUnlock.svg";
import lockSvg from "/public/images/layout/lock.svg";
import memberSvg from "/public/images/layout/member.svg";
import homeSvg from "/public/images/layout/home.svg";
import onAirSvg from "/public/images/layout/onAirNav.svg";
import liveChatSvg from "/public/images/layout/liveChat.svg";
import conferenceSvg from "/public/images/layout/conferenceNav.svg";
import linkBinderSvg from "/public/images/layout/linkBinder.svg";
import closeSvg from "/public/images/layout/closeIcon.svg";
import mainSettingSvg from "/public/images/layout/mainSetting.svg";
import boardSettingSvg from "/public/images/layout/boardSetting.svg";
import videoEmbedSvg from "/public/images/layout/videoEmbed.svg";
import usersSvg from "/public/images/layout/users.svg";
import {isLogout} from "../../modules/auth";

const DrawerWrapper = styled.div`
  width: 250px;
  padding-top: 25px;
  
  @media screen and (max-width: 767px) {
    padding-top: 20px;
  }
`;

const DrawerBox = styled.div`
  width: 100%;
`;

const DrawerIcon = styled.img`
  ${({position}) => position && css`
    position: relative;
    top: 0;
    left: 210px;
    cursor: pointer;
  `}
`;

const DrawerLinkBox = styled(ListItem)`
  padding: 13px 0 13px 30px;
  color: ${colors.chatDefaultColor};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  ${({boldText}) => boldText && css`
    color: ${colors.blackColor};
    font-weight: 700;
    cursor: Default;
  `}

  @media screen and (max-width: 767px) {
    padding: 10px 0 10px 25px;
  }
`;
const LinkTitle = styled.div`
  padding: 13px 0 13px 30px;
  color: ${colors.chatDefaultColor};
  font-size: 15px;
  font-weight: 500;
`;
const NameBox= styled.div`
  padding: 0 0 5px 30px;
`;
const LittleText = styled.span`
  font-size: 14px;
  margin: 3px 3px 0 10px;
  color: ${colors.gray};
`;

const LayoutLink = ({toggleDrawer, setDrawerOpen, corpInfo}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {userInfo, token} = useSelector(state => state.auth);
    const {corp_name} = corpInfo;
    let corpName = corp_name;

    const onLogout = () => {
        alert('??????????????? ???????????? ???????????????.');
        dispatch(isLogout());
    };

    return (
        <>
            <DrawerWrapper>
                <DrawerIcon src={closeSvg} position onClick={() => setDrawerOpen(false)}/>
                {userInfo && <NameBox>{userInfo.name}<LittleText>???</LittleText></NameBox>}
                <DrawerBox
                    onClick={() => {
                        toggleDrawer();
                        setDrawerOpen(false);
                    }}
                    onKeyDown={() => toggleDrawer()}
                >
                    {/*<List>*/}
                    {!!userInfo ?
                        <DrawerLinkBox button onClick={onLogout}>

                            <ListItemIcon>
                                    <DrawerIcon src={lockSvg}/>
                            </ListItemIcon>
                            ????????????
                        </DrawerLinkBox>
                        :
                        <DrawerLinkBox onClick={() => router.push(`/login`)}>
                            <ListItemIcon>
                                <DrawerIcon src={unlockSvg}/>
                            </ListItemIcon>
                            ?????????
                        </DrawerLinkBox>

                    }

                    {!userInfo &&
                    <Link href={`/${corpName}/signup`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={memberSvg}/>
                                </ListItemIcon>
                                ????????????
                            </DrawerLinkBox>
                        </a>
                    </Link>
                    }
                </DrawerBox>

                <LinkTitle>
                    <b>Menu</b>
                </LinkTitle>
                <DrawerBox
                    onClick={() => {
                        toggleDrawer();
                        setDrawerOpen(false);
                    }}
                    onKeyDown={() => toggleDrawer()}
                >
                    <Link href={`/${corpName}`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={homeSvg}/>
                                </ListItemIcon>
                                ???
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/${corpName}/live`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={onAirSvg}/>
                                </ListItemIcon>
                                On-Air
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    {/*<Link href={`/${corpName}/livechat`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={liveChatSvg}/>
                                </ListItemIcon>
                                ????????? ??????
                            </DrawerLinkBox>
                        </a>
                    </Link>*/}

                    <Link href={`/${corpName}/conference`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={conferenceSvg}/>
                                </ListItemIcon>
                                ????????????
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/linkbinder/${corpName}`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={linkBinderSvg}/>
                                </ListItemIcon>
                                ???????????????
                            </DrawerLinkBox>
                        </a>
                    </Link>
                </DrawerBox>
                {!!userInfo
                    ? userInfo.user_type === 'admin' &&
                    <>
                        <LinkTitle>
                            <b>Setting</b>
                        </LinkTitle>
                        <DrawerBox
                            onClick={() => {
                                toggleDrawer();
                                setDrawerOpen(false);
                            }}
                            onKeyDown={() => toggleDrawer()}
                        >
                            <Link href={`/${corpName}/videoembed`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={videoEmbedSvg}/>
                                        </ListItemIcon>
                                        ????????? ?????????
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpName}/mainsetting`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={mainSettingSvg}/>
                                        </ListItemIcon>
                                        ???????????? ??????
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpName}/boardsetting`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={boardSettingSvg}/>
                                        </ListItemIcon>
                                        ????????? ??????
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpName}/member`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={usersSvg}/>
                                        </ListItemIcon>
                                        ????????????
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                        </DrawerBox>
                    </>
                    : null
                }
                {/*</List>*/}
            </DrawerWrapper>
        </>
    )
}

export default LayoutLink;