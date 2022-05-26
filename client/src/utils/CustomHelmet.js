import React from "react";
import { Helmet } from "react-helmet";

const CustomHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Angular Esports" />
    </Helmet>
  );
};

export default CustomHelmet;
