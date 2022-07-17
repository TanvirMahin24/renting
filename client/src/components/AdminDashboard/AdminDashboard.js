import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillMail } from "react-icons/ai";
import {
  BsClipboardCheck,
  BsClipboardData,
  BsClipboardX,
  BsStack,
} from "react-icons/bs";
import {
  FaUserCog,
  FaUserAlt,
  FaListAlt,
  FaClipboardCheck,
  FaRegCalendarTimes,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { connect } from "react-redux";
import { adminDataAction } from "../../actions/Auth.action";
import PiChart from "../PiChart/PiChart";
import Loader from "../shared/Loader/Loader";
import StatCard from "../shared/StatCard/StatCard";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = ({ adminDataAction, data }) => {
  useEffect(() => {
    if (data === null) {
      adminDataAction();
    }
  }, []);

  return (
    <div>
      {data === null ? (
        <Loader />
      ) : (
        <>
          <Row className="">
            <Col md={3} className="pb-4">
              <StatCard
                title="Listings"
                count={data.packages}
                icon={<BsStack />}
              />
            </Col>
            <Col md={3} className="pb-4">
              <StatCard title="Users" count={data.users} icon={<FaUserAlt />} />
            </Col>

            <Col md={3} className="pb-4">
              <StatCard
                title="Subscribers"
                count={data.subscribers}
                icon={<FaListAlt />}
              />
            </Col>
            <Col md={3} className="pb-4">
              <StatCard
                title="Contacts"
                count={data.contact}
                icon={<AiFillMail />}
              />
            </Col>
          </Row>
          <h2 className="border_left mt-5 mb-4">Request Information</h2>
          <Row>
            <Col md={3} className="py-3">
              <StatCard
                title="Pending"
                count={data.pending}
                icon={<BsClipboardData />}
              />
            </Col>
            <Col md={3} className="py-3">
              <StatCard
                title="Approved"
                count={data.approved}
                icon={<BsClipboardCheck />}
              />
            </Col>
            <Col md={3} className="py-3">
              <StatCard
                title="Rejected"
                count={data.rejected}
                icon={<BsClipboardX />}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <PiChart
                pending={data.pending}
                approved={data.approved}
                rejected={data.rejected}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.users.dashboard,
});

export default connect(mapStateToProps, { adminDataAction })(AdminDashboard);