import React from "react";
import PDFdisplay from "./PDFdisplay";
import { useCookies } from "react-cookie";

const ReadingPage = (props) => {
  const [cookies] = useCookies();
  const title = cookies.activeStory || "";

  return (
    <PDFdisplay
      title={title}
      backToLibrary={() => props.toggleLeft("library")}
    />
  );
};

export default ReadingPage;
