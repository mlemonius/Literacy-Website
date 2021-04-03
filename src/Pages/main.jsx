import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Chatroom from "./ChatRoom";
import PDFdisplay from "./PDFdisplay";
import ReadPal from "./ReadPal";
import ProfileDonePage from "./ProfileDonePage";
import CheckUpPage from "./CheckupPage";

const Main = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/security-checkup" exact component={CheckUpPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/chatroom" component={Chatroom} />
      <Route path="/ReadPal" component={ReadPal} />
      <Route path="/signup-done" component={ProfileDonePage} />
      <Route path="/pdfview" component={PDFdisplay} />
    </Switch>
  );
};

export default Main;
