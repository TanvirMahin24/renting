import React from "react";
import { BarBox } from "../shared/BarBox";
import { Col, Container, Row } from "react-bootstrap";
import { Badge } from "@mantine/core";
import styles from "./AboutHero.module.css";
import AvComp from "./AvComp";
import home from "../../assets/icons/home.png";
import verification from "../../assets/icons/verification.png";
import salary from "../../assets/icons/salary.png";
import contract from "../../assets/icons/enterprise.png";
import bg from "../../assets/About/1.jpg";

const AboutHero = () => {
  return (
    <div className="pb-5">
      <Container>
        <Row>
          <Col
            md={5}
            className="p-5 d-flex justify-content-center align-items-center"
          >
            <div className="">
              <img src={bg} alt="" className={styles.img} />
            </div>
          </Col>
          <Col md={7} className="pb-4 pt-5">
            <div className="pt-4 pb-5">
              <Badge color="orange" size="xl">
                About Us
              </Badge>
            </div>
            <h1 className="fw-bolder">
              We Provide The Best Renting Solution For Students
            </h1>
            <span className="d-block lead pb-5 pt-3">
              Over 39,000 people work for us in more than 70 countries all over
              the This breadth of global coverage, combined with specialist
              services
            </span>
            <Row className="pb-5">
              <Col className="py-3">
                <AvComp img={home} title="Best houses" />
              </Col>
              <Col className="py-3">
                <AvComp img={salary} title="Affordable" />
              </Col>
              <Col className="py-3">
                <AvComp img={verification} title="Verified" />
              </Col>
            </Row>
            <BarBox>
              <span className="d-block fs-5 fw-light ps-3">
                "There is a magic in that little world, home; it is a mystic
                circle that surrounds comforts and virtues never known beyond
                its hallowed limits.{" "}
                <span className="fw-normal text_primary ms-3">
                  - Robert Southey
                </span>
              </span>
            </BarBox>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutHero;
