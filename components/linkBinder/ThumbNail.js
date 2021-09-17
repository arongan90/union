import React, {useEffect, useState} from 'react';
import {withRouter} from 'next/router'
import Link from 'next/link';
import styled, { css } from "styled-components";
import {message} from "antd";
import colors from "../../styles/colors";
import {useSelector} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as constants from "../../utils/constants";
import edit from '/public/images/linkBinder/edit.png';
import linkCopy from '/public/images/linkBinder/linkcopy.png';
import youtubeIcon from '/public/images/linkBinder/youtubeIcon.png';
import instaIcon from '/public/images/linkBinder/instaIcon.png';
import naverIcon from '/public/images/linkBinder/naverIcon.png';
import kakaoIcon from '/public/images/linkBinder/kakaoIcon.png';
import noneImage from '/public/images/share/noneImage.png';

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const Wrapper = styled.div`
  position: relative;
  
  .Toastify__toast-container--bottom-center {
    bottom: 50%;
  }
`;
const BackGroundImageBox = styled.div`
  width: 100%;
  height: 300px;
  background: ${colors.blackColor};
  position: absolute;
  overflow: hidden;
`;
const BackgroundCoverImage = styled.img`
  width: 100%;
  height: 100%;
  filter: blur(4px);
  object-fit: fill;
  opacity: 0.6;
`;
const ThumbNailBox = styled.div`
  width: 100%;
  height: 100%;
`;
const ImageBox = styled.div`
  max-width: 530px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  text-align: center;
`;
const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({imgSrc}) => imgSrc && css`
    width: 60px;
    height: 50px;
    margin-top: 120px;
  `}
`;
const LeftBox = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: #fff;
  cursor: pointer;
`;
const RightBox = styled.div`
  position: absolute;
  right: 10px;
  bottom: 5px;
  color: #fff;
`;
const LinkImageBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 5px;
  cursor: pointer;
`;
const SubImage = styled.img`
  margin: 0 5px;
  vertical-align: bottom;
  cursor: pointer;
`;

function ThumbNail(props) {
    const { userInfo } = useSelector(state => state.auth);
    const { corpInfo } = useSelector(state => state);
    const copyBaseUrl = `${serverProtocol}172.16.1.192:3000/linkbinder/${corpInfo.corp_name}`;
    // const copyBaseUrl = 'https://healingt.online/linkbinder/';

    // 클릭시 링크 복사
    const copyLink = () => {
        var tempElem = document.createElement('textarea');
        tempElem.value = copyBaseUrl;
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);

        console.info(tempElem.value);

        toast.info(`링크가 복사 되었습니다.`, {
            position: "bottom-center",
            autoClose: 2000,
        });
    }

    const getSnsSite = param => {
        let newWindow = window.open("about:blank");
        newWindow.location.href = param;
    }

    return (
        <Wrapper>
            <BackGroundImageBox>
                <BackgroundCoverImage
                    src={`https://cdn.univ20.com/wp-content/uploads/2016/11/08178004a38eac7bf421cf054ca79301-41.png`}
                    // src={!!props.resource ? `${serverProtocol}${serverURL}/${props.resource.image_path}` : null}/>
                    />
            </BackGroundImageBox>
            <ThumbNailBox>
                <ImageBox>
                    <MainImage
                        imgSrc={false}
                        src={`https://cdn.univ20.com/wp-content/uploads/2016/11/08178004a38eac7bf421cf054ca79301-41.png`}
                        // imgSrc={!props.resource && true}
                        // src={!!props.resource ? `${serverProtocol}${serverURL}/${props.resource.image_path}` : noneImage}
                    />
                    <LeftBox onClick={copyLink}>/
                        {!!corpInfo && corpInfo.corp_name}
                        <SubImage src={linkCopy}/>
                    </LeftBox>
                    <RightBox>
                        {!!userInfo && userInfo.user_type === 'admin' ?
                            <Link href={`/${corpInfo.corp_name}/linkbinder/addcover`}>
                                <a>
                                    <SubImage src={edit}/>
                                </a>
                            </Link>
                            :
                            <>
                                {/*{props.resource && props.resource.youtube_link !== ''
                                    ? <LinkImageBox>
                                        <SubImage src={youtubeIcon} onClick={() => getSnsSite(props.resource.youtube_link)} />
                                    </LinkImageBox>
                                    : null}

                                {props.resource && props.resource.insta_link !== ''
                                    ? <LinkImageBox>
                                        <SubImage src={instaIcon} onClick={() => getSnsSite(props.resource.insta_link)} />
                                    </LinkImageBox>
                                    : null
                                }
                                {props.resource && props.resource.naver_link !== ''
                                    ? <LinkImageBox>
                                        <SubImage src={naverIcon} onClick={() => getSnsSite(props.resource.naver_link)} />
                                    </LinkImageBox>
                                    : null
                                }

                                {props.resource && props.resource.kakao_link !== ''
                                    ? <LinkImageBox>
                                        <SubImage src={kakaoIcon} onClick={() => getSnsSite(props.resource.naver_link)} />
                                    </LinkImageBox>
                                    : null
                                }*/}
                            </>
                        }
                    </RightBox>
                </ImageBox>
            </ThumbNailBox>
            <ToastContainer />
        </Wrapper>
    );
}

export default withRouter(ThumbNail);
