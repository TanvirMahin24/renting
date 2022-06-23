import React from "react";
import FaqList from "../../components/FaqList/FaqList";
import Footer from "../../components/Footer/Footer";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const FaqPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="FAQ"
        name={"Frequently Asked Questions"}
      />
      <FaqList />
      <Footer />
    </div>
  );
};

export default FaqPage;
