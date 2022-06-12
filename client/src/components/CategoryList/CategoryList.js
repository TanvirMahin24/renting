import { Button, Text } from "@mantine/core";
import { Container, Table } from "react-bootstrap";
import React, { useEffect } from "react";
import styles from "./CategoryList.module.css";
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

const CategoryList = ({
  user,
  categories,
  getCategoryAction,
  deleteCategoryAction,
}) => {
  const modals = useModals();
  const navigate = useNavigate();
  useEffect(() => {
    if (categories === null) {
      getCategoryAction();
    }
    if (user !== null && user.role !== "admin") {
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
        <h2 className="border_left mt-3 mb-4">Category List</h2>
        <Link to="/category/add" className="btn btn_primary">
          <BiAddToQueue className="me-2" size={22} />
          Add Category
        </Link>
      </div>

      {categories === null ? (
        <Loader />
      ) : categories.length === 0 ? (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Category Found!
        </span>
      ) : (
        <>
          <Table responsive striped highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th className="w-100">Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <div className="d-flex align-items-center flex-md-row flex-column">
                      <Button
                        onClick={() =>
                          navigate(`/category/${category.id}/edit`)
                        }
                        leftIcon={<BiEditAlt />}
                        radius="xs"
                        size="xs"
                        className="me-2 mb-md-0 mb-2"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        leftIcon={<BsTrash />}
                        radius="xs"
                        size="xs"
                        onClick={() => deleteHandeler(category.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getCategoryAction,
  deleteCategoryAction,
})(CategoryList);
