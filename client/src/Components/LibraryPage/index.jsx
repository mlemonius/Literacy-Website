import React, { Component } from "react";
import { instanceOf } from "prop-types";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import "./libraryPage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveStory } from "../../actions/credentialActions";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import sample from "../../Data/children.jpg";
import { Helmet } from "react-helmet";

function CustomizedDialog(props) {
  const { handleOpen, open, story, handleChooseStory } = props;

  return (
    <Dialog open={open} onClose={() => handleOpen(false)} maxWidth="lg">
      <DialogTitle>
        <Typography variant="h3">{story.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography style={{ fontSize: 25 }}>Author: {story.author}</Typography>
        <Typography style={{ fontSize: 25 }}>Pages: {story.pages}</Typography>
        <img
          // src={story.image}
          src={sample}
          alt="thumbnail"
          style={{
            width: 200,
            height: 200,
            margin: 20,
          }}
        />
        <div style={{ fontSize: 20, marginTop: 15 }}>{story.description}</div>
      </DialogContent>
      <DialogActions>
        <Button variant="primary" onClick={() => handleOpen(false)}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={() => handleChooseStory(story.title)}
        >
          Read
        </Button>
        <Button variant="primary">Find Friends</Button>
      </DialogActions>
    </Dialog>
  );
}

class LibraryPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  state = {
    titles: [],
    open: false,
    chosenStory: {
      title: "",
      description: "",
      author: "",
      ages: [""],
    },
  };

  getTitles = () => {
    axios.get("/server/library/titles").then((response) => {
      if (response.data.message === "success") {
        this.setState({ titles: response.data.stories });
      }
    });
  };

  componentDidMount = () => {
    this.authenticate();
    this.getTitles();
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

  handleChooseStory = (title) => {
    this.props.setActiveStory(title);
    this.props.cookies.set("activeStory", title, {
      path: "/",
      maxAge: 86400,
    });
    this.props.history.push("/read-story");
  };

  handleOpen = (action) => {
    this.setState({ open: action });
  };

  handlePreview = (story) => {
    this.setState({ open: true, chosenStory: story });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Storybook Academy | Library</title>
        </Helmet>
        <Typography className="library-page-header" variant="h2">
          Library
        </Typography>
        <div className="library-page-block">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {this.state.titles.map((story, index) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => {
                    this.handlePreview(story);
                  }}
                  style={{ cursor: "pointer" }}
                  className="lib-story"
                >
                  {/* <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={`Title: ${story.title}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body1"
                          color="text.primary"
                          style={{ fontStyle: "italic", marginBottom: 10 }}
                        >
                          Author: {story.author}
                        </Typography>

                        <Typography variant="body1">
                          Pages: {story.pages}
                        </Typography>
                        <Typography variant="body1">
                          Ages: {story.ages[0]} and {story.ages[1]}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </div>
        <CustomizedDialog
          handleOpen={this.handleOpen}
          open={this.state.open}
          story={this.state.chosenStory}
          handleChooseStory={this.handleChooseStory}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setActiveStory,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(LibraryPage));
