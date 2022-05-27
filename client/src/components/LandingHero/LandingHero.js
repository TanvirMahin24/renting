import React from "react";
import styles from "./LandingHero.module.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import coreStyles from "react-awesome-slider/src/core/styles.scss";
import img1 from "../../assets/Landing/1.jpg";
import img2 from "../../assets/Landing/2.jpg";
import img3 from "../../assets/Landing/3.jpg";
import img4 from "../../assets/Landing/4.jpg";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const LandingHero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className="text-center fw-bolder display-3 text-white">
          Find Your Dream Home With Us
        </h1>
      </div>
      <AutoplaySlider
        cssModule={[coreStyles]}
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={4000}
        mobileTouch={true}
        buttons={false}
      >
        <div data-src={img1} className={styles.slide}></div>
        <div data-src={img2} className={styles.slide} />
        <div data-src={img3} className={styles.slide} />
        <div data-src={img4} className={styles.slide} />
      </AutoplaySlider>
    </div>
  );
};

export default LandingHero;
