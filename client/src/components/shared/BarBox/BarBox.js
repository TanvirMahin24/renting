import React from "react";
import styles from "./BarBox.module.css";

const BarBox = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default BarBox;
