import React from "react";
import "../Css/rightCart.css";
import { Image } from "react-bootstrap"; // Import Modal and Button
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useCart } from "react-use-cart";

const RightCart = ({ isCanvasOpen, toggleCanvas, cart, user }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { items } = useCart();
  const [theme] = useThemeHook();

  const isUserLoggedin = Boolean(user);
  const displayitems = isUserLoggedin ? cart : items;
  const isEmpty = displayitems.length === 0;
  const calculateTotalPrice = () => {
    return displayitems.reduce((total, item) => {
      return total + (item.price * item.quantity); // Sum up the total price for each item
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div
      // className={`offcanvas offcanvas-end ${isCanvasOpen ? 'show' : ''} ${theme ? 'bg-light-black' : 'bg-light'}`}
      className={`offcanvas offcanvas-end ${isCanvasOpen ? "show" : ""} ${
        theme ? "bg-dark-custom" : "bg-light-custom"
      }`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={isCanvasOpen ? { display: "block" } : {}}
    >
      <div className="offcanvas-header">
        <h5
          className={`offcanvas-title ${theme ? "text-light" : "text-black"}`}
          id="offcanvasRightLabel"
        >
          Your Cart
        </h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={toggleCanvas}
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {isEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {/* Header for product and total */}
            <div className="d-flex justify-content-between mb-3">
              <span className="Price">PRODUCT</span>
              <span className="Price">TOTAL</span>
            </div>
            {/* Scrollable Container for Cart Items */}
            <div className="scrollable-cart-items flex-grow-1">
              <ul className="list-group">
                {displayitems.map((item, index) => (
                  <li
                    key={index}
                    className={`list-group-item d-flex flex-column custom-list-item ${
                      theme
                        ? "bg-light-black text-light"
                        : "bg-light text-black"
                    }`}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      {/* Image */}
                      <Image
                        src={
                          user && item.img
                            ? `${API_URL}/${item.img}`
                            : `${item.first_image}`
                        }
                        className="img-fluid img-card"
                        alt="First slide"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      {/* Title and Price */}
                      <div className="d-flex justify-content-between w-100">
                        <span>{item.title}</span>
                        <span>{item.price} JD</span>
                      </div>
                    </div>
                    <h6 className="Price">{item.price} JD</h6>
                 
                  </li>
                ))}
              </ul>
            </div>

            {/* Fixed area at the bottom for the estimated total, special instructions, and checkout */}
            <div className="fixed-bottom-wrapper mt-4">
              <div className="d-flex justify-content-between w-100">
                <span>Estimated total</span>
                <span>{totalPrice} JD</span>
              </div>
              <h1 className="Price mt-3">
                Taxes included. Discounts and shipping calculated at checkout.
              </h1>

            
            </div>
          </>
        )}
      </div>


    </div>
  );
};

export default RightCart;
