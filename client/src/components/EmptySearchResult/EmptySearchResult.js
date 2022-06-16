import React from "react";
import emptyImg from "../../assets/icons/search.png";
import styles from "./EmptySearchResult.module.css";

const EmptySearchResult = ({ title }) => {
  return (
    <div className="text-center">
      <img src={emptyImg} alt="empty" className={styles.img} />
      <h2>{title}</h2>
    </div>
  );
};

export default EmptySearchResult;
