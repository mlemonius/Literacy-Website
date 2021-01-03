import React, { Component } from "react";
import { AppBar, Typography, Toolbar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <AppBar position="static" style={{ backgroundColor: "#282828" }}>
        <Toolbar>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Typography variant="h6">Literacy Website</Typography>
          </Link>

          <Link to="/library">
            <LibraryBooksIcon
              style={{
                color: "white",
                position: "absolute",
                top: 20,
                right: 170,
              }}
            />
          </Link>

          <Link to="/chatroom">
            <ChatBubbleOutlineIcon
              style={{
                color: "white",
                position: "absolute",
                top: 20,
                right: 100,
              }}
            />
          </Link>

          <Link to="/login">
            <PersonIcon
              style={{
                color: "white",
                position: "absolute",
                top: 20,
                right: 30,
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
