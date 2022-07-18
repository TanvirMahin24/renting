import React from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAction } from "../../../actions/Auth.action";
import { TiCogOutline } from "react-icons/ti";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import styles from "./DashLayout.module.css";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../Footer/Footer";
import { BsFolder, BsFolderX, BsTelephoneInbound } from "react-icons/bs";
import { GoReport } from "react-icons/go";

const DashLayout = ({ logoutAction, children, user }) => {
  const navigate = useNavigate();
  const logoutHandeler = async () => {
    let check = await logoutAction();
    if (check === true) {
      navigate("/");
    }
  };
  return (
    <div>
      <Container className="py-4">
        <Row>
          <Col md={3}>
            <div className={styles.nav}>
              <NavLink to="/dashboard" className={styles.nav__item}>
                <span className={styles.icon}>
                  <AiOutlineHome />
                </span>
                <span className={styles.nav__item_text}>Dashboard</span>
              </NavLink>
            </div>
            {/* <div className={styles.nav}>
            <NavLink to="/add-listing" className={styles.nav__item}>
              <span className={styles.icon}>
                <BiAddToQueue />
              </span>
              <span className={styles.nav__item_text}>Add Listing</span>
            </NavLink>
          </div> */}
            <div className={styles.nav}>
              <NavLink to="/my-requests" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BsFolder />
                </span>
                <span className={styles.nav__item_text}>My Requests</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/requests-received" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BsFolderX />
                </span>
                <span className={styles.nav__item_text}>Requests Received</span>
              </NavLink>
            </div>
            <div className={styles.nav}>
              <NavLink to="/listings" className={styles.nav__item}>
                <span className={styles.icon}>
                  <BiAddToQueue />
                </span>
                <span className={styles.nav__item_text}>My Listings</span>
              </NavLink>
            </div>
            {user !== null && user.role === "admin" ? (
              <>
                <div className={styles.nav}>
                  <NavLink to="/category" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <ImStack />
                    </span>
                    <span className={styles.nav__item_text}>Category</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/report" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <GoReport />
                    </span>
                    <span className={styles.nav__item_text}>Reports</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/users" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <FiUsers />
                    </span>
                    <span className={styles.nav__item_text}>Users</span>
                  </NavLink>
                </div>

                <div className={styles.nav}>
                  <NavLink to="/contact-list" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <AiOutlineMail />
                    </span>
                    <span className={styles.nav__item_text}>Contacts</span>
                  </NavLink>
                </div>
                <div className={styles.nav}>
                  <NavLink to="/newsletter" className={styles.nav__item}>
                    <span className={styles.icon}>
                      <BsTelephoneInbound />
                    </span>
                    <span className={styles.nav__item_text}>Newsletter</span>
                  </NavLink>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={styles.nav}>
              <NavLink to="/settings" className={styles.nav__item}>
                <span className={styles.icon}>
                  <TiCogOutline />
                </span>
                <span className={styles.nav__item_text}>Settings</span>
              </NavLink>
            </div>

            <div className={styles.nav}>
              <div className={styles.nav__item} onClick={logoutHandeler}>
                <span className={styles.icon}>
                  <FiLogOut />
                </span>
                <span className={styles.nav__item_text}>Logout</span>
              </div>
            </div>
          </Col>
          <Col md={9}>{children}</Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutAction })(DashLayout);
