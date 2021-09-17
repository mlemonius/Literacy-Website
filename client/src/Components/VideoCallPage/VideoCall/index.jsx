import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import qs from "qs";
import "../VideoCallPage.css";
import { useCookies } from "react-cookie";

const VideoCall = (props) => {
  const [hostURL, setHostURL] = useState("");
  const username = useSelector((state) => state.userInfo.userID);
  const friendEmail = useSelector((state) => state.userInfo.friendEmail);
  const [cookies] = useCookies();

  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "post",
        url: "/server/user/send",
        data: qs.stringify({
          username: username === "" ? cookies.userID : username,
          email: friendEmail,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      if (response.data.message === "success") {
        setHostURL(response.data.hostRoomUrl);
      }
    }
    fetchData();
  }, [username, friendEmail]);

  return (
    <div className="videocall-iframe-div">
      <iframe
        title="videocall-iframe"
        className="videocall-iframe-element"
        src={hostURL}
        allow="camera; microphone; fullscreen; speaker; display-capture"
      ></iframe>
      <button
        style={{ width: 75, margin: 5 }}
        onClick={() => props.toggleRight("friends-list")}
      >
        Back
      </button>
    </div>
  );
};

export default VideoCall;
