import React from "react";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    organization,
    setOrganization,
    country,
    setCountry,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
    firstnameError,
    lastnameError,
    organizationError,
    countryError,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="signup">
      <div className="signupContainer" style={{ marginTop: "10%" }}>
        <h1>Sign Up</h1>
        <label>First Name</label>
        <input
          type="text"
          autoFocus
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <p className="errorMsg">{firstnameError}</p>

        <label>Last Name</label>
        <input
          type="text"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <p className="errorMsg">{lastnameError}</p>

        <label>Organization</label>
        <input
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <p className="errorMsg">{organizationError}</p>

        <label>Country</label>
        <input
          type="text"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <p className="errorMsg">{countryError}</p>

        <label>Email Address</label>
        <input
          type="text"
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
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
