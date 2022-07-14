import React from "react";
import { connect } from "react-redux";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import ModDashboard from "../../components/ModDashboard/ModDashboard";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import UserDashboard from "../../components/UserDashboard/UserDashboard";

const DashboardPage = ({ user }) => {
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
        {user !== null && user.role === "user" ? (
          <UserDashboard />
        ) : user !== null && user.role === "admin" ? (
          <AdminDashboard />
        ) : user !== null && user.role === "moderator" ? (
          <ModDashboard />
        ) : (
          <></>
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(DashboardPage);
