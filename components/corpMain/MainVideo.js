import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import playButton from "/public/images/home/playButton.svg";
import PreviewModal from "../../share/modal/PreviewModal";
import Image from "next/image";
import noImage from '/public/images/share/noImages.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay } from 'swiper';

SwiperCore.use([Autoplay]);

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
  background: black;
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
    const handleClose = () => {
        setVideoModal(false);
    }

    return (
        <>
            <Swiper
                autoplay
                navigation
                spaceBetween={50}
                slidesPerView={1}
                pagination={{
                    "clickable": true
                }}
                style={{
                    maxWidth: 530,
                    height: 398,
                    margin: '10px auto',
                    overflow: 'hidden',
                    border: '1px solid #dddddd'
                }}
            >
                {mainView ? mainView.map((value) => {
                    return (
                        <SwiperSlide
                            onClick={() => {
                                console.info('click');
                                setYoutubeId(value.youtubeId);
                                setImgPath(value.image_path);
                                (value.link_address !== null || value.image_path !== null) && setVideoModal(true);
                            }}
                            key={value.link_id}
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
                                        // src={`${serverProtocol}${serverURL}` + value.image_path}
                                        alt={value.image_path}
                                    />
                                </PhotoImageBox>
                            }
                        </SwiperSlide>
                    )
                }) : <Image src={noImage} width={'1000%'} height={398}/>}
            </Swiper>
            <PreviewModal
                youtubeId={youtubeId}
                videoModal={videoModal}
                handleClose={handleClose}
                imagePath={imgPath}
            />
        </>
    )
}

export default MainVideo;