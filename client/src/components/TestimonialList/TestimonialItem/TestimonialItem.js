import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import styles from "./TestimonialItem.module.css";

const TestimonialItem = ({ name, position, content }) => {
  return (
    <>
      {name && (
        <div className={name && styles.item}>
          <div className="px-4">
            <span className={`${styles.quote} pl-4 d-block`}>
              <FaQuoteLeft />
            </span>
            <div className={styles.content__area}>
              <span className={`${styles.content} d-block py-3 px-2`}>
                {content}
              </span>
            </div>
            {/* <span
              className={`${styles.quote} ${styles.quote__right} pr-4 d-block float-right`}
            >
              <FaQuoteRight />
            </span> */}
          </div>
          <div className="d-flex justify-content-center align-items-center mt-auto">
            <div className={`${styles.bottom} text-center`}>
              <span className={`${styles.name} d-block`}>{name}</span>
              <span className="d-block">{position}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialItem;
