import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryAction } from "../../actions/Category.action";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import { Loader } from "../../components/shared/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const AddCategoryPage = ({ edit, categories, getCategoryAction }) => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (categories === null) {
      getCategoryAction();
    } else if (edit) {
      setData(categories.filter((category) => category.id === parseInt(id))[0]);
    }
  }, [id, categories]);
  return (
    <div className="">
      <CustomNavbar />
      <BreadCrumb
        type={"dashboard"}
        first="dashboard"
        last="Category"
        name={`${edit ? "Edit" : "Add"} Category`}
      />
      <DashLayout>
        {categories === null ? (
          <Loader />
        ) : edit && data ? (
          <AddCategoryForm id={id} edit={true} data={data} />
        ) : (
          <AddCategoryForm />
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps, { getCategoryAction })(AddCategoryPage);
