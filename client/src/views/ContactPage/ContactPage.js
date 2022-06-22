import React from "react";
import { Container } from "react-bootstrap";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ContactPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Contact"
        name={"Contact Us"}
      />
      <Container className="py-5">
        <span className="d-block fs-3 border_left fw-bold">Contact Now</span>
        <ContactForm />
      </Container>
      <Footer />
    </div>
  );
};

export default ContactPage;
