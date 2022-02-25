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
          {this.props.submit ? <h1>Signing Up...</h1> : <h1>Sign Up</h1>}

          <label>Enter the OTP code we sent you via email</label>
          <input
            type="text"
            autoFocus
            required
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            placeholder="6 digit code"
            value={this.props.otp}
            onChange={(e) => this.props.setOtp(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            value={this.props.password}
            onChange={(e) => this.props.setPassword(e.target.value)}
          />

          <label>First Name</label>
          <input
            type="text"
            autoFocus
            required
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            value={this.props.firstname}
            onChange={(e) => this.props.setFirstname(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            required
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            value={this.props.lastname}
            onChange={(e) => this.props.setLastname(e.target.value)}
          />

          <label>Organization</label>
          <input
            type="text"
            placeholder="optional"
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
            value={this.props.organization}
            onChange={(e) => this.props.setOrganization(e.target.value)}
          />

          <label>Country</label>
          <CountryDropdown
            id="country-dropdown"
            disabled={this.props.submit}
            style={
              this.props.submit
                ? {
                    backgroundColor: "#D3D3D3",
                    color: "grey",
                    cursor: "not-allowed",
                  }
                : {}
            }
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
              disabled={this.props.submit}
              color="primary"
              onChange={() => this.props.setChecked(!this.props.checked)}
              style={{ display: "inline-block" }}
            />
          </div>
          <div className="btnContainer">
            <button
              onClick={this.props.handleSignup}
              disabled={this.props.submit}
              style={
                this.props.submit
                  ? {
                      backgroundColor: "grey",
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup;
