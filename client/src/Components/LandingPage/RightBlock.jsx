import React from "react";
import { Typography, Button } from "@material-ui/core";
import "./landingPage.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const LeftBlock = () => {
  return (
    <div className="right-landing-block">
      <div className="landing-page-title">
        <Typography variant="h2" className="landing-page-title-text">
          STORYBOOK
          <Typography
            variant="h2"
            className="landing-page-title-text-2"
            style={{ display: "inline" }}
          >
            &nbsp;ACADEMY
          </Typography>
        </Typography>
      </div>
      <div className="landing-page-sentence">
        <Typography variant="body1" className="landing-page-sentence-text">
          Storybook Academy is a peer-to-peer literacy platform where children
          from everywhere connect virtually to learn, to read, to grow, to
          share, to laugh, and to experience a world outside of their own.
        </Typography>
      </div>
      <div className="landing-page-buttons">
        <Button
          className="landing-page-button"
          component={Link}
          to="/login"
          variant="outlined"
          style={{ backgroundColor: "#e6a57d", color: "#0f3d7d" }}
        >
          Log In | Sign Up
        </Button>
        <Button
          component={Link}
          to="/learn-more"
          className="landing-page-button"
          variant="outlined"
        >
          Learn More
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default LeftBlock;
