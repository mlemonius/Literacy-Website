import React, { Component } from "react";
import {
  TextField,
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
import "../../Styles/childProfileForm.css";
import { withRouter } from "react-router-dom";

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
  state = {
    age: "",
    color: "",
    animal: "",
    valid: false,
    open: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.valid === false &&
      this.state.age !== "" &&
      this.state.color !== "" &&
      this.state.animal !== ""
    ) {
      this.setState({ valid: true });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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

  handleSubmit = () => {
    if (this.state.valid) {
      const info = {
        age: this.state.age,
        color: this.state.color,
        animal: this.state.animal,
      };
      console.log(info); //send info to backend!
      return this.props.history.push("/congrats");
    } else {
      this.handleClickOpen();
    }
  };

  render() {
    return (
      <div style={{ margin: 20, padding: 10 }}>
        <Typography className="readpal-header">Welcome to ReadPal</Typography>
        <Typography className="greetings-header">
          To begin, tell us about yourself.
        </Typography>
        <form>
          <Grid container style={{ paddingTop: 15 }}>
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
        <button onClick={this.handleSubmit}>Submit</button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Forget anything?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please Answer All The Questions!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Absolutely!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(ChildProfileForm);
