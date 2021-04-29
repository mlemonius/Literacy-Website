import SignUpForm from "./ChildProfileForm";
import CheckupPage from "./CheckupPage";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import fire from "../fire";
import Signup from "./Signup";
import "../../Styles/signup.css";

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

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignup = () => {
    setClicked(true);
    clearErrors();
    history.push("/email-confirmation");

    //   fire
    //     .auth()
    //     .createUserWithEmailAndPassword(email, password)
    //     .catch((err) => {
    //       switch (err.code) {
    //         case "auth/email-already-in-use":
    //         case "auth/invalid-email":
    //           setEmailError(err.message);
    //           break;
    //         case "auth/weak-password":
    //           setPasswordError(err.message);
    //           break;
    //       }
    //     });
  };

  const handleLogout = () => {
    setClicked(false);
    // fire.auth().signOut();
    console.log("Log out");
  };

  const authListener = () => {
    //   fire.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       clearInputs();
    //       setUser(user);
    //     } else {
    //       setUser("");
    //     }
    //   });
  };

  useEffect(() => {
    authListener();
  });

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
        />
      )}
    </div>
  );
}

export default SignupPage;
