import React, { Component } from "react";
import "./emailConfirm.css";
import axios from "axios";
import qs from "qs";
import { changeEmail } from "../../actions/credentialActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EmailConfirm extends Component {
  state = {
    email: "",
  };

  handleConfirm = () => {
    axios({
      method: "post",
      // url: "https://secure-bastion-85489.herokuapp.com/server/verify",
      url: "/server/verify",
      data: qs.stringify({
        email: this.state.email,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        if (response.data.message === "success") {
          this.props.changeEmail(this.state.email);
          this.props.history.push("/signup");
        } else {
          // this.setState({ valid: false });
        }
      } else {
      }
    });
    // this.props.history.push("/signup");
  };

  render() {
    return (
      <section className="email-confirm">
        <div className="email-confirmContainer" style={{ marginTop: "10%" }}>
          <h1>Sign Up</h1>
          <label>Enter your email address</label>
          {/* <input
            type="text"
            autoFocus
            required
            placeholder="6 digit code"
            value={this.state.confirmCode}
            onChange={(e) => this.setState({ confirmCode: e.target.value })}
          /> */}
          <input
            type="text"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <div className="btnContainer">
            <button onClick={this.handleConfirm}>Register</button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeEmail,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirm);
