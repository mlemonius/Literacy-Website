import React, { Component } from "react";

import Info from "./Info";
import Footer from "./Footer";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "./landingPage.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
class LandingPage extends Component {
  componentDidMount = () => {
    this.authenticate();
    setInterval(() => this.authenticate(), 60000 * 10);
  };

  authenticate = () => {
    axios.get("/server/user/authenticate").then((response) => {
      if (response.data.message === "success") {
      } else {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>ReadPal | Sign Up</title>
        </Helmet>
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
      </>
    );
  }
}

export default LandingPage;
