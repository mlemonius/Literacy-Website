import React, { Component } from "react";
import "../../Styles/emailConfirm.css";

// const history = useHistory();

class EmailConfirm extends Component {
  state = {
    confirmCode: "",
  };

  handleConfirm = () => {
    this.props.history.push("/child-profile-form");
  };

  render() {
    return (
      <section className="email-confirm">
        <div className="email-confirmContainer" style={{ marginTop: "10%" }}>
          <h1>Email Confirmation</h1>
          <label>Enter confirmation code sent to your email:</label>
          <input
            type="text"
            autoFocus
            required
            placeholder="6 digit code"
            value={this.state.confirmCode}
            onChange={(e) => this.setState({ confirmCode: e.target.value })}
          />

          <div className="btnContainer">
            <button onClick={this.handleConfirm}>Confirm</button>
          </div>
        </div>
      </section>
    );
  }
}

export default EmailConfirm;
