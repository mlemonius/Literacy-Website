import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/";
import LoginPage from "./Components/LoginPage/";
import SignupPage from "./Components/SignupPage/";
import ChildProfileForm from "./Components/SignupPage/ChildProfileForm";
import CongratsPage from "./Components/CongratsPage/";
import EmailConfirm from "./Components/SignupPage/EmailConfirm";

const Main = () => {
  return (
    <Switch>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
      <Route path="/child-profile-form" exact component={ChildProfileForm} />
      <Route path="/congrats" exact component={CongratsPage} />
      <Route path="/email-confirmation" exact component={EmailConfirm} />

      <Route path="/" exact component={LandingPage} />
      {/* <Route path="/chatroom" component={Chatroom} /> */}
      {/* <Route path="/pdfview" component={PDFdisplay} /> */}
    </Switch>
  );
};

export default Main;
