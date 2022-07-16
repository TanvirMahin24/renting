import { Badge } from "@mantine/core";
import React from "react";
import { Table } from "react-bootstrap";
import { BiCommentError } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./ReqListForApproval.module.css";

const ReqListForApproval = ({ data, status, dashboard }) => {
  return (
    <div>
      <h2 className="border_left mt-3 mb-4">Requests For Approval</h2>
      {!dashboard ? (
        <div className="d-flex align-items-center pb-3">
          <Link to="/requests-received/pending" className={styles.link}>
            <Badge
              variant={`${status === "pending" ? "filled" : "outline"}`}
              size="xl"
            >
              <span style={{ cursor: "pointer" }}>Pending</span>
            </Badge>
          </Link>
          <Link to="/requests-received/approved" className={styles.link}>
            <Badge
              variant={`${status === "approved" ? "filled" : "outline"}`}
              color="green"
              size="xl"
            >
              <span style={{ cursor: "pointer" }}>Approved</span>
            </Badge>
          </Link>
          <Link to="/requests-received/rejected" className={styles.link}>
            <Badge
              variant={`${status === "rejected" ? "filled" : "outline"}`}
              color="red"
              size="xl"
            >
              <span style={{ cursor: "pointer" }}>Rejected</span>
            </Badge>
          </Link>
        </div>
      ) : (
        <></>
      )}
      {data && data.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/requests-received/details/${item.id}`}>
                    {item.name}
                  </Link>
                </td>
                <td>{item.phone}</td>
                <td className="text-uppercase">
                  {" "}
                  <Badge variant="filled">{item.status}</Badge>
                </td>
                <td>
                  {item.status === "approved" ? (
                    <Link
                      className={styles.btn_primary}
                      to={`/payment/${item.id}`}
                    >
                      <MdOutlineAttachMoney size={22} /> Pay Now
                    </Link>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Requests Found!
        </span>
      )}
    </div>
  );
};

export default ReqListForApproval;
