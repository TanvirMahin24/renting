import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CustomNavbar.module.css";
import logoImg from "../../../assets/logo.png";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { openSpotlight } from "@mantine/spotlight";
import { Tooltip } from "@mantine/core";
import { connect } from "react-redux";
import { logoutAction } from "../../../actions/Auth.action";

const CustomNavbar = ({ landing, isAuth, logoutAction, user, searchRes }) => {
  const [tooltipActive, setTooltipActive] = useState(false);
  useEffect(() => {}, [searchRes]);
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="md"
        bg={`${landing ? "transparent" : "white"}`}
        variant="dark"
        className={styles.nav + `${landing ? " " + styles.landing : ""}`}
      >
        <Container className={`${landing ? styles.bg_md_white : "bg-white"}`}>
          <Navbar.Brand as={Link} to="/">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logoImg} className={styles.logo} alt="" />{" "}
              <span
                className={`d-block pt-1 ps-2 fw-bold  fs-3 ${
                  landing ? styles.bg_md_white : "text-dark"
                }`}
              >
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
              <Nav.Link as={Link} to="/faq" className={styles.link}>
                FAQ
              </Nav.Link>
              {isAuth ? (
                <Nav.Link
                  as={Link}
                  to="/account"
                  className={`${styles.link} d-md-none d-block`}
                >
                  Account
                </Nav.Link>
              ) : (
                <>
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
                </>
              )}
            </Nav>
            <Nav
              className={`d-md-flex align-items-center d-none`}
              id="nav__custom"
            >
              <Tooltip
                opened={tooltipActive}
                label={
                  <span>
                    <span className="code_block">Ctrl</span> +{" "}
                    <span className="code_block">Shift</span> +{" "}
                    <span className="code_block">S</span>
                  </span>
                }
                radius="s"
                styles={{
                  arrow: {
                    boxShadow: "var(--box-shadow-1) !important",
                    background: "#fff !important",
                    color: "var(--secondary)",
                  },
                  body: {
                    boxShadow: "var(--box-shadow-1) !important",
                    background: "#fff !important",
                    color: "var(--secondary)",
                    fontStyle: "oblique",
                  },
                }}
                withArrow
              >
                <Nav.Link
                  className={styles.nav_btn}
                  onMouseEnter={() => setTooltipActive(true)}
                  onMouseLeave={() => setTooltipActive(false)}
                  onClick={() => openSpotlight()}
                >
                  <span>
                    <AiOutlineSearch />
                  </span>
                </Nav.Link>
              </Tooltip>
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
                {isAuth ? (
                  <>
                    <span className="d-block fw-bold px-3 text_primary">
                      {user && user.first_name ? user.first_name : ""}
                    </span>
                    <span className="d-block px-3 text-capitalize ">
                      {user && user.role ? user.role : ""}
                    </span>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logoutAction()}>
                      Logout
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/login">
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register">
                      Register
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  searchRes: state.listing.search_listings,
});

export default connect(mapStateToProps, { logoutAction })(CustomNavbar);
