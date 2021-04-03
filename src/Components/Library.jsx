import React from "react";
import PDFdisplay from "../Pages/PDFdisplay";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Library = () => {
  return (
    <Button variant="primary">
      <Link to="/pdfview">Click here</Link>
      <div>
        <h4>Book Title</h4>
      </div>
    </Button>
  );
};

export default Library;
