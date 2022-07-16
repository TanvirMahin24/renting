import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getModaratorReqAction } from "../../actions/Request.action";
import ReqListForApproval from "../../components/ReqListForApproval/ReqListForApproval";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import Loader from "../../components/shared/Loader/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const RequestForApproval = ({ data, getModaratorReqAction }) => {
  const { status } = useParams();
  useEffect(() => {
    getModaratorReqAction(!status ? "pending" : status);
  }, [status]);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Request For Approval"
        name={"Request For Approval"}
      />
      <DashLayout>
        {data === null ? (
          <>
            <Loader />
          </>
        ) : (
          <ReqListForApproval data={data} status={status} />
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.request.requests_list,
});

export default connect(mapStateToProps, { getModaratorReqAction })(
  RequestForApproval
);
