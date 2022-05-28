import React from "react";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const AddCategoryPage = () => {
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Category"
        name={"Add Category"}
      />
      <DashLayout>
        <AddCategoryForm />
      </DashLayout>
    </div>
  );
};

export default AddCategoryPage;
