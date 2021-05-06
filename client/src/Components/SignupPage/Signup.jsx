import { React, Component } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@material-ui/core";
import { render } from "@testing-library/react";

class Signup extends Component {
  state = {};

  render() {
    return (
      <section className="signup">
        <div className="signupContainer" style={{ marginTop: "10%" }}>
          <h1>Sign Up</h1>
          <label>First Name</label>
          <input
            type="text"
            autoFocus
            required
            value={this.props.firstname}
            onChange={(e) => this.props.setFirstname(e.target.value)}
          />
          <p className="errorMsg">{this.props.firstnameError}</p>

          <label>Last Name</label>
          <input
            type="text"
            required
            value={this.props.lastname}
            onChange={(e) => this.props.setLastname(e.target.value)}
          />
          <p className="errorMsg">{this.props.lastnameError}</p>

          <label>Organization</label>
          <input
            type="text"
            value={this.props.organization}
            onChange={(e) => this.props.setOrganization(e.target.value)}
          />
          <p className="errorMsg">{this.props.organizationError}</p>

          <label>Country</label>
          <input
            type="text"
            required
            value={this.props.country}
            onChange={(e) => this.props.setCountry(e.target.value)}
          />
          <p className="errorMsg">{this.props.countryError}</p>

          <label>Email Address</label>
          <input
            type="text"
            required
            value={this.props.email}
            onChange={(e) => this.props.setEmail(e.target.value)}
          />
          <p className="errorMsg">{this.props.emailError}</p>

          <label>Password</label>
          <input
            type="password"
            required
            value={this.props.password}
            onChange={(e) => this.props.setPassword(e.target.value)}
          />
          <p className="errorMsg">{this.props.passwordError}</p>

          <div>
            <p style={{ fontSize: 22, display: "inline-block" }}>
              I agree to the terms of services
            </p>

            <Checkbox
              required
              checked={this.props.checked}
              color="primary"
              onChange={() => this.props.setChecked(!this.props.checked)}
              style={{ display: "inline-block" }}
            />
          </div>
          <div className="btnContainer">
            <button onClick={this.props.handleSignup}>Sign Up</button>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup;
