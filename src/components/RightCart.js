import React from "react";
import "../Css/rightCart.css";
import { Image } from "react-bootstrap"; // Import Modal and Button
// import slider1 from "../images/Girl-removebg-preview.png";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
// import { IoMdAdd } from "react-icons/io";
// import { FiMinus } from "react-icons/fi";
// import { FaRegTrashCan } from "react-icons/fa6";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
// import FetchCartData from "./FetchCardData";

const RightCart = ({ isCanvasOpen, toggleCanvas, cart, user }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { items } = useCart();
  // const isEmpty = items.length === 0;
  const [theme] = useThemeHook();
  // const [showGiftModal, setShowGiftModal] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const lang = location.pathname.split("/")[1] || "en";
  //     const { user, cart, loading, error } = FetchCartData(); // Use the custom hook
  const isUserLoggedin = Boolean(user);
  const displayitems = isUserLoggedin ? cart : items;
  const isEmpty = displayitems.length === 0;
  // State to track the visibility of the special instructions text box for each item
  const calculateTotalPrice = () => {
    return displayitems.reduce((total, item) => {
      return total + (item.price * item.quantity); // Sum up the total price for each item
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  // const [specialInstructionsVisible, setSpecialInstructionsVisible] =
  //   useState(false);

  // const handleToggleInstructions = () => {
  //   setSpecialInstructionsVisible((prevState) => !prevState);
  // };

  // const handleCheckout = () => {
  //   handleClose();

  //   navigate(`/${lang}/cheakOut`);
  // };

  // Function to open the modal
  // const handleGiftClick = () => {
  //   setShowGiftModal(true);
  // };

  // // Function to close the modal
  // const handleClose = () => {
  //   setShowGiftModal(false);
  // };


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
                    {/* <h6 className='Price'>Size: 100 ml</h6> */}
                    {/* <button
                      className={`btn btn-link mt-2 text-decoration-none ${
                        theme ? "" : "text-dark"
                      }`}
                      onClick={handleGiftClick}
                    >
                      Is this a gift?
                    </button> */}
                    {/* Quantity Control */}
                    {/* <div className="d-flex align-items-center mt-3 Quantity">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                                    disabled={item.quantity <= 1}
                                >
                                    <FiMinus size="1.4rem"/>
                                </button>
                                <span className="m-2">{item.quantity}</span>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleQuantityChange(item.id, 'increase')}
                                >
                                    <IoMdAdd size="1.4rem"/>
                                </button>
                                <span><FaRegTrashCan size="1rem"/></span>
                            </div> */}
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

              {/* "Order Special Instructions" button */}
              {/* <button
                    className={`btn btn-link mt-2 text-decoration-none mt-3 ${theme ? '' : 'text-dark'}`}
                    onClick={() => handleToggleInstructions()}
                >
                    Order special instructions <TiArrowSortedDown size="1rem"/>
                </button>
                {specialInstructionsVisible && (
                    <textarea
                        className="form-control custom-textarea mt-2"
                        rows="3"
                        placeholder="Add your special instructions here..."
                    />
                )} */}

              {/* Checkout Button */}
              {/* <Button
                onClick={handleCheckout}
                className={
                  theme
                    ? "bg-light-black text-light border-but mt-5 w-100"
                    : "bg-light text-black border-but mt-5 w-100"
                }
              >
                Check out
              </Button> */}
            </div>
          </>
        )}
      </div>


    </div>
  );
};

export default RightCart;
// End of RightCart component
// This component is used to display the items in the shopping cart. It also includes a modal for "Is this a gift?" option.
// The theme can be controlled using the ThemeProvider component.
// The component uses the React Bootstrap library for modals and buttons.
// The styling is applied using CSS classes in the "rightCart.css" file.
// The component is exported for use in other components.
// Note: This is a basic implementation, and additional features can be added as needed.
