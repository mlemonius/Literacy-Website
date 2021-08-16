import React, { Component } from "react";
import Cards from "./Cards";
import "./paywall.css";
import { Helmet } from "react-helmet";

const PayWall = () => {
  return (
    <>
      <Helmet>
        <title>ReadPal | PayWall</title>
      </Helmet>
      <div className="paywall-block">
        <Cards />
      </div>
    </>
  );
};

export default PayWall;
