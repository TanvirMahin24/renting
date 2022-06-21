import React, { useEffect, useState } from "react";
import data from "./demoData";
import TestimonialItem from "./TestimonialItem/TestimonialItem";
import { Row, Col, Container } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./TestimonialList.module.css";
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

const TestimonialList = () => {
  return (
    <div className={styles.wrapper}>
      <Container className="py-5">
        <h1 className={styles.title}>What People Say</h1>

        <Swiper
          grabCursor={true}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          pagination={false}
          className="mySwiper"
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
            },
            "@0.75": {
              slidesPerView: 2,
            },
            "@1.00": {
              slidesPerView: 3,
            },
            "@1.50": {
              slidesPerView: 3,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide className="p-2 ">
              <TestimonialItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default TestimonialList;
