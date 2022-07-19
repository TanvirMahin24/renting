import React from "react";
import Loader from "../shared/Loader/Loader";
import styles from "./ReportAction.module.css";
import Moment from "react-moment";
import { BiNotepad } from "react-icons/bi";
import { deleteReportAction } from "../../actions/Report.action";
import { connect } from "react-redux";

const ReportAction = ({ data, deleteReportAction, modals }) => {
  const deleteHandeler = () => {
    deleteReportAction(data.id);
    modals.closeAll();
  };
  return (
    <div className={styles.wrapper}>
      {data === null ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <h4 className={`border_left ${styles.header}`}>Report Action</h4>
          <span className="d-block">
            <span className="fw-bold me-2">Report Date :</span>
            <span className="">
              <Moment format="DD-MM-YYYY | MM:HH A">{data.createdAt}</Moment>
            </span>
          </span>
          <span className="d-block pt-2">
            <span className="fw-bold me-2">Message :</span>
            <span className="">{data.message}</span>
          </span>
          <span className="d-block pt-2">
            <span className="fw-bold me-2">Username :</span>
            <span className="">
              {data.user.first_name} {data.user.last_name}
            </span>
          </span>

          <span className="d-block pt-2">
            <span className="fw-bold me-2">Listing Title :</span>
            <span className="">{data.listing.title}</span>
          </span>

          <hr />
          <span className="d-block pt-2">
            <BiNotepad /> Clicking on <span className="fw-bold">Ignore</span>{" "}
            will <span className="text-danger fw-bold">Delete</span> this Report
          </span>
          <span className="d-block py-2">
            <BiNotepad /> Clicking on{" "}
            <span className="fw-bold">Remove Listing</span> will{" "}
            <span className="text-danger fw-bold">Delete</span> the listing as
            well as the requests for the listing.
          </span>
          <button
            className="btn_primary w-100 mt-3 mb-2"
            onClick={() => deleteHandeler()}
          >
            Ignore Report
          </button>
          <button className="btn_primary danger w-100">Remove Listing</button>
        </>
      )}
    </div>
  );
};

export default connect(null, { deleteReportAction })(ReportAction);
