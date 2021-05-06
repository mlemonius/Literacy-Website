import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../Styles/congrats.css";

const CongratsPage = () => {
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

      <div>
        <Link to="/">
          <button id="readpal-congrat-enter-btn">Enter ReadPal</button>
        </Link>
      </div>
      <div>
        <Link to="/child-profile-form">
          <button id="readpal-congrat-create-btn">
            Create Another Child Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CongratsPage;
