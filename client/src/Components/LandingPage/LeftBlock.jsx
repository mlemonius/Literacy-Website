import React from "react";
import { Typography } from "@material-ui/core";
import "./landingPage.css";
import Background from "../../Data/background-img.jpg";

const LeftBlock = () => {
  return (
    <div
      className="left-landing-block"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="tag-line-box">
        <Typography className="tag-line-1">Building Friendships</Typography>
        <Typography className="tag-line-2">while</Typography>
        <Typography className="tag-line-3">Building Confidence</Typography>
      </div>
    </div>
  );
};

export default LeftBlock;
