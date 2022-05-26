import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateOutlet = ({ auth, loading }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      return auth !== "" && loading === false ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      );
    }, 5000);
  }, [auth]);

  return auth !== "" ? <Outlet /> : <Navigate to="/" />;
};

const mapStateToProps = (state) => ({
  auth: state.auth.token,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, null)(PrivateOutlet);
