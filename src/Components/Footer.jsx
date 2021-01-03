import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div
              className="col-md-3 col-sm-6"
              style={{
                borderRight: "1px solid white",
                paddingRight: 50,
              }}
            >
              <h4>Contact Us</h4>
              <ul className="list-unstyled">
                <li>Email: email@abc.xyz</li>
                <li>Phone number: (999) 999-9999</li>
                <li>Address: 0 This Street, ABC, XYZ 00000</li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6" style={{ paddingLeft: 50 }}>
              <h4>Lorem, ipsum</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4>Lorem, ipsum</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
                <li>
                  <a href="/">Lorem ipsum</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Literacy Website - All Rights
              Reserved
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  .footer-middle {
    background: #282828;
    padding-top: 3rem;
    color: #fff;
  }

  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }

  ul li a {
    color: rgb(109, 109, 109);
  }

  ul li a:hover {
    color: rgb(172, 172, 172);
  }
`;
