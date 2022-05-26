import React from "react";
import { Link } from "react-router-dom";
import styles from "./BreadCrumb.module.css";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Container } from "react-bootstrap";

const BreadCrumb = ({ name, first, last, type }) => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <span className="d-block fs-2 pb-4 fw-bold">{name}</span>
        <div className="d-flex align-items-center justify-content-start">
          {type === "home" ? (
            <span className={styles.logo}>
              <AiOutlineHome />
            </span>
          ) : (
            <></>
          )}
          {first ? (
            <>
              <Link className={styles.first} to={type === "home" ? "/" : "/"}>
                {first}
              </Link>{" "}
              <span className={styles.divider}>
                <AiOutlineRight />
              </span>
            </>
          ) : (
            <></>
          )}
          {first ? (
            <>
              <span className={styles.last}>{last}</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BreadCrumb;
