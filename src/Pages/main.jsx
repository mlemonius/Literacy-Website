import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Chatroom from "./ChatRoom";
import Library from "./Library";
import PDFdisplay from "./PDFdisplay";

const Main = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/chatroom" component={Chatroom} />
      <Route path="/library" component={Library} />
      <Route path="/pdfview" component={PDFdisplay} />
    </Switch>
  );
};

export default Main;
