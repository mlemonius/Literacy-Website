import React from "react";
import { AppBar, Typography, Toolbar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Link } from "react-router-dom";
import "../Styles/navbar.css";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#282828" }}>
      <Toolbar>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <Typography variant="h6">Literacy Website</Typography>
        </Link>

        <Link to="/readpal">
          <LibraryBooksIcon className="library-icon" />
        </Link>

        <Link to="/chatroom">
          <ChatBubbleOutlineIcon className="chatroom-icon" />
        </Link>

        <Link to="/login">
          <PersonIcon className="profile-icon" />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
