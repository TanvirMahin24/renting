import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { EmptySearchResult } from "../EmptySearchResult";
import ListingCard from "../shared/ListingCard/ListingCard";
// import styles from "./SearchResults.module.css";

const SearchResults = ({ data }) => {
  return (
    <Container>
      <Row>
        {data.rows.length > 0 ? (
          data.rows.map((listing) => (
            <Col key={listing.id} md={4}>
              <ListingCard data={listing} />
            </Col>
          ))
        ) : (
          <EmptySearchResult title="No Result Found!" />
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;
