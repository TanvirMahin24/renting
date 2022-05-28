import { Button, Table } from "@mantine/core";
import { Container } from "react-bootstrap";
import React, { useEffect } from "react";
import styles from "./CategoryList.module.css";
import { Link } from "react-router-dom";
import { BiAddToQueue, BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { connect } from "react-redux";
import { getCategoryAction } from "../../actions/Category.action";

const CategoryList = ({ categories, getCategoryAction }) => {
  useEffect(() => {
    if (categories === null) {
      getCategoryAction();
    }
  }, []);
  return (
    <Container>
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
        <h2 className="border_left mt-3 mb-4">Category List</h2>
        <Link to="/category/add" className="btn btn_primary">
          <BiAddToQueue className="me-2" size={22} />
          Add Category
        </Link>
      </div>
      <Table verticalSpacing="sm" striped highlightOnHover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Button
                      leftIcon={<BiEditAlt />}
                      radius="xs"
                      size="xs"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      color="red"
                      leftIcon={<BsTrash />}
                      radius="xs"
                      size="xs"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps, { getCategoryAction })(CategoryList);
