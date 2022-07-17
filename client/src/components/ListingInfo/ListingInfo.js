import React from "react";
import { Badge } from "@mantine/core";
import styles from "./ListingInfo.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs";
import Moment from "react-moment";
import divisions from "../../constants/Divisions";
import districts from "../../constants/Districts";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";

import bedroomImg from "../../assets/icons/bedroom.png";
import bathroomImg from "../../assets/icons/bathroom.png";
import drawingImg from "../../assets/icons/drawing.png";
import kitchenImg from "../../assets/icons/kitchen.png";
import diningImg from "../../assets/icons/dining.png";
import { useNavigate } from "react-router-dom";
import { addToFavorite, removeFromFavorite } from "../../actions/Fav.action";
import { connect } from "react-redux";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const ListingInfo = ({ listing, removeFromFavorite, addToFavorite, fav }) => {
  const navigate = useNavigate();
  const district = listing
    ? districts.filter((dis) => dis.id === listing.district)[0]
    : "";
  return listing ? (
    <Container className="pb-5">
      <Row>
        <Col md={7}>
          <div className="pt-md-4 pt-3 d-flex align-items-center">
            <Badge color="orange" size="xl" radius="xs" variant="filled">
              {listing.category.name}
            </Badge>

            <span className="fw-bold ms-3">
              <BsCalendar3 className="text_primary" />{" "}
              <Moment format="DD MMMM YYYY">{listing.createdAt}</Moment>
            </span>
          </div>
          <h1 className="fw-bolder pt-4 pb-2">{listing.title}</h1>
          <span className={styles.location}>
            <FaMapMarkerAlt className="text_primary" />{" "}
            <span className="fw-bold">
              {district.name},{" "}
              {
                divisions.filter((div) => div.id === district.division_id)[0]
                  .name
              }
            </span>
            <button
              className={styles.btn}
              onClick={() =>
                fav.includes(listing.id)
                  ? removeFromFavorite(listing.id)
                  : addToFavorite(listing.id)
              }
            >
              {fav.includes(listing.id) ? (
                <MdFavorite />
              ) : (
                <MdOutlineFavoriteBorder />
              )}
            </button>
          </span>
          <div className="border_left h3 mt-5">Description</div>
          <span className="d-block fs-6 py-3">{listing.description}</span>
          {listing.requirements && listing.requirements.length > 0 ? (
            <Col md={12}>
              <div className="border_left h3 mt-5 mb-3">Requirements</div>
              {listing.requirements.map((item) => (
                <span className="d-block py-2 fs-5" key={item.id}>
                  <IoMdCheckboxOutline className="text_primary me-3 " />
                  {item.name}
                </span>
              ))}
            </Col>
          ) : (
            <></>
          )}
        </Col>
        <Col md={5} className="mt-4">
          <div className="bg-light  p-4 ">
            <button
              onClick={() => navigate(`/booking/${listing.slug}`)}
              className="btn_primary w-100"
            >
              Request For Booking
            </button>
            <div className="border_left h3 mb-4 mt-4">Property Details</div>
            <Row className="py-2">
              <Col xs={6}>
                <span className="fw-bold">Category</span>
              </Col>
              <Col xs={6}>
                <span className="">{listing.category.name}</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs={6}>
                <span className="fw-bold">Area</span>
              </Col>
              <Col xs={6}>
                <span className="">{listing.size} sq.ft</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs={6}>
                <span className="fw-bold">Rent</span>
              </Col>
              <Col xs={6}>
                <span className="">{listing.price} TK</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs={6}>
                <span className="fw-bold">District</span>
              </Col>
              <Col xs={6}>
                <span className="">{district.name}</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs={6}>
                <span className="fw-bold">Division</span>
              </Col>
              <Col xs={6}>
                <span className="">
                  {
                    divisions.filter(
                      (div) => div.id === district.division_id
                    )[0].name
                  }
                </span>
              </Col>
            </Row>
            <div className="border_left h4 mt-4 mb-2">Keywords</div>
            <div className="py-2">
              {listing.keywords.map((item) => (
                <Badge
                  color="orange"
                  size="lg"
                  variant="dot"
                  className="m-1 ml-0"
                >
                  {item.name}
                </Badge>
              ))}
            </div>
            <div className=" mt-5 mb-2">
              <button className="btn_danger outline">
                Report This Listing
              </button>
            </div>
          </div>
        </Col>

        <Col md={12}>
          <Row className=" mt-5">
            <Col md={12} className=" pb-0">
              <div className="border_left h3 mb-4">Room Details</div>
              <Row>
                {listing.bedrooms && listing.bedrooms > 0 ? (
                  <Col className="p-3">
                    <div className={styles.room}>
                      <div className="d-flex align-items-center">
                        <img src={bedroomImg} alt="" className={styles.icon} />
                        <span className="d-block fs-3 fw-bold ps-2">
                          {listing.bedrooms}
                        </span>
                      </div>
                      <span className={styles.room_title}>Bedroom</span>
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
                {listing.bathrooms && listing.bathrooms > 0 ? (
                  <Col className="p-3">
                    <div className={styles.room}>
                      <div className="d-flex align-items-center">
                        <img src={bathroomImg} alt="" className={styles.icon} />
                        <span className="d-block fs-3 fw-bold ps-2">
                          {listing.bathrooms}
                        </span>
                      </div>
                      <span className={styles.room_title}>Bathroom</span>
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
                {!(listing.dining && listing.dining == 0) ? (
                  <Col className="p-3">
                    <div className={styles.room}>
                      <div className="d-flex align-items-center">
                        <img src={diningImg} alt="" className={styles.icon} />
                        <span className="d-block fs-3 fw-bold ps-2">
                          {listing.dining}
                        </span>
                      </div>
                      <span className={styles.room_title}>Dining</span>
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
                {!(listing.kitchen && listing.kitchen == 0) ? (
                  <Col className="p-3">
                    <div className={styles.room}>
                      <div className="d-flex align-items-center">
                        <img src={kitchenImg} alt="" className={styles.icon} />
                        <span className="d-block fs-3 fw-bold ps-2">
                          {listing.kitchen}
                        </span>
                      </div>
                      <span className={styles.room_title}>Kitchen</span>
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
                {!(listing.drawingroom && listing.drawingroom == 0) ? (
                  <Col className="p-3">
                    <div className={styles.room}>
                      <div className="d-flex align-items-center">
                        <img src={drawingImg} alt="" className={styles.icon} />
                        <span className="d-block fs-3 fw-bold ps-2">
                          {listing.drawingroom}
                        </span>
                      </div>
                      <span className={styles.room_title}>Drawing room</span>
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => ({
  fav: state.fav.favorite,
});
export default connect(mapStateToProps, { removeFromFavorite, addToFavorite })(
  ListingInfo
);
