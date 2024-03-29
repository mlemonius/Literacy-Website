import React, { Component } from "react";
import {
  Grid,
  Typography,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import "./childProfileForm.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { setNewProfile } from "../../actions/credentialActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

const ages = ["7", "8", "9"];
const colors = ["Blue", "Red", "Green", "Pink", "Purple", "Orange", "Yellow"];
const animals = [
  "Dog",
  "Cat",
  "Horse",
  "Rabbit",
  "Dolphin",
  "Bear",
  "Kangaroo",
  "Lion",
  "Tiger",
  "Bird",
];

class ChildProfileForm extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    age: "",
    color: "",
    animal: "",
    nickname: "",
    valid: false,
    open: false,
    submit: false,
    match: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      !prevState.valid &&
      !prevState.submit &&
      !prevState.match &&
      this.state.age !== "" &&
      this.state.color !== "" &&
      this.state.animal !== "" &&
      this.state.nickname !== ""
    ) {
      this.setState({ valid: true });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, match: false });
  };

  handleNickname = (e) => {
    if (e.key !== "Enter" && e.keyCode !== 13 && e.which !== 13)
      this.setState({ nickname: e.target.value });
  };

  handleAge = (e) => {
    this.setState({ age: e.target.value });
  };
  handleColor = (e) => {
    this.setState({ color: e.target.value });
  };
  handleAnimal = (e) => {
    this.setState({ animal: e.target.value });
  };

  handleSubmit = async () => {
    if (this.state.valid) {
      this.setState({ submit: true });
      const info = {
        name: this.state.nickname,
        age: this.state.age,
        color: this.state.color,
        animal: this.state.animal,
      };

      const id =
        this.props.userID !== ""
          ? this.props.userID
          : this.props.cookies.get("userID");

      const response = await axios({
        method: "post",
        url: `/server/user/${id}/profile`,
        data: qs.stringify(info),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      if (response.status === 200) {
        if ((response.data.message = "success")) {
          this.props.setNewProfile(
            response.data.profileID,
            this.state.nickname,
            this.state.color,
            this.state.animal,
            this.state.age
          );
          this.props.history.push("/congrats");
        } else if ((response.data.message = "match")) {
          this.setState({ submit: false, match: true, nickname: "" }, () =>
            this.handleClickOpen()
          );
        }
      } else {
        this.setState({
          submit: false,
          age: "",
          color: "",
          animal: "",
          nickname: "",
          valid: false,
        });
      }
    } else {
      this.handleClickOpen();
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Create New Child Profile</title>
        </Helmet>
        <div className="Child-form-div" style={{ margin: 0, padding: 30 }}>
          <Typography className="Storybook-Academy-header">
            Welcome to Storybook Academy
          </Typography>
          <Typography className="greetings-header">
            To begin, tell us about yourself.
          </Typography>
          <form>
            <Grid container style={{ paddingTop: 15 }}>
              <Grid item xs={12} style={{ paddingBottom: 10 }}>
                <Typography>Give yourself a unique nickname:</Typography>
                <input
                  type="text"
                  required
                  id="nickname"
                  name="nickname"
                  onChange={this.handleNickname}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 10 }}>
                <Typography>How old are you?</Typography>
                {ages.map((item) => (
                  <React.Fragment>
                    <Radio
                      value={item}
                      checked={this.state.age === item}
                      color="primary"
                      onChange={this.handleAge}
                    />
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 10 }}>
                <Typography>What is your favourite color?</Typography>
                {colors.map((item) => (
                  <React.Fragment>
                    <Radio
                      value={item}
                      checked={this.state.color === item}
                      color="primary"
                      onChange={this.handleColor}
                    />
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 10 }}>
                <Typography>What is your favourite animal?</Typography>
                {animals.map((item) => (
                  <React.Fragment>
                    <Radio
                      value={item}
                      checked={this.state.animal === item}
                      color="primary"
                      onChange={this.handleAnimal}
                    />
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </form>
          <button
            onClick={this.handleSubmit}
            disabled={this.state.submit}
            className="child-form-submit-button"
            style={
              this.state.submit
                ? {
                    backgroundColor: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
          >
            Submit
          </button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              There is something wrong!
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {!this.state.match
                  ? "Please Answer All The Questions!"
                  : "Your nickname is not available. Please use another name!"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                OKAY
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
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
      setNewProfile,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChildProfileForm));
