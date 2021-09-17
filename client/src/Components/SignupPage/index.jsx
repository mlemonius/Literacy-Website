import CheckupPage from "./CheckupPage";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Signup from "./Signup";
import "./signup.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import axios from "axios";
import qs from "qs";
import { signup } from "../../actions/credentialActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";

function SignupPage(props) {
  const history = useHistory();

  const [asked, setAsked] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    authenticate();
    setInterval(() => this.authenticate(), 60000 * 10);
  });

  const authenticate = async () => {
    const response = await axios.post(
      "/server/user/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.message === "success") {
      history.push("/profile");
    }
  };

  const handleSignup = () => {
    if (checked) {
      const cred = {
        otp: otp,
        email: props.email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        organization: organization,
        country: country,
      };

      axios({
        method: "post",
        url: "/server/user/register",
        data: qs.stringify(cred),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          if (response.data.message === "success") {
            props.signup(response.data.userID, props.email);
            history.push("/child-profile-form");
          } else {
            // this.setState({ valid: false });
          }
        } else {
        }
      });
    } else {
      handleClickOpen();
    }
  };

  return (
    <>
      <Helmet>
        <title>Storybook Academy | Sign up</title>
      </Helmet>
      <div className="SignupPage">
        {!asked ? (
          <CheckupPage setAsked={setAsked} />
        ) : (
          <Signup
            firstname={firstname}
            lastname={lastname}
            organization={organization}
            country={country}
            otp={otp}
            password={password}
            setOtp={setOtp}
            setLastname={setLastname}
            setFirstname={setFirstname}
            setOrganization={setOrganization}
            setCountry={setCountry}
            setPassword={setPassword}
            handleSignup={handleSignup}
            checked={checked}
            setChecked={setChecked}
          />
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Forget anything?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please Agree the Terms and Services!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.userInfo.email,
    userID: state.userInfo.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signup,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
