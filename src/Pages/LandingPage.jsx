import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login } from "../actions/authID";
import Info from "../Components/Info";
import Cards from "../Components/Cards";
import Footer from "../Components/Footer";
import { Divider } from "@material-ui/core";

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingDiv">
        {/* <h1>
                    Landing Page!!!
                </h1>
                <button onClick={() => this.props.login("abc","xyz")}>
                    Click here
                </button>
                <div>
                    {this.props.auth.username}
                    {this.props.auth.password}
                </div> */}
        <Info />
        <Divider style={{ margin: 70 }} />
        <Cards />
        <Divider style={{ margin: 70 }} />

        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const matchDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(LandingPage);
