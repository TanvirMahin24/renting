import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./ListingGallery.module.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

const ListingGallery = ({ listing }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className="pb-3 pt-5">Glimps Of The House</h2>
      <Swiper
        width={900}
        effect={"coverflow"}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={false}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay]}
        className={styles.swiper}
      >
        {listing?.images}
        <SwiperSlide className={styles.swiper_slide}>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ListingGallery;
