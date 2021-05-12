const initial = {
  userID: "",
  email: "",
  yourChildren: [],
  friends: [],
};

const userInfo = (state = initial, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userID: action.payload.userID,
        email: action.payload.email,
      };
    case "SIGNUP":
      return {
        ...state,
        userID: action.payload.userID,
        email: action.payload.email,
      };
    case "SETEMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SETNEWPROFILE":
      return {
        ...state,
        yourChildren: [...state.yourChildren, action.payload],
      };
    case "LOGOUT":
      return initial;

    default:
      return state;
  }
};

export default userInfo;
