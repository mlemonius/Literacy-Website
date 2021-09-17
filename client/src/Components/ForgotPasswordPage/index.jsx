import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import "./forgotPassword.css";
import axios from "axios";
import qs from "qs";
import { Helmet } from "react-helmet";
class ForgotPassword extends Component {
  state = {
    email: "",
    password: "",
    otp: "",
    open: false,
    next: false,
    validStep1: false,
    validStep2: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.validStep1 && this.validateEmail(this.state.email)) {
      this.setState({ validStep1: true });
    }

    if (
      !prevState.validStep2 &&
      this.state.otp !== "" &&
      this.state.password !== ""
    ) {
      this.setState({ validStep2: true });
    }
  };

  handleSubmit = () => {
    if (this.state.validStep1) {
      axios({
        method: "post",
        url: "/server/user/forgot",
        data: qs.stringify({
          email: this.state.email,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          if (response.data.message === "success") {
            this.setState({ next: true });
          } else {
            // this.setState({ valid: false });
          }
        } else {
        }
      });
    } else {
      this.handleClickOpen();
    }
  };

  handleReset = () => {
    if (this.state.validStep2) {
      axios({
        method: "patch",
        url: "/server/user/reset",
        data: qs.stringify({
          otp: this.state.otp,
          password: this.state.password,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.message === "success") {
            this.props.history.push("/login");
          } else {
            // this.setState({ valid: false });
          }
        } else {
        }
      });
    } else {
      this.handleClickOpen();
    }
  };

  validateEmail = () => {
    if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(this.state.email)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Forgot Password</title>
        </Helmet>
        {this.state.next ? (
          <section className="forgotPassword">
            <div
              className="forgotPasswordContainer"
              style={{ marginTop: "10%" }}
            >
              <h1>Reset Password</h1>
              <label>Enter the 6-digit code we sent you via Email</label>
              <input
                type="text"
                autoFocus
                required
                value={this.state.otp}
                onChange={(e) => this.setState({ otp: e.target.value })}
              />

              <label>Password</label>
              <input
                type="password"
                required
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />

              <div className="btnContainer">
                <button onClick={this.handleReset}>Reset</button>
              </div>
            </div>
          </section>
        ) : (
          <section className="forgotPassword">
            <div
              className="forgotPasswordContainer"
              style={{ marginTop: "10%" }}
            >
              <h1>Reset Password</h1>
              <label>Enter your registered Email Address</label>
              <input
                type="text"
                autoFocus
                required
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />

              <div className="btnContainer">
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </section>
        )}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Forget anything?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please fill in all the required fields.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Absolutely!
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ForgotPassword;
