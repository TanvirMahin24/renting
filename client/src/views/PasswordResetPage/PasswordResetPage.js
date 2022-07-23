import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import BreadCrumb from "../../components/shared/BreadCrumb/BreadCrumb";
import CustomNavbar from "../../components/shared/Navbar/CustomNavbar";

const PasswordResetPage = () => {
  const { token } = useParams();
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <CustomNavbar />
      <BreadCrumb
        type={"home"}
        first="home"
        last="Reset Password"
        name={"Password Reset"}
      />
      {token ? <ResetPasswordForm token={token} /> : <div>No Token</div>}
    </div>
  );
};

export default PasswordResetPage;
