import React from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const CategoryPage = () => {
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Category"
        name={"Category"}
      />
      <DashLayout>
        <CategoryList />
      </DashLayout>
    </div>
  );
};

export default CategoryPage;
