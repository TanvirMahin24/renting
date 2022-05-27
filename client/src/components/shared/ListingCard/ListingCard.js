import React from "react";
import styles from "./ListingCard.module.css";
import { Badge } from "@mantine/core";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import bedroomImg from "../../../assets/icons/bedroom.png";
import bathroomImg from "../../../assets/icons/bathroom.png";
import sizeImg from "../../../assets/icons/house_size.png";

import demoImg from "../../../assets/Landing/1.jpg";

const ListingCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={demoImg} alt="" className={styles.img} />
        <div className={styles.heading_top}>
          <div className="text-end p-3">
            <Badge
              color="green"
              size="xl"
              radius="xs"
              style={{ fontWeight: "normal" }}
              variant="filled"
            >
              SUBLET
            </Badge>
          </div>
          <div className="d-flex justify-content-between align-items-center p-3">
            <span className={styles.location}>
              <FaMapMarkerAlt />{" "}
              <span className={styles.fs_small}>San Francisco, CA</span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.price}>
          4,000 TK/<small>Month</small>
        </span>
        <Link to="/" className={styles.title}>
          3 Room Flat for student
        </Link>
        <span className="d-block text-secondary py-3" style={{ fontSize: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eveniet
          voluptate sequi, veniam omnis esse?
        </span>
        <div className={styles.rooms}>
          <div className={styles.room}>
            <div className="d-flex align-items-center">
              <img src={bedroomImg} alt="" className={styles.icon} />
              <span className="d-block fs-5 fw-bold ps-2">5</span>
            </div>
            <span className={styles.room_title}>Bedrooms</span>
          </div>
          <div className={styles.room}>
            <div className="d-flex align-items-center">
              <img src={bathroomImg} alt="" className={styles.icon} />
              <span className="d-block fs-5 fw-bold ps-2">2</span>
            </div>
            <span className={styles.room_title}>Bathrooms</span>
          </div>
          <div className={styles.room}>
            <div className="d-flex align-items-center">
              <img src={sizeImg} alt="" className={styles.icon} />
              <span className="d-block fs-5 fw-bold ps-2">1K</span>
            </div>
            <span className={styles.room_title}>
              Size in ft<sup>2</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
