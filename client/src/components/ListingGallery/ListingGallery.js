import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ListingGallery.module.css";

// import required modules
import { Autoplay } from "swiper";

const ListingGallery = ({ listing }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {listing ? (
        <div className={styles.wrapper}>
          {/* <h2 className="pb-3 pt-5">Glimps Of The House</h2> */}
          <Swiper
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            centeredSlides={false}
            slidesPerView={3}
            loop={true}
            pagination={false}
            modules={[Autoplay]}
            lazy={true}
            className={styles.swiper}
          >
            {listing?.images.map((img, i) => (
              <SwiperSlide key={img.id} className={styles.swiper_slide}>
                <div className={styles.img_wrapper}>
                  <img
                    src={`http://${img.image}`}
                    className={styles.img}
                    onClick={() => {
                      setPhotoIndex(i);
                      setTimeout(() => {
                        setIsOpen(true);
                      }, 100);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {isOpen ? (
            <Lightbox
              mainSrc={`http://${listing.images[photoIndex].image}`}
              nextSrc={`http://${
                listing.images[(photoIndex + 1) % listing.images.length].image
              }`}
              prevSrc={`http://${
                listing.images[
                  (photoIndex + listing.images.length - 1) %
                    listing.images.length
                ].image
              }`}
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex(
                  (photoIndex + listing.images.length - 1) %
                    listing.images.length
                )
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % listing.images.length)
              }
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListingGallery;
