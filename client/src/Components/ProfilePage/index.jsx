import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./profilePage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setProfiles,
  setCurrentProfile,
  logout,
} from "../../actions/credentialActions";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import { Helmet } from "react-helmet";

class ProfilePage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    userID: this.props.cookies.get("userID") || "",
    validSession: true,
  };

  getProfiles = () => {
    axios.get(`/server/user/${this.state.userID}/profiles`).then((response) => {
      if (response.data.message === "success") {
        this.props.setProfiles(response.data.profiles);
      }
    });
  };

  handleLogout = () => {
    axios
      .get("/server/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message === "success") {
          this.props.logout();
          this.props.cookies.remove("userID");
          this.props.cookies.remove("profileID");
          this.props.cookies.set("connect.sid", "", {
            path: "/",
            maxAge: 0,
            sameSite: "none",
            secure: true,
          });
          this.props.cookies.remove("connect.sid");
          this.props.history.push("/login");
        }
      });
  };

  handleChooseProfile = (id) => {
    this.props.setCurrentProfile(id);
    this.props.cookies.set("profileID", id, {
      path: "/",
      maxAge: 86400,
      sameSite: "none",
      secure: true,
    });
  };

  componentDidMount = () => {
    this.authenticate();
    this.getProfiles();
    setInterval(() => this.authenticate(), 60000 * 10);
  };

  authenticate = async () => {
    const response = await axios.post(
      "/server/user/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.message !== "success") {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Profile</title>
        </Helmet>
        <div className="profile-home-block">
          <Typography className="profile-home-header">
            Please select who is reading today
          </Typography>
          <hr style={{ width: "66%", margin: "auto", padding: 30 }} />
          {this.props.childrenProfile.map((child, index) => (
            <div
              id={index}
              style={{
                border: "1px solid grey",
                borderRadius: 20,
                width: 500,
                margin: "auto",
                marginBottom: 40,
              }}
            >
              <Link
                to="/meetings"
                onClick={() => this.handleChooseProfile(child._id)}
              >
                <Typography
                  className="profile-home-id-text"
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    color: child.color,
                    marginTop: 20,
                  }}
                >
                  ID: {child._id}
                </Typography>
                <img
                  src={`data:image/jpeg;base64,${child.icon}`}
                  alt="icon"
                  style={{ width: 300, height: 300, padding: 0, margin: 0 }}
                  onClick={() => this.props.setCurrentProfile(child)}
                />
              </Link>
            </div>
          ))}
          <div>
            <Link to="/child-profile-form">
              <button id="profile-home-create-btn">
                Create Another Child Profile
              </button>
            </Link>
          </div>
          <div>
            <button id="profile-home-logout-btn" onClick={this.handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </>
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
      logout,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(ProfilePage));
