import React from "react";
import AboutHero from "../../components/AboutHero/AboutHero";
import Footer from "../../components/Footer/Footer";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import TestimonialList from "../../components/TestimonialList/TestimonialList";

const AboutPage = () => {
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb type={"home"} first="home" last="About" name={"About Us"} />
      <AboutHero />
      <TestimonialList />
      <Footer />
    </div>
  );
};

export default AboutPage;
