import { Button, Text } from "@mantine/core";
import { Col, Container, Row, Table } from "react-bootstrap";
import React, { useEffect } from "react";
import styles from "./MyListings.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiAddToQueue, BiCommentError, BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { connect } from "react-redux";
import {
  deleteCategoryAction,
  getCategoryAction,
} from "../../actions/Category.action";
import { useModals } from "@mantine/modals";
import { Loader } from "../shared/Loader";
import ListingCard from "../shared/ListingCard/ListingCard";

const MyListings = ({ user, listings, deleteCategoryAction }) => {
  const modals = useModals();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  const deleteHandeler = (id) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete Category", cancel: "Cancel" },
      onConfirm: () => deleteCategoryAction(id),
    });
  };
  return (
    <Container>
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-center align-items-start py-3 py-md-0">
        <h2 className="border_left mt-3 mb-4">My Listings</h2>
        <Link to="/add-listing" className="btn btn_primary">
          <BiAddToQueue className="me-2" size={22} />
          Add Listing
        </Link>
      </div>

      {listings === null ? (
        <Loader />
      ) : listings.rows.length === 0 ? (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Listing Found!
        </span>
      ) : (
        <>
          <Row>
            {listings.rows.map((listing) => (
              <Col md={6} key={listing.id} className="py-3">
                <ListingCard data={listing} edit />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getCategoryAction,
  deleteCategoryAction,
})(MyListings);
