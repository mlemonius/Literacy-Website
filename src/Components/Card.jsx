import React from "react";
import "../Styles/card.css";

const Card = (props) => {
  return (
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={props.imgsrc} alt="children" className="card-img-top" />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{props.header}</h4>
        <ul className="list-unstyled card-text text-secodary">
          {props.content.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
        <div>
          <span className="price-span">{props.price}</span>
          <span className="period-span">Per month</span>
        </div>
        <a href="/" className="btn btn-outline-success">
          Subcribe
        </a>
      </div>
    </div>
  );
};

export default Card;
