import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../Styles/readpal.css";

const ProfileDonePage = () => {
  return (
    <div className="profile-done-block">
      <Typography className="readpal-congrat-header">
        Congratulations,
      </Typography>
      <Typography className="readpal-congrat-text">
        you are a readpal.
      </Typography>
      <Typography className="readpal-greetings-text">
        Meet your readpal!
      </Typography>

      <Link to="/">
        <button>Continue</button>
      </Link>
    </div>
  );
};

export default ProfileDonePage;
