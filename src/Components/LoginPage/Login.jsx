import React from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer" style={{ marginTop: "10%" }}>
        <h1>Log In</h1>
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>

        <div className="btnContainer">
          <button onClick={handleLogin}>Log In</button>
          <p>
            Not a Member yet?
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
