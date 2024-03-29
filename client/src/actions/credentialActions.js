export const login = (id, email) => {
  return {
    type: "LOGIN",
    payload: {
      userID: id,
      email: email,
    },
  };
};

export const signup = (id, email) => {
  return {
    type: "SIGNUP",
    payload: {
      userID: id,
      email: email,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const changeEmail = (email) => {
  return {
    type: "SETEMAIL",
    payload: email,
  };
};

export const setNewProfile = (profileID, color, animal, age) => {
  return {
    type: "SETNEWPROFILE",
    payload: {
      id: profileID,
      color: color,
      animal: animal,
      age: age,
    },
  };
};

export const setProfiles = (profiles) => {
  return {
    type: "SETPROFILES",
    payload: profiles,
  };
};

export const setCurrentProfile = (profile) => {
  return {
    type: "SETCURRENTPROFILE",
    payload: profile,
  };
};

export const setActiveStory = (id, title) => {
  return {
    type: "SETACTIVESTORY",
    payload: {
      id: id,
      title: title,
    },
  };
};

export const setFriendName = (name) => {
  return {
    type: "SETFRIENDNAME",
    payload: {
      name: name,
    },
  };
};
