import Link from 'next/link';
import styled, {css} from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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

const DrawerWrap = styled.div`
  width: 250px;
`;

const DrawerBox = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const DrawerIcon = styled.img`
  ${props => props.position && css`
    position: relative;
    top: 16px;
    left: 210px;
    cursor: pointer;
  `}
`;

const DrawerLinkBox = styled(ListItem)`
  padding: 13px 0 13px 30px;
  color: #333333;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  ${props => props.boldText && css`
    color: #000;
    font-weight: 700;
    cursor: Default;
  `}
`;

const LayoutLink = ({toggleDrawer, setDrawerOpen, cpInfo, setLoginOpen}) => {
    // const { corpname } = cpInfo;
    const corpname = 'odeng';
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);

    return (
        <DrawerWrap>
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
                        <DrawerLinkBox button>  {/* onClick={() => dispatch(actions.deauthenticate()) */}
                            <ListItemIcon>
                                <DrawerIcon src={lockSvg}/>
                            </ListItemIcon>
                            로그아웃
                        </DrawerLinkBox>
                        :
                        <DrawerLinkBox onClick={() => setLoginOpen(true)}>
                            <ListItemIcon>
                                <DrawerIcon src={lockSvg}/>
                            </ListItemIcon>
                            로그인
                        </DrawerLinkBox>

                    }

                    {!userInfo &&
                    <Link href={`/${corpname}/signUp`}>
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

                    <Link href={`/${corpname}`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={homeSvg}/>
                                </ListItemIcon>
                                홈
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/${corpname}/live`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={onAirSvg}/>
                                </ListItemIcon>
                                On-Air
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/${corpname}/chatonly`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={liveChatSvg}/>
                                </ListItemIcon>
                                라이브 채팅
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/${corpname}/conference`}>
                        <a>
                            <DrawerLinkBox button>
                                <ListItemIcon>
                                    <DrawerIcon src={conferenceSvg}/>
                                </ListItemIcon>
                                화상회의
                            </DrawerLinkBox>
                        </a>
                    </Link>

                    <Link href={`/${corpname}/linkbinder/${corpname}`}>
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
                            <Link href={`/${corpname}/videoEmbed`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={videoEmbedSvg}/>
                                        </ListItemIcon>
                                        동영상 임베드
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpname}/videoLinkList`}>
                                <a>
                                    <DrawerLinkBox button>
                                        <ListItemIcon>
                                            <DrawerIcon src={mainSettingSvg}/>
                                        </ListItemIcon>
                                        메인화면 관리
                                    </DrawerLinkBox>
                                </a>
                            </Link>
                            <Link href={`/${corpname}/member`}>
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
        </DrawerWrap>
    )
}

export default LayoutLink;