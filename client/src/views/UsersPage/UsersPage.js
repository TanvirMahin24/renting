import React from "react";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import { UsersList } from "../../components/UsersList";

const UsersPage = () => {
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Users"
        name={"Users"}
      />
      <DashLayout>
        <UsersList />
      </DashLayout>
    </div>
  );
};

export default UsersPage;
