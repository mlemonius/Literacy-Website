import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./congrats.css";
import { connect } from "react-redux";
import ProfileIcon from "../../Data/congrat.jpeg";
import { Helmet } from "react-helmet";

const CongratsPage = (props) => {
  return (
    <>
      <Helmet>
        <title>Storybook Academy | Congratulation</title>
      </Helmet>
      <div className="profile-done-block">
        <Typography className="profile-congrat-header">
          Congratulations,
        </Typography>
        <Typography className="profile-congrat-text">
          {props.newProfile.color} {props.newProfile.animal}!
        </Typography>
        <img
          src={ProfileIcon}
          alt="icon"
          style={{ width: 300, height: 300, padding: 0, margin: 0 }}
        />
        <Typography className="profile-greetings-text">
          Your unique profile ID number is:
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: props.newProfile.color,
            }}
          >
            {props.newProfile.id}
          </Typography>
          PLEASE WRITE THIS DOWN
        </Typography>
        <div>
          <Link to="/">
            <button id="profile-congrat-enter-btn">Enter Home</button>
          </Link>
        </div>
        <div>
          <Link to="/child-profile-form">
            <button id="profile-congrat-create-btn">
              Create Another Child Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    newProfile: state.userInfo.yourChildren[0],
  };
};

export default connect(mapStateToProps)(CongratsPage);
