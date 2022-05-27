import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LandingFilter from "../../components/LandingFilter/LandingFilter";
import LandingHero from "../../components/LandingHero/LandingHero";
import ListingCard from "../../components/shared/ListingCard/ListingCard";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const LandingPage = () => {
  return (
    <div
      style={{ position: "relative", background: "var(--light) !important" }}
    >
      <CustomNavbar landing />
      <LandingHero />
      <LandingFilter />
      <Container className="py-5 my-5" style={{ position: "relative" }}>
        <Row>
          <Col md={4}>
            <ListingCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
