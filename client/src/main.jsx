import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/";
import LoginPage from "./Components/LoginPage/";
import SignupPage from "./Components/SignupPage/";
import ChildProfileForm from "./Components/SignupPage/ChildProfileForm";
import CongratsPage from "./Components/CongratsPage/";
import EmailConfirm from "./Components/SignupPage/EmailConfirm";
import ForgotPassword from "./Components/ForgotPasswordPage";
import ProfilePage from "./Components/ProfilePage";
// import PayWall from "./Components/PayWall";
import VideoCallPage from "./Components/VideoCallPage";

const Main = () => {
  return (
    <Switch>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
      <Route path="/child-profile-form" exact component={ChildProfileForm} />
      <Route path="/congrats" exact component={CongratsPage} />
      <Route path="/email-confirmation" exact component={EmailConfirm} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/profile" exact component={ProfilePage} />
      <Route path="/meetings" exact component={VideoCallPage} />

      {/* <Route path="/paywall" exact component={PayWall} /> */}

      <Route path="/" exact component={LandingPage} />
    </Switch>
  );
};

export default Main;
