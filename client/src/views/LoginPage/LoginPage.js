import React from "react";
import LoginForm from "../../components/LoginForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const LoginPage = () => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <CustomNavbar />
      <BreadCrumb type={"home"} first="home" last="Login" name={"Login"} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
