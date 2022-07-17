import { Badge } from "@mantine/core";
import React from "react";
import { Table } from "react-bootstrap";
import { BiCommentError } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./ReqList.module.css";

const ReqList = ({ data }) => {
  return (
    <div>
      <h2 className="border_left mt-3 mb-4">My Requests</h2>
      {data && data.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/my-requests/${item.id}`} className={styles.name}>
                    {item.name}
                  </Link>
                </td>
                <td>{item.phone}</td>
                <td className="text-uppercase">
                  {" "}
                  <Badge variant="filled">{item.status}</Badge>
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

export default ReqList;
