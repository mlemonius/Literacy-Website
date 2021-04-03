import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import sample from "../Data/marty_mongoose2.pdf";
import { Button, TextField } from "@material-ui/core";
import "../Styles/pdf.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFdisplay extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    prevAvailable: false,
    nextAvailable: false,
    tempPageNo: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    if (numPages > 1) this.setState({ numPages, nextAvailable: true });
    else this.setState({ numPages });
  };

  goToPrevPage = () => {
    if (this.state.pageNumber - 1 === 1)
      this.setState((state) => ({
        pageNumber: state.pageNumber - 1,
        prevAvailable: false,
        nextAvailable: true,
      }));
    else {
      this.setState((state) => ({
        pageNumber: state.pageNumber - 1,
        nextAvailable: true,
      }));
    }
  };

  goToNextPage = () => {
    if (this.state.pageNumber + 1 === this.state.numPages)
      this.setState((state) => ({
        pageNumber: state.pageNumber + 1,
        nextAvailable: false,
        prevAvailable: true,
      }));
    else {
      this.setState((state) => ({
        pageNumber: state.pageNumber + 1,
        prevAvailable: true,
      }));
    }
  };

  goToPage = () => {
    if (
      this.state.tempPageNo > 0 &&
      this.state.tempPageNo <= this.state.numPages
    )
      this.setState({ pageNumber: this.state.tempPageNo });
    else {
      console.log("Invalid");
    }
  };

  handleChange = (event) => {
    if (event.target.value !== "") {
      let pageNo = event.target.value;
      if (!isNaN(pageNo)) {
        pageNo = parseInt(pageNo);
        this.setState({ tempPageNo: pageNo });
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.pageNumber !== this.state.pageNumber) {
      var prev = false;
      var next = false;
      if (
        this.state.pageNumber > 1 &&
        this.state.pageNumber < this.state.numPages
      ) {
        prev = true;
        next = true;
      } else if (this.state.pageNumber <= 1) next = true;
      else if (this.state.pageNumber >= this.state.numPages) prev = true;
      this.setState({ prevAvailable: prev, nextAvailable: next });
    }
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div className="pdf-display-container">
        <h3>Title</h3>
        <Document file={sample} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p className="page-info">
          Page {pageNumber} of {numPages}
        </p>
        <div>
          <TextField
            id="standard-basic"
            label="Jump To"
            placeholder="Ex: 1"
            onChange={(event) => this.handleChange(event)}
            style={{ maxWidth: 80, maxHeight: 30 }}
          />
          <span>
            <Button
              onClick={this.goToPage}
              style={{ maxWidth: 40, marginTop: 10 }}
            >
              Go!
            </Button>
          </span>
          <span className="prev-next-block">
            <Button
              variant="outlined"
              color="primary"
              disabled={!this.state.prevAvailable}
              onClick={this.goToPrevPage}
              style={{ maxWidth: 75, marginLeft: "5%" }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={!this.state.nextAvailable}
              onClick={this.goToNextPage}
              style={{ maxWidth: 75, marginLeft: "5%" }}
            >
              Next Page
            </Button>
            {/* Put the arrow here! */}
          </span>
        </div>
      </div>
    );
  }
}

export default PDFdisplay;
