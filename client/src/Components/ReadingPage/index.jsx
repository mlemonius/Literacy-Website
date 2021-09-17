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

  authenticate = async () => {
    const response = await axios.post(
      "/server/user/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.message !== "success") {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Reading: {this.state.title}</title>
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
