import { Button, Form, Nav } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addSubscriber } from "../../actions/Subscriber.action";
import { connect } from "react-redux";

const Footer = ({ addSubscriber }) => {
  const [phone, setPhone] = useState("");

  const clickHandler = (e) => {
    let pattern = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

    if (pattern.test(phone)) {
      addSubscriber(phone);
    } else {
      toast.error("Enter a valid phone number");
    }
  };
  return (
    <div className={styles.pt}>
      <div className={styles.wrapper}>
        <div className={styles.phone}>
          <div className={styles.content}>
            <span className="d-block fs-4 text-white fw-light pt-3">
              Drop Your Phone Number & <br /> Get Promotional SMS
            </span>
            <div className={`w-50 mx-auto py-2 ${styles.w100}`}>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="text-center py-3">
              <Button className={styles.btn} onClick={clickHandler}>
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <span className="d-block pt-5 text-center fs-2">Renting Site</span>
          <span className="d-block pb-4 pt-3 text-center fs-5">
            The best place to find your dream home
          </span>

          <div className="d-flex justify-content-center align-items-center flex-md-row flex-column pt-2 pb-3">
            <Nav.Link as={Link} to="/about" className={styles.link}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.link}>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/faq" className={styles.link}>
              FAQ
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.link}>
              Privacy Policy
            </Nav.Link>
            <Nav.Link as={Link} to="/faq" className={styles.link}>
              Terms & Conditions
            </Nav.Link>
          </div>
          <hr className="w-50 mx-auto" />
          <span className="fs-5 text-center d-block pt-3">
            &copy;{new Date().getFullYear()} by{" "}
            <a
              href="https://tanvirmahin.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.copy}
            >
              Tanvir Mahin
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addSubscriber })(Footer);
