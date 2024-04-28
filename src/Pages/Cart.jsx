import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../StyledComponents/Button.style";
import { SlArrowLeft } from "react-icons/sl";
import { ThemeContext } from "../hooks/ContextApi";

function Cart({ cartItems, onRemove, handleIncrement, handleDecrement }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme?.state?.darkMode;
  return (
    <div>
      <div className="cart-product">
        <div className="cart-product-container">
          <h3 className="cart-product-container-heading">Your Cart</h3>
        </div>
      </div>

      <div className="cart-items">
        <div className="cart-items-container">
          {cartItems?.length === 0 ? (
            <div>No items in the cart</div>
          ) : (
            <div className="cart-items-products">
              <div className="cart-items-products-shop-toggle">
                <Link to="/shop">
                  <Button
                    padding="8px"
                    bgColor="none"
                    color={darkMode ? "white" : "black"}
                    display="flex"
                    hoverColor="white"
                  >
                    <SlArrowLeft className="cart-items-products-shop-toggle-arrow" />
                    Continue shopping
                  </Button>
                </Link>
              </div>
              {cartItems?.map((products, index) => {
                return (
                  <div key={index} className="cart-items-products-list">
                    <div className="cart-items-products-list-item">
                      <div className="cart-items-products-list-item-slider">
                        {products?.images?.map((item, index) => {
                          return <img src={item} alt="" key={index} />;
                        })}
                      </div>
                      <div className="cart-items-products-list-item-desc">
                        <a href="/" className="cart-items-products-list-title">
                          {products?.title}
                        </a>
                        <h5 className="cart-items-products-list-price">
                          ${products?.price}
                        </h5>
                      </div>
                      <div className="cart-items-error-disclaimer">
                        {products.quantity.length > products.stock ? (
                          <p>Cannot be added more items</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="cart-items-products-list-item-total">
                      <Button
                        hover="grey"
                        padding="4px 10px"
                        fontSize="16px"
                        borderRadius="4px"
                        onClick={() => handleDecrement(products.id)}
                      >
                        -
                      </Button>

                      <span className="cart-items-quantity">
                        {products?.quantity}
                      </span>
                      {/* <input className="cart-items-qty-number" type="text" min={1} max={products?.stock} /> */}
                      <Button
                        hover="grey"
                        padding="4px 10px"
                        fontSize="16px"
                        borderRadius="4px"
                        marginLeft="7px"
                        onClick={() => handleIncrement(products.id)}
                      >
                        +
                      </Button>

                      {/* Remove Item from cart */}
                      <Button
                        padding="8px"
                        borderRadius="4px"
                        marginTop="8px"
                        marginBottom="12px"
                        fontSize="14px"
                        marginLeft="7px"
                        onClick={() => onRemove(products.id)}
                      >
                        Remove
                      </Button>

                      <div className="cart-items-total">
                        <h5>
                          Total price - ${products?.price * products?.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="cart-items-sidepanel">
            <aside className="cart-items-sidepanel-checkout">
              <p className="">Order Summary</p>
              <div className="cart-items-sidepanel-checkout-text">
                <ul className="cart-items-ordersummary">
                  <li>Total Items -</li>
                  <li>Apply Discount -</li>
                  <li>Total Amount - </li>
                </ul>
                <h5 className="cart-items-sidepanel-checkout-text-center">
                  Subtotal
                </h5>
                <h3 className="cart-items-sidepanel-checkout-text-price">
                  $
                  {cartItems
                    ?.map((item) => item.price * item.quantity)
                    ?.reduce((total, value) => total + value, 0)}
                </h3>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
