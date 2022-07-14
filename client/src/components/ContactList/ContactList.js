import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { BiCommentError } from "react-icons/bi";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getContactsAction } from "../../actions/Contact.action";
import { Loader } from "../shared/Loader";
import styles from "./ContactList.module.css";

const ContactList = ({ user, contact, getContactsAction }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
    if (contact === null) {
      getContactsAction();
    }
  }, []);
  return (
    <div>
      <h2 className="border_left mt-3 mb-4">Contact List</h2>
      {contact === null ? (
        <Loader />
      ) : contact.length === 0 ? (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Comment Found!
        </span>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contact.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contact: state.users.contact,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getContactsAction })(ContactList);
