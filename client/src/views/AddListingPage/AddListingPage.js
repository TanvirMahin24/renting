import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getListingDetails } from "../../actions/Listing.action";
import { AddListingForm } from "../../components/AddListingForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const SettingsPage = ({ edit, getListingDetails, data }) => {
  const { slug } = useParams();
  useEffect(() => {
    if (slug && edit) {
      getListingDetails(slug);
    }
  }, [slug]);
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Add Listing"
        name={"Add Listing"}
      />
      <DashLayout>
        {edit === true && data !== null ? (
          <AddListingForm edit={edit} data={data} />
        ) : (
          <AddListingForm />
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.listing.selected_listing,
});

export default connect(mapStateToProps, { getListingDetails })(SettingsPage);
