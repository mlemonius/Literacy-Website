import React, { Component } from "react";
import Card from "./Card";
import "./card.css";
import children from "../../Data/children.jpg";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"],
    };
  }

  render() {
    return (
      <div className="container-fluid d-flex d-sm-flex d-md-inline-flex justify-content-center">
        <div className="row cards-row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <Card
              imgsrc={children}
              header="Individual"
              content={this.state.list}
              price="$49"
            />
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <Card
              imgsrc={children}
              header="Group"
              content={this.state.list}
              price="$89"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
