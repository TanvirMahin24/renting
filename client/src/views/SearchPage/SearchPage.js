import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useLocation } from "react-router-dom";
import { getCategoryAction } from "../../actions/Category.action";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
const queryString = require("query-string");

const SearchPage = ({ categories, getCategoryAction }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (categories === null) {
      getCategoryAction();
    }
  }, []);

  console.log(parsed);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Search"
        name={"Search Results"}
      />
      {categories !== null && categories.length > 0 ? (
        <SearchFilter categories={categories} />
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  listings: state.listing.listings,
});

export default connect(mapStateToProps, { getCategoryAction })(SearchPage);
