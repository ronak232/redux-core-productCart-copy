import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Sass/Style.scss";
import { HiBars3 } from "react-icons/hi2";
import { CiUser, CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/context/firebase";

function NavBar({ count, cartItems, querySearch, setQuerySearch }) {
  const [mobileToggle, setmobileToggle] = useState(false);
  const { user } = useFirebaseAuth();
  
  const toggleHandler = () => {
    setmobileToggle(!mobileToggle);
  };

  return (
    <header>
      <nav className="main-navbar">
        <div>
          <div className="main-navbar-container">
            <a href="/" className="main-navbar-logo">
              <img
                src="https://cartzilla.createx.studio/img/logo-dark.png"
                alt=""
              />
            </a>
            <div className="main-navbar-search hide">
              <form
                className="d-flex"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <CiSearch className="main-navbar-search-icon" />
                <input
                  className="main-navbar-search-bar"
                  name="search"
                  type="search"
                  aria-label="Search"
                  placeholder="Search for products"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                />
              </form>
            </div>
            <div className="main-navbar-productCart">
              <div className="search__product">
                <BsSearch className="search__product_icon" />
              </div>
              <div className="navbar-toggle" onClick={toggleHandler}>
                <button className="navbar-toggle-btn">
                  {mobileToggle ? (
                    <RxCross1 className="smooth" />
                  ) : (
                    <HiBars3 className="smooth" />
                  )}
                </button>
              </div>
              <Link className="main-navbar-user" to={user ? "/dashboard" : "/login"}>
                <CiUser className="main-navbar-user-icons" />
                <div className="main-navbar-user-text">
                  <h5>
                  Hello,
                    {user ? <small>
                      {" "}
                      {String(getAuth()?.currentUser?.email)?.match(/^[a-zA-Z]+/)[0]}
                    </small> : <small>Sign In</small>}
                  </h5>
                  My Account
                </div>
              </Link>
              <Link to="/cart" className="main-navbar-cart-item">
                <RiShoppingCart2Line className="cart-style" />
                <span className="main-navbar-cart-item-number">{count}</span>
                <div className="main-navbar-cart-item-text">
                  <small>My Cart</small>
                  <h3>
                    $
                    {cartItems
                      ?.map((item) => item.price * item.quantity)
                      .reduce((total, value) => total + value, 0)}
                  </h3>
                  <MdArrowDropDown className="main-navbar-cart-item-text-arrow" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="main-navbar-toolbar">
          <div className="main-navbar-toolbar-container">
            <div className="main-navbar-content">
              <ul
                className={
                  mobileToggle
                    ? "navbar-expand-content-list"
                    : "main-navbar-content-list"
                }
              >
                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/">
                    Home
                  </Link>
                </li>
                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="main-navbar-content-list-items">
                  <Link className="main-navbar-content-list-item" to="/account">
                    Account
                  </Link>
                </li>
                <li className="main-navbar-content-list-items">
                  <Link to="/pages" className="main-navbar-content-list-item">
                    Pages
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
