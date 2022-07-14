import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getListingDetails } from "../../actions/Listing.action";
import Footer from "../../components/Footer/Footer";
import RequestForm from "../../components/RequestForm/RequestForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import ListingCard from "../../components/shared/ListingCard/ListingCard";
import Loader from "../../components/shared/Loader/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const BookingRequestPage = ({ data, getListingDetails, user }) => {
  const { id } = useParams();
  useEffect(() => {
    if (!data || data.slug !== id) {
      getListingDetails(id);
    }
  }, [id]);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Booking Request"
        name={"Booking Request"}
      />
      {!data || data.slug !== id ? (
        <>
          <Loader />
        </>
      ) : (
        <Container className="py-md-5 py-4">
          <Row>
            <Col md={8} className="pe-4">
              <RequestForm package={id} data={data} />
            </Col>
            <Col md={4} className="pt-5">
              <ListingCard data={data} />
            </Col>
          </Row>
        </Container>
      )}

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.listing.selected_listing,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getListingDetails })(
  BookingRequestPage
);
