import React, { Component } from "react";
import {
  Grid,
  Typography,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import "../Styles/checkupPage.css";
import { withRouter } from "react-router-dom";

class Checkup extends Component {
  state = {
    question1: false,
    question2: false,
    valid: false,
    open: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.valid === false &&
      this.state.question1 &&
      this.state.question2
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

  handleQuestion1 = () => {
    this.setState({ question1: !this.state.question1 });
  };
  handleQuestion2 = () => {
    this.setState({ question2: !this.state.question2 });
  };

  handleSubmit = () => {
    // if (this.state.valid) {
    //   const info = {
    //     age: this.state.age,
    //     color: this.state.color,
    //     animal: this.state.animal,
    //   };
    //   console.log(info); //send info to backend!
    //   return this.props.history.push("/signup-done");
    // } else {
    this.handleClickOpen();
    // }
  };

  render() {
    return (
      <div
        className="sec-checkup-container"
        style={{ margin: 20, padding: 10 }}
      >
        <Typography className="sec-checkup-header">
          Sign up Security Check
        </Typography>
        <form>
          <Grid container style={{ paddingTop: 15 }}>
            <Grid item xs={12} style={{ paddingBottom: 10 }}>
              I have a child between 7 - 9 years of age who is interested in
              ReadPal
              <Checkbox
                required
                checked={this.state.question1}
                color="primary"
                onChange={this.handleQuestion1}
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: 10 }}>
              I am the parent, legal guardian or educational organization of
              that child
              <Checkbox
                required
                checked={this.state.question2}
                color="primary"
                onChange={this.handleQuestion2}
              />
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

export default withRouter(Checkup);
