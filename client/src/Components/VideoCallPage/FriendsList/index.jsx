import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@material-ui/core";
import "./friendslist.css";
import { setFriendEmail } from "../../../actions/credentialActions";
import { useCookies } from "react-cookie";

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

  return (
    <div className="friendslist-innerdiv">
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

const AddFriend = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const id = useSelector((state) => state.userInfo.userID);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddfriend = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "/server/user/send",
      data: { email: input, username: id },
    });
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

function FriendsList(props) {
  return (
    <div className="friendslist-outerdiv">
      <h1 style={{ fontSize: 60 }}>Friends List</h1>
      <AddFriend />
      <FrdsList toggleRight={props.toggleRight} />
    </div>
  );
}

export default FriendsList;
