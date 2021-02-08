import React, { Component } from "react";
import PDFdisplay from "./PDFdisplay";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
class Library extends Component {
  state = {};
  render() {
    return (
      <Button variant="primary">
        <Link to="/pdfview">Click here</Link>
      </Button>
    );
  }
}

export default Library;
