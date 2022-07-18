import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getReportsAction } from "../../actions/Report.action";
import { ReportList } from "../../components/ReportList";
import ReqList from "../../components/ReqList/ReqList";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import { DashLayout } from "../../components/shared/DashLayout";
import Loader from "../../components/shared/Loader/Loader";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const ReportListPage = ({ data, getReportsAction }) => {
  useEffect(() => {
    getReportsAction();
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BreadCrumb type={"home"} first="home" last="Reports" name={"Reports"} />
      <DashLayout>
        {data === null ? (
          <>
            <Loader />
          </>
        ) : (
          <ReportList data={data} />
        )}
      </DashLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.report.report,
});

export default connect(mapStateToProps, { getReportsAction })(ReportListPage);
