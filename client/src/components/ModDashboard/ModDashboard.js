import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getModaratorReqAction } from "../../actions/Request.action";
import ReqListForApproval from "../ReqListForApproval/ReqListForApproval";
//import styles from "./ModDashboard.module.css";

const ModDashboard = ({ data, getModaratorReqAction }) => {
  useEffect(() => {
    getModaratorReqAction("pending");
  }, []);
  return (
    <div>
      <ReqListForApproval data={data} dashboard status={"pending"} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.request.requests_list,
});

export default connect(mapStateToProps, { getModaratorReqAction })(
  ModDashboard
);
