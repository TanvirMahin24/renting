import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LandingFilter from "../../components/LandingFilter/LandingFilter";
import LandingHero from "../../components/LandingHero/LandingHero";
import ListingCard from "../../components/shared/ListingCard/ListingCard";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import { Badge } from "@mantine/core";

const LandingPage = () => {
  return (
    <div
      style={{ position: "relative", background: "var(--light) !important" }}
    >
      <CustomNavbar landing />
      <LandingHero />
      <LandingFilter />
      <Container className="py-5 my-5" style={{ position: "relative" }}>
        <Col md={12} className="pb-4 text-center">
          <div className="text-center">
            <Badge color="orange" size="xl">
              Listings
            </Badge>
          </div>
          <h2>Recent Lisitngs</h2>
        </Col>
        <Row>
          <Col md={4}>
            <ListingCard />
          </Col>
          <Col md={4}>
            <ListingCard />
          </Col>
          <Col md={4}>
            <ListingCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
