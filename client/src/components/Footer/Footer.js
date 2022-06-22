import { Button, Form } from "react-bootstrap";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.pt}>
      <div className={styles.wrapper}>
        <div className={styles.phone}>
          <div className={styles.content}>
            <span className="d-block fs-4 text-white fw-light pt-3">
              Drop Your Phone Number & <br /> Get Promotional SMS
            </span>
            <div className="w-50 mx-auto py-2">
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                className={styles.input}
              />
            </div>
            <div className="text-center py-3">
              <Button className={styles.btn}>Submit</Button>
            </div>
          </div>
        </div>
        <div className="">
          <span className="d-block pt-5 text-center fs-2">Renting Site</span>
          <span className="d-block pb-5 pt-3 text-center fs-5">
            The best place to find your dream home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
