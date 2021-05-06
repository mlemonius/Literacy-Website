import SignUpForm from "./ChildProfileForm";
import CheckupPage from "./CheckupPage";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Signup from "./Signup";
import "../../Styles/signup.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

function SignupPage() {
  const history = useHistory();

  const [clicked, setClicked] = useState(false); //debug
  const [asked, setAsked] = useState(false);
  const [user, setUser] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleClickOpen = () => {
    // this.setState({ open: true });
    setOpen(true);
  };

  const handleClose = () => {
    // this.setState({ open: false });
    setOpen(false);
  };

  const handleChecked = (value) => {
    setChecked(value);
  };

  const handleSignup = () => {
    if (checked) {
      setClicked(true);
      clearErrors();
      history.push("/email-confirmation");
    } else {
      handleClickOpen();
    }
  };

  const handleLogout = () => {
    setClicked(false);
    console.log("Log out");
  };

  return (
    <div className="SignupPage">
      {/* {user ? ( */}
      {!asked ? (
        <CheckupPage setAsked={setAsked} />
      ) : (
        <Signup
          clicked={clicked} //debug
          firstname={firstname}
          lastname={lastname}
          organization={organization}
          country={country}
          email={email}
          password={password}
          setLastname={setLastname}
          setFirstname={setFirstname}
          setOrganization={setOrganization}
          setCountry={setCountry}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          firstnameError={firstnameError}
          lastnameError={lastnameError}
          organizationError={organizationError}
          countryError={countryError}
          emailError={emailError}
          passwordError={passwordError}
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
  );
}

export default SignupPage;
