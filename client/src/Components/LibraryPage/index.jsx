import React, { Component } from "react";
import { instanceOf } from "prop-types";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import "./libraryPage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveStory } from "../../actions/credentialActions";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";

class LibraryPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  state = {
    titles: [],
  };

  getTitles = () => {
    axios.get("/server/library/titles").then((response) => {
      if (response.data.message === "success") {
        this.setState({ titles: response.data.stories });
      }
    });
  };

  componentDidMount() {
    this.getTitles();
  }

  handleChooseStory = (id, title) => {
    this.props.setActiveStory(id, title);
    this.props.cookies.set("activeStory", title, {
      path: "/",
      maxAge: 86400,
    });
    this.props.history.push("/read-story");
  };

  render() {
    return (
      <>
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
                    this.handleChooseStory(index, story.title);
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

                        <Typography variant="body2">
                          Publisher: {story.publisher}
                        </Typography>
                        <Typography variant="body2">
                          Illustrator: {story.illustrator}
                        </Typography>
                        <Typography variant="body2">
                          {story.description}
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
