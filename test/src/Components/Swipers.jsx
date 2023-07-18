import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Box } from "@chakra-ui/react";
// Swiper.use([EffectCoverflow, Pagination, Navigation])

export default function Swipers({ images }) {
  return (
    <Box
      // bgImage={"linear-gradient(to right, #0f0e17, #0075B2)"}
      bg={"linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)"}
      // bg={"linear-gradient(45deg, #b004f8, #ff0b8c, #0099ff)"}
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={images[0]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[1]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[2]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[3]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[4]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[5]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[6]} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images[7]} alt="" />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
