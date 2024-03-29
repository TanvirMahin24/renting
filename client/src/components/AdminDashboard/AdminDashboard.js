import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillMail } from "react-icons/ai";
import {
  BsClipboardCheck,
  BsClipboardData,
  BsClipboardX,
  BsStack,
} from "react-icons/bs";
import { FaUserAlt, FaListAlt } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { RiLockPasswordLine } from "react-icons/ri";
import { connect } from "react-redux";
import { adminDataAction } from "../../actions/Auth.action";
import LineChart from "../lineChart/lineChart";
import { ListingPiChart } from "../ListingPiChart";
import PiChart from "../PiChart/PiChart";
import Loader from "../shared/Loader/Loader";
import StatCard from "../shared/StatCard/StatCard";
//import styles from "./AdminDashboard.module.css";

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
          <Row>
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
            <Col md={3} className="pb-4">
              <StatCard
                title="Resets"
                count={data.reset}
                icon={<RiLockPasswordLine />}
              />
            </Col>
          </Row>
          <h2 className="border_left mt-5 mb-4">Listing Information</h2>
          <Row className="">
            <Col md={3} className="pb-4">
              <StatCard
                title="Listings"
                count={data.packages}
                icon={<BsStack />}
              />
            </Col>
            <Col md={3} className="pb-4">
              <StatCard
                title="Approved"
                count={data.listing.approved}
                icon={<BsClipboardCheck />}
              />
            </Col>

            <Col md={3} className="pb-4">
              <StatCard
                title="Pending"
                count={data.listing.pending}
                icon={<BsClipboardData />}
              />
            </Col>
            <Col md={3} className="pb-4">
              <StatCard
                title="Rejected"
                count={data.listing.rejected}
                icon={<BsClipboardX />}
              />
            </Col>
            <Col md={6}>
              <LineChart data={data.listing.time} listing={true} />
            </Col>
            <Col md={6}>
              <ListingPiChart
                approved={data.listing.approved}
                pending={data.listing.pending}
                rejected={data.listing.rejected}
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
            <Col md={3} className="py-3">
              <StatCard
                title="Reports"
                count={data.report}
                icon={<GoReport />}
              />
            </Col>
          </Row>
          <Row className="py-4">
            <Col md={7}>
              <LineChart data={data.requestTime} />
            </Col>
            <Col md={5}>
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
