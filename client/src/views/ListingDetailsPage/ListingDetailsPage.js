import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getListingDetails } from "../../actions/Listing.action";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ListingDetailsPage = ({ listing, getListingDetails }) => {
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      getListingDetails(slug);
    }
  }, [slug]);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last={`${
          listing !== null && slug === listing.slug
            ? listing.title
            : "Loading..."
        }`}
        name={`${
          listing !== null && slug === listing.slug
            ? listing.title
            : "Loading..."
        }`}
      />
      {slug}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing.selected_listing,
});

export default connect(mapStateToProps, { getListingDetails })(
  ListingDetailsPage
);
