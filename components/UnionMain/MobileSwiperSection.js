import React from 'react';
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.min.css';
import "swiper/components/pagination/pagination.min.css"
import colors from "/styles/colors";
import SwiperCore, {Autoplay, Navigation, Scrollbar, Pagination} from 'swiper/core';
// Image
import slideMenu1 from '/public/images/union/Menu2_slide1.png';
import slideMenu2 from '/public/images/union/Menu2_slide2.png';
import slideMenu3 from '/public/images/union/Menu2_slide3.png';
import slideMenu4 from '/public/images/union/Menu2_slide4.png';
import slideMenu5 from '/public/images/union/Menu2_slide5.png';
import slideMenu6 from '/public/images/union/Menu2_slide6.png';

SwiperCore.use([Navigation, Autoplay, Scrollbar, Pagination]);

const SwiperWrap = styled.div`
  width: 100%;
  .swiper-container {
    height: 100%;
  }
  .swiper-pagination {
    bottom: -15px;
    .swiper-pagination-bullet-active {
      background: ${colors.darkDeepSkyBlue};
    }
  }
  .swiper-slide {
    width: 100%;
    
  }
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MobileSwiperSection = () => {
    return (
        <SwiperWrap>
            <Swiper
                autoplay
                loop
                navigation
                spaceBetween={50}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                pagination={{"clickable": true}}
                style={{
                    width: '100%',
                    maxWidth: 768,
                    margin: '0 auto',
                }}
            >
                <SwiperSlide>
                    <AppImage src={slideMenu1} alt="slide1"/>
                </SwiperSlide>
                <SwiperSlide>
                    <AppImage src={slideMenu2} alt="slide2"/>
                </SwiperSlide>
                <SwiperSlide>
                    <AppImage src={slideMenu3} alt="slide3"/>
                </SwiperSlide>
                <SwiperSlide>
                    <AppImage src={slideMenu4} alt="slide4"/>
                </SwiperSlide>
                <SwiperSlide>
                    <AppImage src={slideMenu5} alt="slide5"/>
                </SwiperSlide>
                <SwiperSlide>
                    <AppImage src={slideMenu6} alt="slide6"/>
                </SwiperSlide>
            </Swiper>
        </SwiperWrap>
    )
}

export default MobileSwiperSection;