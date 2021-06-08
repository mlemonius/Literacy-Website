import React, { Component } from "react";
import { instanceOf } from "prop-types";
import PDFdisplay from "./PDFdisplay";
import { connect } from "react-redux";
import { withCookies, Cookies } from "react-cookie";

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

  render() {
    return (
      <PDFdisplay title={this.state.title} backToLibrary={this.backToLibrary} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.userInfo.activeStory.title,
  };
};

export default connect(mapStateToProps)(withCookies(ReadingPage));
