import React from "react";
import ContactList from "../../components/ContactList/ContactList";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ContactListPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Contact"
        name={"Contact List"}
      />
      <DashLayout>
        <ContactList />
      </DashLayout>
    </div>
  );
};

export default ContactListPage;
