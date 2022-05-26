import React from "react";
import RegisterForm from "../../components/RegisterForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const RegisterPage = () => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Register"
        name={"Register"}
      />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
