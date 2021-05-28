import React, { Component } from "react";
import Login from "./Login";
// import SignUpForm from "../SignupPage/SignUpForm";
import "./login.css";
import axios from "axios";
import qs from "qs";
import { login } from "../../actions/credentialActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    valid: false,
  };

  setEmail = (value) => {
    if (this.validateEmail(value)) this.setState({ email: value, valid: true });
    else this.setState({ email: value, valid: false });
  };

  setPassword = (value) => {
    if (value !== "" && this.validateEmail(this.state.email))
      this.setState({ password: value, valid: true });
    else this.setState({ password: value, valid: false });
  };

  clearInputs = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  validateEmail = () => {
    // if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(this.state.email)) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email)) {
      return true;
    } else {
      return false;
    }
  };

  validatePassword = (pw) => {
    if (pw.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  handleLogin = () => {
    axios({
      method: "post",
      // url: "https://secure-bastion-85489.herokuapp.com/server/login",
      url: "http://ec2-3-130-2-65.us-east-2.compute.amazonaws.com/server/user/login",
      data: qs.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        if (response.data.message === "success") {
          this.props.login(response.data.userID, this.state.email);
          this.props.history.push("/profile");
          console.log(this.props.userID);
        } else {
          // this.setState({ valid: false });
        }
      } else {
      }
    });
  };

  setValid = (value) => {
    this.setState({ valid: value });
  };

  handleLogout = () => {
    axios.post("", {}).then((response) => {});
    console.log("Log out");
  };

  render() {
    return (
      <div className="LoginPage">
        <Login
          email={this.state.email}
          setEmail={this.setEmail}
          password={this.state.password}
          setPassword={this.setPassword}
          handleLogin={this.handleLogin}
          validateEmail={this.validateEmail}
          valid={this.state.valid}
          setValid={this.setValid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userInfo.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
