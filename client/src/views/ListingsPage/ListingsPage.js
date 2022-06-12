import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMyListing } from "../../actions/Listing.action";
import { MyListings } from "../../components/MyListings";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import { Loader } from "../../components/shared/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ListingsPage = ({ getMyListing, listings, isAuthenticated }) => {
  useEffect(() => {
    if (listings === null && isAuthenticated) {
      getMyListing();
    }
  }, [isAuthenticated]);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Listings"
        name={"My Listings"}
      />
      <DashLayout>
        {listings === null ? <Loader /> : <MyListings listings={listings} />}
      </DashLayout>
    </div>
  );
};
const mapStateToProps = (state) => ({
  listings: state.listing.my_listings,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getMyListing })(ListingsPage);
