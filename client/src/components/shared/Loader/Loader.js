import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Spinner variant="dark" animation="grow" />
    </div>
  );
};

export default Loader;
