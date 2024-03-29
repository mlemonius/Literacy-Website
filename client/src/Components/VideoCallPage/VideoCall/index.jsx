import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import qs from "qs";
import "../VideoCallPage.css";
import { useCookies } from "react-cookie";

const VideoCall = (props) => {
  const [hostURL, setHostURL] = useState("");
  const username = useSelector((state) => state.userInfo.userID);
  const friendName = useSelector((state) => state.userInfo.friendName);
  const [cookies] = useCookies();

  useEffect(() => {
    if (props.roomID === "") {
      async function fetchData() {
        const response = await axios({
          method: "post",
          url: "/server/user/send",
          data: qs.stringify({
            username: username === "" ? cookies.userID : username,
            callee: friendName,
          }),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        if (response.data.message === "success") {
          setHostURL(response.data.hostRoomUrl);
        } else {
          props.toggleRight("friends-list");
        }
      }
      fetchData();
    } else {
      setHostURL(`https://storybookacademy101.whereby.com/${props.roomID}`);
    }
  }, [username, friendName]);

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
