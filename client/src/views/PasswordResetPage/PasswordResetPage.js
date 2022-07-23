import React from "react";
import LoginForm from "../../components/LoginForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const PasswordResetPage = () => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Reset Password"
        name={"Password Reset"}
      />
      <LoginForm />
    </div>
  );
};

export default PasswordResetPage;
