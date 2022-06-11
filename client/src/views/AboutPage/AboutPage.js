import React from "react";
import AboutHero from "../../components/AboutHero/AboutHero";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const AboutPage = () => {
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb type={"home"} first="home" last="About" name={"About Us"} />
      <AboutHero />
    </div>
  );
};

export default AboutPage;
