import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { BiAddToQueue, BiCommentError } from "react-icons/bi";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubsAction } from "../../actions/Subscriber.action";
import JSONToCSVConvertor from "../../utils/CsvDown";
import { Loader } from "../shared/Loader";
import styles from "./SubscriberList.module.css";

const SubscriberList = ({ user, subscriber, getSubsAction }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
    if (subscriber === null) {
      getSubsAction();
    }
  }, []);
  return (
    <div>
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-center align-items-start py-3 py-md-0">
        <h2 className="border_left mt-3 mb-4">Newsletter Subscribers</h2>
        <button
          onClick={() =>
            subscriber !== null &&
            JSONToCSVConvertor(JSON.stringify(subscriber), "Subscribers", true)
          }
          className="btn btn_primary"
        >
          <BiAddToQueue className="me-2" size={22} />
          Download CSV
        </button>
      </div>

      {subscriber === null ? (
        <Loader />
      ) : subscriber.length === 0 ? (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Subscriber Found!
        </span>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {subscriber.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.phone}</td>
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
  subscriber: state.users.subscriber,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getSubsAction })(SubscriberList);
