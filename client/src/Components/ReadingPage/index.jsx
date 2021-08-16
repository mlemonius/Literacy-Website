import React, { Component } from "react";
import { instanceOf } from "prop-types";
import PDFdisplay from "./PDFdisplay";
import { connect } from "react-redux";
import { withCookies, Cookies } from "react-cookie";
import { Helmet } from "react-helmet";
import axios from "axios";
class ReadingPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  state = {
    title: this.props.cookies.get("activeStory") || "",
  };

  backToLibrary = () => {
    this.props.history.push("/library");
  };
  componentDidMount = () => {
    this.authenticate();
    setInterval(() => this.authenticate(), 60000 * 10);
  };

  authenticate = () => {
    axios.get("/server/user/authenticate").then((response) => {
      if (response.data.message === "success") {
      } else {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>ReadPal | Reading: {this.state.title}</title>
        </Helmet>
        <PDFdisplay
          title={this.state.title}
          backToLibrary={this.backToLibrary}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.userInfo.activeStory.title,
  };
};

export default connect(mapStateToProps)(withCookies(ReadingPage));
