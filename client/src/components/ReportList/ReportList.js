import { Badge } from "@mantine/core";
import React from "react";
import { Table } from "react-bootstrap";
import { BiCommentError } from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "./ReportList.module.css";

const ReportList = ({ data }) => {
  return (
    <div>
      <h2 className="border_left mt-3 mb-4">Reports</h2>
      {data && data.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Message</th>
              <th>Listing Name</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/my-requests/${item.id}`} className={styles.name}>
                    {item.message}
                  </Link>
                </td>
                <td>{item.listing.title}</td>
                <td>{`${item.user.first_name} ${item.user.last_name}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <span className="h4 d-block py-5 fw-normal text-center">
          <BiCommentError size={48} color="var(--primary)" className="mb-3" />{" "}
          <br />
          No Report Found!
        </span>
      )}
    </div>
  );
};

export default ReportList;
