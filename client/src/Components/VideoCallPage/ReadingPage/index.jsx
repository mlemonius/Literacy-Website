import React from "react";
import PDFdisplay from "./PDFdisplay";
import { useCookies } from "react-cookie";

const ReadingPage = () => {
  const [cookies] = useCookies();
  const title = cookies.activeStory || "";

  const backToLibrary = () => {
    this.props.toggleLeft("library");
  };
  return (
    <>
      <PDFdisplay title={title} backToLibrary={backToLibrary} />
    </>
  );
};

export default ReadingPage;
