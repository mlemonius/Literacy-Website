import React, { Component } from "react";
import { Helmet } from "react-helmet";
import LibraryPage from "./LibraryPage";
import FriendsList from "./FriendsList";
import ReadingPage from "./ReadingPage";
import VideoCall from "./VideoCall";
import "./VideoCallPage.css";
import axios from "axios";

class VideoCallPage extends Component {
  state = {
    toggleLeft: "library",
    toggleRight: "friends-list",
    roomID: "",
  };

  joinRoom = (id) => {
    this.setState({ roomID: id });
  };

  setLeft = (value) => {
    this.setState({ toggleLeft: value });
  };

  setRight = (value) => {
    this.setState({ toggleRight: value });
  };

  componentDidMount = () => {
    this.authenticate();
    setInterval(() => this.authenticate(), 60000 * 10);
  };

  authenticate = async () => {
    const response = await axios.post(
      "/server/user/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.message !== "success") {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Meeting</title>
        </Helmet>
        <div className="videocall-page-outerdiv">
          <div className="videocall-page-leftdiv">
            {this.state.toggleLeft === "library" ? (
              <LibraryPage toggleLeft={(value) => this.setLeft(value)} />
            ) : (
              <ReadingPage toggleLeft={(value) => this.setLeft(value)} />
            )}
          </div>
          <div className="videocall-page-rightdiv">
            {this.state.toggleRight === "friends-list" ? (
              <FriendsList
                toggleRight={(value) => this.setRight(value)}
                joinRoom={this.joinRoom}
              />
            ) : (
              <VideoCall
                toggleRight={(value) => this.setRight(value)}
                roomID={this.state.roomID}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default VideoCallPage;
