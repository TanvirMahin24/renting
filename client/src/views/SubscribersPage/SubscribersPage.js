import React from "react";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import SubscriberList from "../../components/SubscriberList/SubscriberList";

const SubscribersPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Newsletter"
        name={"Newsletter Subscribers"}
      />
      <DashLayout>
        <SubscriberList />
      </DashLayout>
    </div>
  );
};

export default SubscribersPage;
