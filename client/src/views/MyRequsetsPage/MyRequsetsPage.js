import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMyReqAction } from "../../actions/Request.action";
import ReqList from "../../components/ReqList/ReqList";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import Loader from "../../components/shared/Loader/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const MyRequsetsPage = ({ data, getMyReqAction }) => {
  useEffect(() => {
    getMyReqAction();
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Requests"
        name={"My Requests"}
      />
      <DashLayout>
        {data === null ? (
          <>
            <Loader />
          </>
        ) : (
          <ReqList data={data} />
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.request.my_requests_list,
});

export default connect(mapStateToProps, { getMyReqAction })(MyRequsetsPage);
