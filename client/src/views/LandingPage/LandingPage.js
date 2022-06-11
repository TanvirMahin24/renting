import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LandingFilter from "../../components/LandingFilter/LandingFilter";
import LandingHero from "../../components/LandingHero/LandingHero";
import ListingCard from "../../components/shared/ListingCard/ListingCard";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import { Badge } from "@mantine/core";
import { connect } from "react-redux";
import { getCategoryAction } from "../../actions/Category.action";
import { getListingLaningpage } from "../../actions/Listing.action";

const LandingPage = ({
  categories,
  listings,
  getCategoryAction,
  getListingLaningpage,
}) => {
  useEffect(() => {
    if (categories === null) {
      getCategoryAction();
    }
    getListingLaningpage();
  }, []);
  return (
    <div
      style={{ position: "relative", background: "var(--light) !important" }}
    >
      <CustomNavbar landing />
      <LandingHero />

      {categories !== null && categories.length > 0 ? (
        <LandingFilter categories={categories} />
      ) : (
        <></>
      )}

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
          {listings !== null && listings.rows.length > 0 ? (
            listings.rows.map((item) => (
              <Col md={4} className="py-3" key={item.id}>
                <ListingCard data={item} />
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  listings: state.listing.listings,
});

export default connect(mapStateToProps, {
  getCategoryAction,
  getListingLaningpage,
})(LandingPage);
