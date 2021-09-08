import Link from 'next/link';
import styled, {css} from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useRouter } from "next/router";
import colors from "../../styles/colors";
// Image
import lockSvg from "/public/images/layout/lock.svg";
import memberSvg from "/public/images/layout/member.svg";
import homeSvg from "/public/images/layout/home.svg";
import onAirSvg from "/public/images/layout/onAirNav.svg";
import liveChatSvg from "/public/images/layout/liveChat.svg";
import conferenceSvg from "/public/images/layout/conferenceNav.svg";
import linkBinderSvg from "/public/images/layout/linkBinder.svg";
import closeSvg from "/public/images/layout/closeIcon.svg";
import mainSettingSvg from "/public/images/layout/mainSetting.svg";
import videoEmbedSvg from "/public/images/layout/videoEmbed.svg";
import usersSvg from "/public/images/layout/users.svg";
import {isLogout} from "../../modules/auth";

const DrawerWrapper = styled.div`
  width: 250px;
`;

const DrawerBox = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const DrawerIcon = styled.img`
  ${({position}) => position && css`
    position: relative;
    top: 16px;
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
  ${({ boldText }) => boldText && css`
    color: ${colors.blackColor};
    font-weight: 700;
    cursor: Default;
  `}
`;

const LayoutLink = ({toggleDrawer, setDrawerOpen, corpInfo }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { userInfo } = useSelector(state => state.auth);
    const { corp_name } = corpInfo;
    let corpName = corp_name;

    const onLogout = () => {
        alert('정상적으로 로그아웃 되었습니다.');
        dispatch(isLogout());
    };

    return (
        <DrawerWrapper>
            <DrawerIcon src={closeSvg} position onClick={() => setDrawerOpen(false)}/>
            <DrawerBox
                onClick={() => {
                    toggleDrawer();
                    setDrawerOpen(false);
                }}
                onKeyDown={() => toggleDrawer()}
            >
                <List>
                    { !!userInfo ?
                        <DrawerLinkBox button onClick={onLogout}>
                            <ListItemIcon>
                                <DrawerIcon src={lockSvg}/>
                            </ListItemIcon>
                            로그아웃
                        </DrawerLinkBox>
                        :
                        <DrawerLinkBox onClick={() => router.push(`/login`)}>
                            <ListItemIcon>
                                <DrawerIcon src={lockSvg}/>
                            </ListItemIcon>
                            로그인
                        </DrawerLinkBox>

                    }

                    {!userInfo &&
                    <Link href={`/${corpName}/signup`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={memberSvg}/>
                                </ListItemIcon>
                                회원가입
                            </DrawerLinkBox>
                        </a>
                    </Link>
                    }

                    <DrawerLinkBox button>
                        <b>Menu</b>
                    </DrawerLinkBox>

                    <Link href={`/${corpName}`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={homeSvg}/>
                                </ListItemIcon>
                                홈
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
                                라이브 채팅
                            </DrawerLinkBox>
                        </a>
                    </Link>*/}

                    <Link href={`/${corpName}/conference`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={conferenceSvg}/>
                                </ListItemIcon>
                                화상회의
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/${corpName}/linkbinder/${corpName}`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={linkBinderSvg}/>
                                </ListItemIcon>
                                링크바인더
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    {!!userInfo
                        ? userInfo.user_type === 'admin' &&
                        <>
                            <Link href={`/${corpName}/videoembed`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={videoEmbedSvg}/>
                                        </ListItemIcon>
                                        동영상 임베드
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpName}/settingmain`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={mainSettingSvg}/>
                                        </ListItemIcon>
                                        메인화면 관리
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpName}/member`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={usersSvg}/>
                                        </ListItemIcon>
                                        회원목록
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                        </>
                        : null
                    }
                </List>
            </DrawerBox>
        </DrawerWrapper>
    )
}

export default LayoutLink;