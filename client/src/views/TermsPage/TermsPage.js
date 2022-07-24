import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import Terms from "../../components/Terms/Terms";

const TermsPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Terms & Conditions"
        name={"Terms & Conditions"}
      />
      <Container className="py-5">
        <Terms />
      </Container>
      <Footer />
    </div>
  );
};

export default TermsPage;
