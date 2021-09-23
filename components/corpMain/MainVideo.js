import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import playButton from "/public/images/home/playButton.svg";
import PreviewModal from "../../share/modal/PreviewModal";
import Image from "next/image";
import noImage from '/public/images/share/noImages.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import colors from "../../styles/colors";
import "swiper/swiper.min.css";
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const SwiperWrapper = styled.div`
  .swiper-button-next {
    &::after {
      position:relative;
      left: 3px;
    }
  }
  .swiper-button-prev {
    &::after {
      position:relative;
      right: 3px;
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    color: ${colors.whiteColor};
    pointer-events: initial;
  }

  .swiper-pagination-bullet {
    background: ${colors.whiteColor};
  }
  
  .swiper-pagination-bullet-active {
    background: ${colors.whiteColor};
  }
`;

const PlayButton = styled.img`
  width: 71px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
`;

const ThumbNailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoImageBox = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.blackColor};
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const MainVideo = ({ mainView }) => {
    const [videoModal, setVideoModal] = useState(false);
    const [youtubeId, setYoutubeId] = useState('');
    const [imgPath, setImgPath] = useState('');
    const handleClose = () => setVideoModal(false);

    return (
        <SwiperWrapper>
            <Swiper
                // autoplay
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    "clickable": true
                }}
                style={{
                    maxWidth: 530,
                    height: 398,
                    margin: '10px auto',
                    overflow: 'hidden',
                    border: '1px solid #dddddd',
                    boxShadow: `0 0 8px ${colors.shadowColor}`,
                }}
            >
                {mainView ? mainView.map((value) => (
                        <SwiperSlide
                            onClick={() => {
                                console.info('click');
                                setYoutubeId(value.youtubeId);
                                setImgPath(value.image_path);
                                (value.link_address !== null || value.image_path !== null) && setVideoModal(true);
                            }}
                            key={value.id}
                            style={{
                                width: '100%',
                                height: 398,
                                cursor: 'pointer'
                            }}
                        >
                            {value.link_address && <PlayButton src={playButton}/>}
                            {value.link_address !== null ?
                                <ThumbNailImage src={`https://img.youtube.com/vi/${value.youtubeId}/0.jpg`}/>
                                :
                                <PhotoImageBox>
                                    <PhotoImage
                                        src={`http://172.16.1.192:3000` + value.image_path}
                                        // src={`${serverProtocol}${serverURL}` + value.image_path}
                                        alt={value.image_path}
                                    />
                                </PhotoImageBox>
                            }
                        </SwiperSlide>
                    )) : <Image src={noImage} width={'1000%'} height={398}/>}
            </Swiper>
            <PreviewModal
                youtubeId={youtubeId}
                videoModal={videoModal}
                handleClose={handleClose}
                imagePath={imgPath}
            />
        </SwiperWrapper>
    )
}

export default MainVideo;