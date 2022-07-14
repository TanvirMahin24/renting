import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./StatCard.module.css";

const StatCard = ({ icon, title, count }) => {
  return (
    <div className={styles.crd}>
      <Row>
        <Col xs={3}>
          <div className={styles.icon}>{icon}</div>
        </Col>
        <Col xs={9}>
          <div className={styles.title}>{title}</div>
          <div className={styles.count}>{count}</div>
        </Col>
      </Row>
    </div>
  );
};

export default StatCard;
