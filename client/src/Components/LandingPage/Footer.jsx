import React from "react";
import Info from "../../Data/footerInfo";
import "./landingPage.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 footer-left-block">
              <h4>Contact Us</h4>
              <ul className="list-unstyled">
                <li>Email: {Info.email}</li>
                <li>Phone number: {Info.tel}</li>
                <li>Address: {Info.address}</li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 footer-right-block">
              <h4>Lorem, ipsum</h4>
              <ul className="list-unstyled">
                {Info.additionalInfo1.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 footer-right-block">
              <h4>Lorem, ipsum</h4>
              <ul className="list-unstyled">
                {Info.additionalInfo2.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} STORYBOOK ACADEMY - All Rights
              Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
