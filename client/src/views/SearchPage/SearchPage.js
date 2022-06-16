import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useLocation } from "react-router-dom";
import { getCategoryAction } from "../../actions/Category.action";
import { filterListings } from "../../actions/Listing.action";
import EmptySearchResult from "../../components/EmptySearchResult/EmptySearchResult";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import SearchResults from "../../components/SearchResults/SearchResults";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";
import styles from "./SearchPage.module.css";
const queryString = require("query-string");

const SearchPage = ({
  categories,
  getCategoryAction,
  listings,
  filterListings,
}) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (categories === null) {
      getCategoryAction();
    }

    if (parsed.category || parsed.price) {
      const price = parsed.price.split(",");
      filterListings(
        parseInt(price[0]) * 250,
        parseInt(price[1]) * 250,
        parsed.category
      );
    }
  }, []);

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
      <div className={styles.result}>
        {listings !== null ? (
          <SearchResults data={listings} />
        ) : (
          <EmptySearchResult title={"Start Searching Now"} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  listings: state.listing.filter_listings,
});

export default connect(mapStateToProps, { getCategoryAction, filterListings })(
  SearchPage
);
