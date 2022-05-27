import React from "react";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
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
        last="Settings"
        name={"Settings"}
      />
      <DashLayout>
        <SettingsForm />
      </DashLayout>
    </div>
  );
};

export default SettingsPage;
