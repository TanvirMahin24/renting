import React from "react";
import { AddListingForm } from "../../components/AddListingForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const SettingsPage = () => {
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
        <AddListingForm />
      </DashLayout>
    </div>
  );
};

export default SettingsPage;
