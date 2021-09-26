import React, { Component } from "react";
import Login from "./Login";
import { instanceOf } from "prop-types";
import "./login.css";
import axios from "axios";
import qs from "qs";
import { login } from "../../actions/credentialActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withCookies, Cookies } from "react-cookie";
import { Helmet } from "react-helmet";

class LoginPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    userID: this.props.cookies.get("userID") || "",
    email: "",
    password: "",
    valid: false,
    submit: false,
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
    if (
      /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+.)+[A-Za-z0-9]+$/.test(this.state.email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  validatePassword = (pw) => {
    if (pw.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  componentDidMount = async () => {
    const response = await axios.post(
      "/server/user/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.message === "success") {
      this.props.history.push("/profile");
    }
  };

  handleLogin = async () => {
    this.setState({ submit: true });
    const response = await axios.post(
      "/server/user/login",
      qs.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
      {
        withCredentials: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    if (response.status === 200) {
      if (response.data.message === "success") {
        this.props.login(response.data.userID, this.state.email);
        this.props.cookies.set("userID", response.data.userID, {
          path: "/",
          maxAge: 86400,
          sameSite: "none",
          secure: true,
        });
        this.props.history.push("/profile");
      } else {
        // this.setState({ valid: false });
        this.setState({ submit: false });
      }
    } else {
      this.setState({ submit: false });
    }
  };

  setValid = (value) => {
    this.setState({ valid: value });
  };

  render() {
    return (
      // this.props.cookies.get("userID") === "undefined" ||
      //   this.props.cookies.get("userID") === undefined ||
      //   this.props.cookies.get("userID") === "" ? (
      <>
        <Helmet>
          <title>Storybook Academy | Login</title>
        </Helmet>
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
            submit={this.state.submit}
          />
        </div>
      </>
    );
    // : (
    //   <Redirect to="/profile" />
    // );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(LoginPage));
