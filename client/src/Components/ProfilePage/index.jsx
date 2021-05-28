import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./profilePage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setProfiles,
  setCurrentProfile,
} from "../../actions/credentialActions";
import axios from "axios";

class ProfilePage extends Component {
  state = {};

  getProfiles = () => {
    axios
      .get(
        `http://ec2-3-130-2-65.us-east-2.compute.amazonaws.com/server/user/${this.props.userID}/profiles`
      )
      .then((response) => {
        if (response.data.message === "success") {
          this.props.setProfiles(response.data.profiles);
        }
      });
  };

  componentDidMount = () => {
    this.getProfiles();
  };

  render() {
    return (
      <div className="profile-home-block">
        <Typography className="profile-home-header">
          Please select who is reading today
        </Typography>
        {this.props.childrenProfile.map((child) => (
          <>
            <Link to="/">
              <img
                src={`data:image/jpeg;base64,${child.icon}`}
                alt="icon"
                style={{ width: 300, height: 300, padding: 0, margin: 0 }}
                onClick={() => this.props.setCurrentProfile(child)}
              />
              <Typography
                className="profile-home-id-text"
                style={{
                  fontWeight: "bold",
                  fontSize: 25,
                  color: child.color,
                }}
              >
                ID: {child._id}
              </Typography>
            </Link>

            <hr style={{ width: "66%", margin: "auto" }} />
          </>
        ))}
        <div>
          <Link to="/child-profile-form">
            <button id="profile-home-create-btn">
              Create Another Child Profile
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    childrenProfile: state.userInfo.yourChildren,
    userID: state.userInfo.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setProfiles,
      setCurrentProfile,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
