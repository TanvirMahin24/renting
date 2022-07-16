import { Badge, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStatusAction } from "../../actions/Request.action";
import ListingCard from "../shared/ListingCard/ListingCard";
import { saveAs } from "file-saver";
//import styles from "./RequestInfo.module.css";

const RequestInfo = ({ data, changeStatusAction, my }) => {
  const navigate = useNavigate();
  const modals = useModals();
  const handleClick = (status) => {
    modals.openConfirmModal({
      title: "Change Status",
      centered: true,
      children: (
        <Text size="md">
          <b>Note:</b> You are about to change the status of the Request to{" "}
          <b className="text-primary">{status}</b> . This can not be undone!
        </Text>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => {},
      onConfirm: () => changeStatusAction(data.id, status),
    });
  };

  const saveFile = (file) => {
    console.log(file);
    saveAs(`http://${file}`);
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="pb-3 d-flex align-items-center justify-content-between pe-4">
            <Button classname="" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            {my === true ? (
              <></>
            ) : (
              <>
                <Button
                  variant="success"
                  onClick={() => handleClick("approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleClick("rejected")}
                >
                  Reject
                </Button>
              </>
            )}
          </div>
          <h3 className="border_left mb-4 mt-4">Booking Request Details</h3>
          <span className="d-block fw-bold h6">
            Status:
            <span className="fw-normal ms-3 text-uppercase">
              <Badge
                variant="filled"
                color={
                  data.status === "pending"
                    ? "yellow"
                    : data.status === "approved"
                    ? "green"
                    : data.status === "rejected"
                    ? "red"
                    : "blue"
                }
                size="md"
              >
                {data.status}
              </Badge>
            </span>
          </span>
          <span className="d-block fw-bold h6">
            Name:
            <span className="fw-normal ms-3">{data.name}</span>
          </span>
          <span className="d-block fw-bold h6">
            Phone:
            <span className="fw-normal ms-3">{data.phone}</span>
          </span>
          <span className="d-block fw-bold h6">
            Occupation:
            <span className="fw-normal ms-3">{data.occupation}</span>
          </span>
          {data.job_title ? (
            <span className="d-block fw-bold h6">
              Job Title:
              <span className="fw-normal ms-3">{data.job_title}</span>
            </span>
          ) : (
            <></>
          )}
          {data.document ? (
            <div className="pt-4">
              <button
                className="btn_primary"
                style={{ textDecoration: "none" }}
                onClick={() => saveFile(data.document)}
              >
                Download Document
              </button>
            </div>
          ) : (
            <></>
          )}

          <h3 className="border_left mb-4 mt-5">User Details</h3>
          <span className="d-block fw-bold h6">
            First Name:
            <span className="fw-normal ms-3">{data.user.first_name}</span>
          </span>
          <span className="d-block fw-bold h6">
            Last Name:
            <span className="fw-normal ms-3">{data.user.last_name}</span>
          </span>
          <span className="d-block fw-bold h6">
            Phone:
            <span className="fw-normal ms-3">{data.user.phone}</span>
          </span>
          <span className="d-block fw-bold h6">
            Email:
            <span className="fw-normal ms-3">{data.user.email}</span>
          </span>
        </Col>
        <Col md={6}>
          <ListingCard data={data.listing} />
        </Col>
      </Row>
    </div>
  );
};

export default connect(null, { changeStatusAction })(RequestInfo);
