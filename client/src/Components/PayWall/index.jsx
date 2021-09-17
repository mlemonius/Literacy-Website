import React from "react";
import Cards from "./Cards";
import "./paywall.css";
import { Helmet } from "react-helmet";

const PayWall = () => {
  return (
    <>
      <Helmet>
        <title>Storybook Academy | PayWall</title>
      </Helmet>
      <div className="paywall-block">
        <Cards />
      </div>
    </>
  );
};

export default PayWall;
