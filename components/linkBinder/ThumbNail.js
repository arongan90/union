import React, {useEffect, useState} from 'react';
import {withRouter} from 'next/router'
import Link from 'next/link';
import styled, { css } from "styled-components";
import {message} from "antd";
import colors from "../../styles/colors";
// Image
import edit from '/public/images/linkBinder/edit.png';
import linkCopy from '/public/images/linkBinder/linkcopy.png';
import youtubeIcon from '/public/images/linkBinder/youtubeIcon.png';
import instaIcon from '/public/images/linkBinder/instaIcon.png';
import naverIcon from '/public/images/linkBinder/naverIcon.png';
import kakaoIcon from '/public/images/linkBinder/kakaoIcon.png';
import noneImage from '/public/images/share/noneImage.png';

const Wrapper = styled.div`
  position: relative;
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
  border: 1px solid ${colors.lightBlack};
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
    const copyBaseUrl = `http://localhost:3000/${props.corpname}/linkbinder/`;
    // const copyBaseUrl = 'https://healingt.online/linkbinder/';

    // 클릭시 링크 복사
    const copyLink = parameter => {
        var tempElem = document.createElement('textarea');
        tempElem.value = copyBaseUrl + parameter;
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);
        message.info('링크복사가 완료되었습니다.', 3);
    }

    const getSnsSite = param => {
        let newWindow = window.open("about:blank");
        newWindow.location.href = param;
    }

    return (
        <Wrapper>
            <BackGroundImageBox>
                <BackgroundCoverImage
                    src={!!props.resource ? `${serverProtocol}${serverURL}/${props.resource.image_path}` : null}/>
            </BackGroundImageBox>
            <ThumbNailBox>
                <ImageBox>
                    <MainImage
                        imgSrc={!props.resource && true}
                        src={!!props.resource ? `${serverProtocol}${serverURL}/${props.resource.image_path}` : noneImage}
                    />
                    <LeftBox onClick={() => copyLink(props.corpname)}>/
                        {!!props.userInfo && props.userInfo.user_type === 'admin' ?
                            props.userInfo && props.userInfo.nickname
                            :
                            props.corpname // props.postId
                        }
                        <SubImage src={linkCopy}/>
                    </LeftBox>
                    <RightBox>
                        {!!props.userInfo && props.userInfo.user_type === 'admin' ?
                            <Link href={`/${props.corpname}/linkbinder/addcover`}>
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
        </Wrapper>
    );
}

export default withRouter(ThumbNail);
