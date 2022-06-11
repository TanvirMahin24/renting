import React from "react";
import styles from "./ListingCard.module.css";
import { Badge } from "@mantine/core";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import bedroomImg from "../../../assets/icons/bedroom.png";
import bathroomImg from "../../../assets/icons/bathroom.png";
import sizeImg from "../../../assets/icons/house_size.png";

import demoImg from "../../../assets/Landing/1.jpg";
import districts from "../../../constants/Districts";
import divisions from "../../../constants/Divisions";
import { kFormat } from "../../../utils/kFormat";

const ListingCard = ({ data }) => {
  const district = data
    ? districts.filter((dis) => dis.id === data.district)[0]
    : "";
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
              {data?.category?.name}
            </Badge>
          </div>
          <div className="d-flex justify-content-between align-items-center p-3">
            <span className={styles.location}>
              <FaMapMarkerAlt />{" "}
              <span className={styles.fs_small}>
                {district.name},{" "}
                {
                  divisions.filter((div) => div.id === district.division_id)[0]
                    .name
                }
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.price}>
          {data.price} TK/<small>Month</small>
        </span>
        <Link to={`/listing/${data.slug}`} className={styles.title}>
          {data.title}
        </Link>
        <span className="d-block text-secondary py-3" style={{ fontSize: 14 }}>
          {data.description.substring(0, 100)}
        </span>
        <div className={styles.rooms}>
          <div className={styles.room}>
            <div className="d-flex align-items-center">
              <img src={bedroomImg} alt="" className={styles.icon} />
              <span className="d-block fs-5 fw-bold ps-2">{data.bedrooms}</span>
            </div>
            <span className={styles.room_title}>Bedrooms</span>
          </div>
          <div className={styles.room}>
            <div className="d-flex align-items-center">
              <img src={bathroomImg} alt="" className={styles.icon} />
              <span className="d-block fs-5 fw-bold ps-2">
                {data.bathrooms}
              </span>
            </div>
            <span className={styles.room_title}>Bathrooms</span>
          </div>
          <div className={styles.room}>
            <div className="d-flex align-items-center">
              <img src={sizeImg} alt="" className={styles.icon} />
              <span className="d-block fs-5 fw-bold ps-2">
                {kFormat(data.size, 1)}
              </span>
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
