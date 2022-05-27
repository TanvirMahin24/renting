import React from "react";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const DashboardPage = () => {
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Dashboard"
        name={"Dashboard"}
      />
      <DashLayout>
        <h1>Dashboard</h1>
      </DashLayout>
    </div>
  );
};

export default DashboardPage;
