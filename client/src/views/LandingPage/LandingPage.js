import React from "react";
import LandingFilter from "../../components/LandingFilter/LandingFilter";
import LandingHero from "../../components/LandingHero/LandingHero";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const LandingPage = () => {
  return (
    <div
      style={{ position: "relative", background: "var(--light) !important" }}
    >
      <CustomNavbar landing />
      <LandingHero />
      <LandingFilter />
    </div>
  );
};

export default LandingPage;
