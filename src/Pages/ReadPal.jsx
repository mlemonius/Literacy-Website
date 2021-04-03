import React from "react";
import { Grid } from "@material-ui/core";
import Library from "../Components/Library";
import SignUpForm from "../Components/SignUpForm";
import "../Styles/readpal.css";

const ReadPal = () => {
  return (
    <div className="readpal-container">
      <Grid container spacing={3}>
        <Grid key="0" className="library-col" item>
          <h1>Library</h1>
          <Library />
        </Grid>
        <Grid key="0" className="form-col" item>
          <SignUpForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReadPal;
