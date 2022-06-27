import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import comingSoonImg from "../../assets/icons/coming.png";

const CommingSoonPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Coming Soon"
        name={"Coming Soon"}
      />
      <Container className="py-5 text-center">
        <img src={comingSoonImg} alt="" className={"w-25 img_primary"} />
      </Container>
      <Footer />
    </div>
  );
};

export default CommingSoonPage;
