import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../Sass/Style.scss";
import { HiBars3 } from "react-icons/hi2";
import { CiUser, CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/context/firebase..config.jsx";
import ProductSearchSuggestion from "../features/ProductSearchSuggestion";
import logo from "../Images/wonderscape-logo.png";
import totalAmount from "../utils/totalAmount";

function NavBar({ count, cartItems, data }) {
  const { isUserLoggedIn } = useFirebaseAuth();
  const [mobileToggle, setmobileToggle] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  // Search product hooks
  const [querySearch, setQuerySearch] = useState("");
  const toggleHandler = () => {
    setmobileToggle(!mobileToggle);
  };

  const handleMobileSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const changeHandler = (e) => {
    setQuerySearch(e.target.value);
    console.log(data);
  };

  return (
    <header>
      <nav className="main-navbar">
        <div>
          <div className="main-navbar-container">
            <a href="/" className="main-navbar-logo">
              <img src={logo} alt="" />
            </a>
            {/* {!isSearchBarVisible && ( */}
            <div className={`main-navbar-search`}>
              <form
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
                  value={querySearch || ""}
                  onChange={(e) => changeHandler(e)}
                />
                <ProductSearchSuggestion
                  data={data}
                  querySearch={querySearch}
                />
              </form>
            </div>
            {/* )} */}

            <div className="main-navbar-productCart">
              <button
                className="search__product"
                onClick={handleMobileSearchBar}
              >
                <BsSearch className="search__product_icon" />
              </button>
              <div className="navbar-toggle" onClick={toggleHandler}>
                <button className="navbar-toggle-btn">
                  {mobileToggle ? (
                    <RxCross1 className="smooth" />
                  ) : (
                    <HiBars3 className="smooth" />
                  )}
                </button>
              </div>
              <Link
                className="main-navbar-user"
                to={isUserLoggedIn ? "/auth" : "/login"}
              >
                <CiUser className="main-navbar-user-icons" />
                <div className="main-navbar-user-text">
                  <h5>
                    {isUserLoggedIn ? (
                      <small>
                        {String(
                          isUserLoggedIn
                            ? getAuth()?.currentUser?.displayName
                            : ""
                        )}
                      </small>
                    ) : (
                      <small>Sign In</small>
                    )}
                  </h5>
                  My Account
                </div>
              </Link>
              <Link to="/cart" className="main-navbar-cart-item">
                <RiShoppingCart2Line className="cart-style" />
                <span className="main-navbar-cart-item-number">{count}</span>
                <div className="main-navbar-cart-item-text">
                  <small>My Cart</small>
                  <h3>${totalAmount(cartItems)}</h3>
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
                  <Link
                    className="main-navbar-content-list-item"
                    to={isUserLoggedIn ? "/auth" : "/account"}
                  >
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
        <div className={`mobile-search ${isSearchBarVisible ? "show" : ""}`}>
          <form
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
              value={querySearch || ""}
              onChange={(e) => changeHandler(e)}
            />
            <ProductSearchSuggestion data={data} querySearch={querySearch} />
          </form>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
