import React, { Component } from "react";

import Info from "./Info";
import Footer from "./Footer";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "../../Styles/landingPage.css";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingDiv">
        <Info />
        <div style={{ margin: 40, marginBottom: 5, textAlign: "center" }}>
          <ArrowDownwardIcon />
        </div>
        <div className="landing-page-login">
          <Link to="/login">
            <button className="landing-page-button">Login/Signup</button>
          </Link>
        </div>
        {/* <br /> */}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default LandingPage;
