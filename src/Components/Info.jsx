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

class Info extends Component {
  state = {};
  render() {
    return (
      <div
        className="Info-block"
        style={{ width: "60%", margin: "auto", padding: "10px" }}
      >
        <Container style={{ margin: 20, textAlign: "center" }}>
          <h1 style={{ color: "#434343" }}>Lorem Ipsum Dolor</h1>
          <Typography color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Container>
        <Grid container spacing={3}>
          <Grid key="0" item xs={6}>
            <Card variant="outlined" style={{ textAlign: "left" }}>
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
          <Grid key="1" item xs={6}>
            <Card variant="outlined" style={{ textAlign: "left" }}>
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
          <Grid key="0" item xs={6}>
            <Card variant="outlined" style={{ textAlign: "left" }}>
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
          <Grid key="1" item xs={6}>
            <Card variant="outlined" style={{ textAlign: "left" }}>
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
