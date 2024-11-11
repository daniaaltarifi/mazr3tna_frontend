import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
const WrapGiftForm = ({ show, handleClose, productID }) => {
  const [wrapGift, setWrapGift] = useState([]);
  const [theme] = useThemeHook();
  const API_URL = process.env.REACT_APP_API_URL;
  const [isGift, setIsGift] = useState(false);
  const [wrapId, setWrapId] = useState(null); // Assume you'll map wrap options to IDs
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [user, setuser] = useState({});
  const [showOptions, setShowOptions] = useState(false); // State to control the visibility of options
  const [selectedWrap, setSelectedWrap] = useState(""); // State to hold the selected wrap type

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("account"));
    if (storedUser) {
      setuser(storedUser);
    }
    const fetchData = async () => {
      try {
        const [wrapResponse] = await Promise.all([
          axios.get(`${API_URL}/wrapgift`),
        ]);
        setWrapGift(wrapResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    if (user && user.id) {
      const selectedWrap = wrapGift.find((wrap) => wrap.id === wrapId);
      const productData = {
        productID: productID,
        user_id: user.id,
        quantity: 1,
        price: selectedWrap ? selectedWrap.cost : 0,
        wrap_id: wrapId,
        message: message,
        delivery_date: deliveryDate,
      };
      handleClose();
      window.location.reload();

      try {
        const response = await fetch(`${API_URL}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        const data = await response.json();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      console.log("User is not logged in.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Gift Option Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <div className="form-group">
            <div
              style={{
                border: "solid 1px #e6e8ec",
                height: "6vh",
                paddingLeft: "2vh",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => setShowOptions(!showOptions)}
            >
                <div>

              <label htmlFor="giftWrap">Gift Wrap</label>
              {selectedWrap && <label> - {selectedWrap}</label>}{" "}
                </div>
              <IoIosArrowDown />
            </div>
            {showOptions && (
              <div className="wrap-list">
                {wrapGift.map((wrap) => (
                  <div
                    key={wrap.id}
                    className={`wrap-item ${
                      wrapId === wrap.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setWrapId(wrap.id);
                      setSelectedWrap(wrap.wrap_type); 
                      setShowOptions(false);
                    }}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={`${API_URL}/${wrap.img}`}
                      alt={wrap.wrap_type}
                      className="img-fluid small-image"
                      style={{
                        marginRight: "10px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <span>
                      {wrap.wrap_type} - {wrap.cost} JD
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="giftMessage">Gift Message</label>
          <textarea
            id="giftMessage"
            className="form-control"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="deliveryDate">Delivery Date</label>
          <input
            type="date"
            id="deliveryDate"
            className="form-control"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button  className={`${
                    theme
                      ? "bg-dark-primary text-black"
                      : "bg-light-primary text-light"
                  } px-4 py-2 m-3`} onClick={handleClick}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WrapGiftForm;
