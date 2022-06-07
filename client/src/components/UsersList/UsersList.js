import { Button, Table, Text } from "@mantine/core";
import { Container } from "react-bootstrap";
import React, { useEffect } from "react";
import styles from "./UsersList.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiAddToQueue, BiCommentError, BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { connect } from "react-redux";
import { useModals } from "@mantine/modals";
import { Loader } from "../shared/Loader";
import { deleteUsersAction, getUsersAction } from "../../actions/Users.action";

const UsersList = ({ users, getUsersAction, deleteUsersAction, user }) => {
  const modals = useModals();
  const navigate = useNavigate();
  useEffect(() => {
    if (users === null) {
      getUsersAction();
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
          Are you sure you want to delete this user? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete User", cancel: "Cancel" },
      onConfirm: () => deleteUsersAction(id),
    });
  };
  return (
    <Container>
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-center align-items-start py-3 py-md-0">
        <h2 className="border_left mt-3 mb-4">User List</h2>
      </div>

      {users === null ? (
        <Loader />
      ) : users.length === 0 ? (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Category Found!
        </span>
      ) : (
        <>
          <Table verticalSpacing="sm" striped highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th className="">First Name</th>
                <th className="">Last Name</th>
                <th className="">Email</th>
                <th className="">Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr, index) => (
                <tr key={usr.id}>
                  <td>{index + 1}</td>
                  <td>{usr.first_name}</td>
                  <td>{usr.last_name}</td>
                  <td>{usr.email}</td>
                  <td>{usr.phone}</td>
                  <td>
                    <div className="d-flex align-items-center flex-md-row flex-column">
                      <Button
                        onClick={() => navigate(`/users/${usr.id}/edit`)}
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
                        onClick={() => deleteHandeler(usr.id)}
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
  users: state.users.users,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getUsersAction,
  deleteUsersAction,
})(UsersList);
