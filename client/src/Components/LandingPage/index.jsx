import React, { useEffect } from "react";

import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";
// import Footer from "./Footer";
import { Grid, Button, Typography, Container } from "@material-ui/core";
import "./landingPage.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useHistory } from "react-router";

const LandingPage = () => {
  const history = useHistory();

  const authenticate = async () => {
    // const response = await axios.post(
    //   "/server/user/authenticate",
    //   {},
    //   {
    //     withCredentials: true,
    //   }
    // );
    // if (response.data.message === "success") {
    //   history.push("/profile");
    // } else {
    //   history.push("/login");
    // }
  };

  useEffect(() => {
    authenticate();
    setInterval(() => authenticate(), 60000 * 10);
  }, []);

  return (
    <>
      <Helmet>
        <title>Storybook Academy | Welcome</title>
      </Helmet>
      <div className="LandingDiv">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <LeftBlock />
          </Grid>
          <Grid item xs={12} sm={8}>
            <RightBlock />
          </Grid>
        </Grid>

        {/* <br /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default LandingPage;
