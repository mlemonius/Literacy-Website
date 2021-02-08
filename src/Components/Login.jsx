import React from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer" style={{ marginTop: "10%" }}>
        {hasAccount ? <h1>Log In</h1> : <h1>Sign Up</h1>}
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
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Log In</button>
              <p>
                Not a Member yet?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Sign Up</button>
              <p>
                Have an Account?
                <span onClick={() => setHasAccount(!hasAccount)}>Log In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
