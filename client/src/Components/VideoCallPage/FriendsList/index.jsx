import React, { Component, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@material-ui/core";
import "./friendslist.css";
import { setFriendEmail } from "../../../actions/credentialActions";
import { useCookies } from "react-cookie";
import qs from "qs";

const FrdsList = (props) => {
  const [fList, setFList] = useState([]);
  const userID = useSelector((state) => state.userInfo.userID);
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const id = userID !== "" ? userID : cookies.userID;
      const response = await axios.get(`/server/user/${id}/students`);
      if (response.data.message === "success") setFList(response.data.students);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const id = userID !== "" ? userID : cookies.userID;
      const response = await axios.get(`/server/user/${id}/students`);
      if (response.data.message === "success") setFList(response.data.students);
    }
    fetchData();
  }, [props.resetKey]);

  return (
    <div key={props.resetKey} className="friendslist-innerdiv">
      {fList.map((friend, index) => (
        <div className="friend-line" key={index} onClick={() => {}}>
          {friend.email + "\n(" + friend._id + ")"}
          <span>
            <Button
              onClick={() => {
                dispatch(setFriendEmail(friend.email));
                props.toggleRight("calling");
              }}
            >
              Call
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

const AddFriend = (props) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const userID = useSelector((state) => state.userInfo.userID);
  const [cookies] = useCookies();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddfriend = async (e) => {
    e.preventDefault();

    const id = userID !== "" ? userID : cookies.userID;
    const response = await axios.post(
      `/server/user/${id}/student`,
      qs.stringify({ email: input, username: id }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    if (response.data.message === "match") {
      alert("Friend already in your friends list!");
    } else if (response.data.message === "invalid") {
      alert("Invalid friend's email, please check again!");
    } else {
      props.setResetKey(!props.resetKey);
    }
    setInput("");
  };

  return (
    <form onSubmit={handleAddfriend} className="addfriend-form">
      <>
        <input
          placeholder="Add a new friend"
          value={input}
          onChange={handleChange}
          name="text"
          className="addfriend-input"
          ref={inputRef}
        />
        <Button onClick={handleAddfriend} className="addfriend-button">
          Add Friend
        </Button>
      </>
    </form>
  );
};

function EnterRoom(props) {
  const [roomID, setRoomID] = useState("");
  const submitRoomID = () => {
    props.joinRoom(roomID);
  };
  return (
    <div className="enter-room-div">
      <label>Enter Room ID</label>
      <input
        type="text"
        placeholder="1b0dce1d-a14c-4345-9ee8-ecc811436769"
        onChange={(e) => setRoomID(e.target.value)}
      />
      <Button onClick={submitRoomID}>Join</Button>
    </div>
  );
}

function FriendsList(props) {
  const [resetKey, setResetKey] = useState(true);
  return (
    <div className="friendslist-outerdiv">
      <h1 style={{ fontSize: 60 }}>Friends List</h1>
      <AddFriend resetKey={resetKey} setResetKey={setResetKey} />
      <FrdsList key={resetKey} toggleRight={props.toggleRight} />
      <EnterRoom joinRoom={props.joinRoom} />
    </div>
  );
}

export default FriendsList;
