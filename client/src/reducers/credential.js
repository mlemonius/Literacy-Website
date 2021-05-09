const initial = {
  userID: "",
  email: "",
};

const credential = (state = initial, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userID: action.payload.userID,
        email: action.payload.email,
      };
    case "SIGNUP":
      return {
        userID: action.payload.userID,
        email: action.payload.email,
      };
    case "LOGOUT":
      return initial;

    default:
      return state;
  }
};

export default credential;
