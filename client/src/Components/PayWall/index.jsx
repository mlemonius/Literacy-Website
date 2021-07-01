import React, { Component } from "react";
import Cards from "./Cards";
import "./paywall.css";

const PayWall = () => {
  return (
    <div className="paywall-block">
      <Cards />
    </div>
  );
};

export default PayWall;
