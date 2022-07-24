import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Privacy Policy"
        name={"Privacy Policy"}
      />
      <Container className="py-5">
        <PrivacyPolicy />
      </Container>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
