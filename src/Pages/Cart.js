import React, { useState } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCartCheck } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import WrapGiftForm from "../components/WrapGiftForm";
import FetchCartData from "../components/FetchCardData";
const Cart = () => {
  const [theme] = useThemeHook();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  // const [user, setUser] = useState(null);
  // const [cart, setCart] = useState([]);

  const [product_id, setproduct_id] = useState("");
  const { user, cart, setCart } = FetchCartData(); // Use the custom hook

  const {
    updateItemQuantity,
    removeItem,
  } = useCart();

  // Function to open the modal
  const handleGiftClick = (item) => {
    setSelectedItem(item); // Track the selected cart item
    setproduct_id(item.productID);
    setShowGiftModal(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setShowGiftModal(false);
    setSelectedItem(null); // Reset selected item on close
  };
  const handleCheckout = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    navigate(`/${lang}/cheakOut`, { state: { cart, totalPrice } });
  };
  
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity; // Sum up the total price for each item
    }, 0);
  };
  const totalPrice = calculateTotalPrice();
  const updateQuantity = async (itemId, newQuantity) => {
    if (user) {
      // User is logged in, update via API
      try {
        await axios.put(`${API_URL}/cart/updatecart/${itemId}`, {
          quantity: newQuantity,
        });
        // Update local state
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      updateItemQuantity(itemId, newQuantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleDeleteProduct = async (productID) => {
    if (user) {
      try {
        const res = await axios.delete(
          `${API_URL}/cart/deletefromcart/${productID}`
        );
        setCart((prevData) => prevData.filter((data) => data.id !== productID));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    } else {
      removeItem(productID);
      setCart((prevData) => prevData.filter((data) => data.id !== productID));
    }
  };

  return (
    <Container className="py-4 margin_section full-screen-slider">
      <h1 className={`${theme ? "text-light" : "text-light-primary"} my-3 ms-2`}>
        {!cart ? "Your Cart is Empty" : "Your Cart"}
      </h1>
      <Row className="justify-content-center">
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant={theme ? "dark" : "light"}
          className="mb-5"
        >
          <thead>
            <tr>
              <th>Image</th>
              <th >PRODUCT</th>
              <th>Quantity</th>
              <th >Action</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const totalPriceforSpecificProduct = item.price * item.quantity; // Calculate total price for the item
              return (
                <tr key={item.id}>
                  <td>
                    <div
                      style={{
                        background: "white",
                        height: "8rem",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {user ? (
                        // User is logged in, show image from database
                        <img
                          src={
                            item.wrap_type
                              ? `${API_URL}/${item.wrap_img}`
                              : `${API_URL}/${item.img}`
                          } // Display gift image if wrap_id exists
                          style={{ maxWidth: "80px" }}
                          alt={item.title}
                        />
                      ) : (
                        // User is not logged in, show image from local storage
                        <img
                          src={item.first_image} // Assuming item.first_image holds the local image path
                          style={{ maxWidth: "80px" }}
                          alt={item.title}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <h6>{item.title}</h6>
                    <h6>{item.size}</h6>
                    <h6>{item.color}</h6>
                    {item.wrap_type && (
                      <div>
                        <div>Style:{item.wrap_type}</div>
                        <div>Message:{item.message}</div>
                        <div>Delivery Date:{item.delivery_date}</div>
                      </div>
                    )}
                    {/* "Is this a gift?" button */}
                    <button
                      className={`btn btn-link p-0 text-decoration-none ${
                        theme ? "text-light" : "text-light-primary"
                      }`}
                      onClick={() => handleGiftClick(item)}
                    >
                      Is this a gift?
                    </button>
                  </td>

                  <td>Quantity ({item.quantity})</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className={`${
                          theme ? "text-light" : "text-black"
                        } btn btn-outline-secondary ms-2`}
                        onClick={() => {
                          const newQuantity = Math.max(0, item.quantity - 1); // Prevent negative quantities
                          updateQuantity(item.id, newQuantity);
                        }}
                      >
                        <FiMinus size="1.5rem" />
                      </button>
                      <button
                        className={`${
                          theme ? "text-light" : "text-black"
                        } btn btn-outline-secondary ms-2`}
                        onClick={() => {
                          const newQuantity = item.quantity + 1; // Increment quantity
                          updateQuantity(item.id, newQuantity);
                        }}
                      >
                        <IoMdAdd size="1.5rem" />
                      </button>
                      <button
                        className={`${
                          theme ? "text-light" : "text-black"
                        } btn btn-outline-secondary ms-2`}
                        // onClick={() => removeItem(item.id)}
                        onClick={() => {
                          handleDeleteProduct(item.id);
                        }}
                      >
                        <FaRegTrashCan size="1rem" />
                      </button>
                    </div>
                  </td>
                  <td> {totalPriceforSpecificProduct} JD </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {cart && (
          <Row
            style={{ position: "fixed", bottom: 0 }}
            className={`${
              theme ? "bg-light-black text-light" : "bg-light text-black"
            } justify-content-center w-100 `}
          >
            <Col md={6} className="py-2 text-center">
              <h4>Total Price: {totalPrice} JD</h4>
            </Col>
            <Col
              className="p-0 d-flex justify-content-center align-items-center"
              md={6}
            >
              {user ? (
                <Button
                  type="submit"
                  onClick={handleCheckout}
                  className={`${
                    theme
                      ? "bg-dark-primary text-black"
                      : "bg-light-primary text-light"
                  } px-4 py-2 m-3`}
                  style={{ border: 0 }}
                >
                  <BsCartCheck size="1.7rem" />
                  Checkout
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={() => navigate(`/${lang}/sign-in`)}
                  className={`${
                    theme
                      ? "bg-dark-primary text-black"
                      : "bg-light-primary text-light"
                  } px-4 py-2 m-3`}
                  style={{ border: 0 }}
                >
                  <BsCartCheck size="1.7rem" />
                  Checkout
                </Button>
              )}
            </Col>
          </Row>
        )}

        {/* Modal for "Is this a gift?" */}
        <WrapGiftForm
          show={showGiftModal}
          handleClose={handleClose}
          productID={product_id} // Pass the product ID for updating
        />
      </Row>
    </Container>
  );
};

export default Cart;
