import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

class Login extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEnterPress = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    if (this.props.valid) {
      this.props.handleLogin();
    } else {
      this.handleClickOpen();
    }
  };

  render() {
    return (
      <section className="login">
        <div className="loginContainer" style={{ marginTop: "10%" }}>
          {this.props.submit ? <h1>Logging In...</h1> : <h1>Log In</h1>}
          <label>Email</label>
          <input
            type="text"
            autoFocus
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            required
            value={this.props.email}
            onChange={(e) => this.props.setEmail(e.target.value)}
            onKeyDown={this.handleEnterPress}
          />

          <label>Password</label>
          <input
            type="password"
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            required
            value={this.props.password}
            onChange={(e) => this.props.setPassword(e.target.value)}
            onKeyDown={this.handleEnterPress}
          />

          <p></p>
          <Link to="/forgot-password">Forgot your password?</Link>

          <div className="btnContainer">
            <button
              onClick={this.handleSubmit}
              disabled={this.props.submit}
              style={
                this.props.submit
                  ? {
                      backgroundColor: "grey",
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              Log In
            </button>
            <p>
              Not a Member yet?
              <span>
                <Link to="/email-confirmation">Sign Up</Link>
              </span>
            </p>
          </div>
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
        </div>
      </section>
    );
  }
}

export default Login;
