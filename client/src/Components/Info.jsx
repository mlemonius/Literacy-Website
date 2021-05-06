import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import "../Styles/landingPage.css";

class Info extends Component {
  state = {};
  render() {
    return (
      <div className="Info-block">
        <Container className="header-container">
          <h1 className="page-title" style={{ color: "#434343" }}>
            Literacy Website
          </h1>
          <Typography color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Container>
        <Grid container spacing={3}>
          <Grid key="0" id="col-1" item>
            <Card
              className="info-card"
              variant="outlined"
              style={{ textAlign: "left" }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  Lorem ipsum dolor sit amet
                </Typography>
                <Typography color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  ullamcorper condimentum ultrices. Cras euismod ornare laoreet
                  quisque
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid key="1" id="col-2" item>
            <Card
              className="info-card"
              variant="outlined"
              style={{ textAlign: "left" }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  Lorem ipsum dolor sit amet
                </Typography>
                <Typography color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  ullamcorper condimentum ultrices. Cras euismod ornare laoreet
                  quisque
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Info;
