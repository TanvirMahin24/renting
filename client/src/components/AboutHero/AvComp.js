import React from "react";
import styles from "./AboutHero.module.css";

const AvComp = ({ img, title }) => {
  return (
    <div className={styles.av}>
      <div className={styles.icon_wrapper}>
        <img src={img} alt="" className={styles.icon} />
      </div>
      <span className="d-block fs-6">{title}</span>
    </div>
  );
};

export default AvComp;
