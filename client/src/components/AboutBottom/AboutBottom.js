import React from "react";
import { useNavigate } from "react-router-dom";

const AboutBottom = () => {
  const navigate = useNavigate();
  return (
    <div className="py-md-5 py-4 text-center">
      <span className="d-block fs-2 pt-md-5 pt-0 text-center pb-4">
        Have Any Query? Feel Free to Contact Us. <br />
        <span className="text_primary fs-3">
          Your <b>feedback</b> is important to us.
        </span>
      </span>
      <button className="btn_primary" onClick={() => navigate("/contact")}>
        Contact Now
      </button>
    </div>
  );
};

export default AboutBottom;
