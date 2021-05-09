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
    type: "LOGIN",
  };
};
