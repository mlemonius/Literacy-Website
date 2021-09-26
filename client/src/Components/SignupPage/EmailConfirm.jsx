import React, { Component } from "react";
import "./emailConfirm.css";
import axios from "axios";
import qs from "qs";
import { changeEmail } from "../../actions/credentialActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";

class EmailConfirm extends Component {
  state = {
    email: "",
    submit: false,
  };

  handleConfirm = () => {
    this.setState({ submit: true });
    axios({
      method: "post",
      url: "/server/user/verify",
      data: qs.stringify({
        email: this.state.email,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.message === "success") {
          this.props.changeEmail(this.state.email);
          this.props.history.push("/signup");
        } else {
          this.setState({ submit: false });
        }
      } else {
        this.setState({ submit: false });
      }
    });
    // this.props.history.push("/signup");
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Email Confirmation</title>
        </Helmet>
        <section className="email-confirm">
          <div className="email-confirmContainer" style={{ marginTop: "10%" }}>
            {this.state.submit ? <h1>Signing Up...</h1> : <h1>Sign Up</h1>}
            <label>Enter your email address</label>
            <input
              type="text"
              required
              disabled={this.state.submit}
              style={
                this.state.submit
                  ? {
                      backgroundColor: "#D3D3D3",
                      color: "grey",
                      cursor: "not-allowed",
                    }
                  : {}
              }
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />

            <div className="btnContainer">
              <button
                onClick={this.handleConfirm}
                disabled={this.state.submit}
                style={
                  this.state.submit
                    ? {
                        backgroundColor: "grey",
                        cursor: "not-allowed",
                      }
                    : {}
                }
              >
                Register
              </button>
            </div>
          </div>
        </section>
      </>
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
