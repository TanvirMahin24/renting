import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getFavListings } from "../../actions/Listing.action";
import { getRecentReqAction } from "../../actions/Request.action";
import ReqList from "../ReqList/ReqList";
import ListingCard from "../shared/ListingCard/ListingCard";
//import styles from "./UserDashboard.module.css";

const UserDashboard = ({
  getRecentReqAction,
  getFavListings,
  req,
  fav,
  data,
}) => {
  useEffect(() => {
    getRecentReqAction();
    if (fav && fav.length > 0) {
      getFavListings(fav);
    }
  }, []);
  return (
    <div>
      {req !== null && req.rows.length > 0 ? (
        <>
          <ReqList data={req.rows} />
        </>
      ) : (
        <>
          <h4>Please Request For A Pack & Get Started.</h4>
        </>
      )}

      {data !== null && data.length > 0 ? (
        <>
          <h2 className="border_left mt-5 mb-4">Favorite Packages</h2>
          <Row>
            {data.map((item) => (
              <Col md={6} key={item.id}>
                <ListingCard data={item} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  req: state.request.recent,
  fav: state.fav.favorite,
  data: state.fav.data,
});

export default connect(mapStateToProps, { getRecentReqAction, getFavListings })(
  UserDashboard
);
