import React, { useEffect } from "react";

import Info from "./Info";
import Footer from "./Footer";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "./landingPage.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useHistory } from "react-router";

const LandingPage = () => {
  const history = useHistory();

  useEffect(() => {
    authenticate();
    setInterval(() => this.authenticate(), 60000 * 10);
  }, []);

  const authenticate = async () => {
    const response = await axios.post(
      "/server/user/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.message !== "success") {
      history.push("/login");
    }
  };

  return (
    <>
      <Helmet>
        <title>Storybook Academy | Welcome</title>
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
};

export default LandingPage;
