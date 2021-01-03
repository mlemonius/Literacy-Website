import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Chatroom from "./ChatRoom";
import Library from "./Library";

const Main = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/chatroom" component={Chatroom} />
      <Route path="/library" component={Library} />
    </Switch>
  );
};

export default Main;
