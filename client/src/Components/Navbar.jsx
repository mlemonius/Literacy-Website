import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import "./navbar.css";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../actions/credentialActions";
import { withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar(props) {
  const [cookies, removeCookie] = useCookies(["userID"]);
  const handleLogout = () => {
    axios.get("/server/user/logout").then((response) => {
      if (response.data.message === "success") {
        props.logout();
        removeCookie("userID");
        props.history.push("/login");
      }
    });
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#282828" }}>
      <Toolbar>
        <button className="logout-btn" onClick={() => handleLogout()}>
          Log out
        </button>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
