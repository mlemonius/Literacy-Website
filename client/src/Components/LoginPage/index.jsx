import React, { useState, useEffect } from "react";
// import fire from "../fire";
import Login from "./Login";
// import SignUpForm from "../SignupPage/SignUpForm";
import "../../Styles/login.css";

function LoginPage() {
  const [clicked, setClicked] = useState(false); //debug
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = () => {
    setClicked(true);
    clearErrors();

    //   fire
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .catch((err) => {
    //       switch (err.code) {
    //         case "auth/invalid-email":
    //         case "auth/user-disabled":
    //         case "auth/user-not-found":
    //           setEmailError(err.message);
    //           break;
    //         case "auth/wrong-password":
    //           setPasswordError(err.message);
    //           break;
    //       }
    //     });
  };

  const handleSignup = () => {
    setClicked(true);
    clearErrors();

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
    <div className="LoginPage">
      {/* {user ? ( */}
      {clicked ? (
        // <SignUpForm handleLogout={handleLogout} />
        <></>
      ) : (
        <Login
          clicked={clicked} //debug
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default LoginPage;