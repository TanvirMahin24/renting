import React from "react";
import Footer from "../../components/Footer/Footer";
import ForgetPassForm from "../../components/ForgetPassForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ForgetPasswordPage = () => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Forget Password"
        name={"Forget Password"}
      />
      <ForgetPassForm />
      <Footer />
    </div>
  );
};

export default ForgetPasswordPage;
