import React from "react";
import data from "../Json/data.json";
import { Button } from "../StyledComponents/Button.style";
import { TfiEmail } from "react-icons/tfi";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div className="footer--text">
            <h5 className="footer--text-heading">Shop departments</h5>
            <div className="footer--text-widgets">
              <ul className="footer--text-widgets-list">
                {data?.footer?.shopDepartment?.map((item) => {
                  return (
                    <li
                      className="footer--text-widgets-list-items"
                      key={item?.id}
                    >
                      <a
                        className="footer--text-widgets-list-items-links"
                        href="/"
                      >
                        {item?.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="footer--text">
            <div className="footer--text-widgets">
              <h5 className="footer--text-heading">Account & shipping info</h5>
              <ul className="footer--text-widgets-list">
                {data?.footer?.Account?.map((item) => {
                  return (
                    <li
                      className="footer--text-widgets-list-items"
                      key={item?.id}
                    >
                      <a
                        className="footer--text-widgets-list-items-links"
                        href="/"
                      >
                        {item?.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="footer--text-widgets">
              <h5 className="footer--text-heading">About us</h5>
              <ul className="footer--text-widgets-list">
                {data?.footer?.About?.map((item) => {
                  return (
                    <li
                      className="footer--text-widgets-list-items"
                      key={item?.id}
                    >
                      <a
                        className="footer--text-widgets-list-items-links"
                        href="/"
                      >
                        {item?.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="footer-connect">
            <div className="footer-connect-content">
              <h4>Stay informed</h4>
              <form action="" className="footer-connect-form">
                <div className="footer-connect-form-control">
                  <TfiEmail className="footer-connect-form-control-mail" />
                  <input type="text" name="email" placeholder="Your email" />
                  <Button
                    marginTop="0"
                    borderRadius="0px 7px 6px 0px"
                    padding="10px"
                    bgColor="#fe696ae6"
                  >
                    Subscribe
                    <sup>*</sup>
                  </Button>
                </div>
              </form>
              <p className="footer-connect-form-text">
                *Subscribe to our newsletter to receive early discount offers,
                updates and new products info.
              </p>
            </div>
            <div className="footer-connect-app">
              <h3>Download our app</h3>
              <div className="footer-connect-app-content">
                <div className="footer-connect-app-content-apple">
                  <a href="/" className="apple-btn">
                    <span>Download on the</span>
                    <span>App Store</span>
                  </a>
                </div>
                <div className="footer-connect-app-content-play">
                  <a href="/" className="play-btn">
                    <span>Download on the</span>
                    <span>App Store</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-dark"></div>
    </footer>
  );
}

export default Footer;
