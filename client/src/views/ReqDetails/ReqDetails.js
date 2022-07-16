import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRequestDetailsAction } from "../../actions/Request.action";
import RequestInfo from "../../components/RequestInfo/RequestInfo";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import { Loader } from "../../components/shared/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ReqDetails = ({ getRequestDetailsAction, data, my }) => {
  const { id } = useParams();
  useEffect(() => {
    getRequestDetailsAction(id);
  }, [id]);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Request Details"
        name={"Request Details"}
      />
      <DashLayout>
        {data === null ? (
          <>
            <Loader />
          </>
        ) : (
          <RequestInfo data={data} my={my} />
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.request.request,
});

export default connect(mapStateToProps, { getRequestDetailsAction })(
  ReqDetails
);
