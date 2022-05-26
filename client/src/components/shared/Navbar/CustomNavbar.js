import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CustomNavbar.module.css";
import logoImg from "../../../assets/logo.png";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
const CustomNavbar = () => {
  // DROPDOWN CONTROL
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="white"
        variant="dark"
        className={styles.nav}
      >
        <Container className="bg-white">
          <Navbar.Brand as={Link} to="/">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logoImg} className={styles.logo} alt="" />{" "}
              <span className="d-block pt-1 ps-2 fw-bold text-dark fs-3">
                Renting Site
              </span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav nav__custom">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className={styles.link}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className={styles.link}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className={styles.link}>
                Contact
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                className={`${styles.link} d-md-none d-block`}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className={`${styles.link} d-md-none d-block`}
              >
                Register
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/account"
                className={`${styles.link} d-md-none d-block`}
              >
                Account
              </Nav.Link>
            </Nav>
            <Nav
              className={`d-md-flex align-items-center d-none`}
              id="nav__custom"
            >
              <Nav.Link href="#deets" className={styles.nav_btn}>
                <span>
                  <AiOutlineSearch />
                </span>
              </Nav.Link>
              <NavDropdown
                renderMenuOnMount={true}
                drop="down"
                title={
                  <div className={styles.nav_btn}>
                    <AiOutlineUser />
                  </div>
                }
                menuVariant="light"
              >
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
