import { React, Component } from "react";
import { Checkbox } from "@material-ui/core";
import { CountryDropdown } from "react-country-region-selector";

class Signup extends Component {
  state = {};

  // resendCode = () => {
  //   axios.get("").then((response) => {});
  // };

  render() {
    return (
      <section className="signup">
        <div className="signupContainer" style={{ marginTop: "10%" }}>
          <h1>Sign Up</h1>

          <label>Enter the OTP code we sent you via email</label>
          <input
            type="text"
            autoFocus
            required
            placeholder="6 digit code"
            value={this.props.otp}
            onChange={(e) => this.props.setOtp(e.target.value)}
          />
          {/* <Button
            variant="contained"
            style={{ width: 130, margin: 10 }}
            onClick={this.resendCode}
          >
            Resend Code
          </Button> */}

          <label>Password</label>
          <input
            type="password"
            required
            value={this.props.password}
            onChange={(e) => this.props.setPassword(e.target.value)}
          />

          <label>First Name</label>
          <input
            type="text"
            autoFocus
            required
            value={this.props.firstname}
            onChange={(e) => this.props.setFirstname(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            required
            value={this.props.lastname}
            onChange={(e) => this.props.setLastname(e.target.value)}
          />

          <label>Organization</label>
          <input
            type="text"
            placeholder="optional"
            value={this.props.organization}
            onChange={(e) => this.props.setOrganization(e.target.value)}
          />

          <label>Country</label>
          {/* <input
            type="text"
            required
            value={this.props.country}
            onChange={(e) => this.props.setCountry(e.target.value)}
          /> */}
          <CountryDropdown
            id="country-dropdown"
            value={this.props.country}
            onChange={(val) => this.props.setCountry(val)}
          />

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
