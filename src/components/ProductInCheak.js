import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
const ProductInCheak = ({
  products,
  totalPrice,
  shippingMethod,
  finalTotalPrice,
  setFinalTotalPrice,
  theme,
}) => {
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [discount_code, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const handleValidateCode = async (e) => {
    e.preventDefault();
    if (discountApplied) {
      setErrorMessage("Discount code has already been applied.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/discountcode/validatecode`,
        {
          total_price: finalTotalPrice,
          discount_code: discount_code,
        }
      );
      setFinalTotalPrice(response.data.finalPrice);
      setErrorMessage('')
      setSuccessMessage(response.data.message);
      setDiscountApplied(true);
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.error || "An error occurred. Please try again."
        );
      } else if (error.request) {
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage("Error: " + error.message);
      }
    }
  };
  return (
    <>
      <ul className="list-group mt-4">
        {products.length === 0 ? (
          <li className="list-group-item">
            {" "}
            {lang === "ar" ? "لا يوجد عناصر في السلة" : "No items in the cart."}
          </li>
        ) : (
          products.map((item, index) => (
            <li
              key={index}
              className={`list-group-item d-flex flex-column custom-list-item ${
                theme ? "bg-light-black text-light" : "bg-light text-black"
              }`}
            >
              <div className="d-flex align-items-center justify-content-between">
                {/* Image */}
                <Image
                  src={
                    item.wrap_type
                      ? `${API_URL}/${item.wrap_img}`
                      : `${API_URL}/${item.img}`
                  }
                  className="img-fluid img-card"
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                {/* Title and Price */}
                <div className="d-flex justify-content-between w-100">
                  <span>{item.title}</span>
                  <span>{item.size}</span>
                  <span>{item.color}</span>
                  {item.wrap_type && (
                    <div style={{ fontSize: "12px" }}>
                      <span>Style:{item.wrap_type}</span>
                      <span>Message:{item.message}</span>
                      <span>Delivery Date:{item.delivery_date}</span>
                    </div>
                  )}
                  <span>({item.quantity}) </span>
                  <span>{item.price} JD</span>
                </div>
              </div>
              {/* <h6 className="Price">Size: 100 ml</h6>{" "} */}
              {/* Size can be passed as a prop if variable */}
            </li>
          ))
        )}
      </ul>
      <Row>
        <h6
          className={` pb-3 mt-5 ${
            theme ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          {lang === "ar" ? "ملخص الطلب" : " Order summary"}({products.length})
        </h6>
        <Form.Group className="mb-3 col-lg-8 ">
          <Form.Control
            name="Discount"
            type="text"
            placeholder="Discount code"
            required
            onChange={(e) => setDiscountCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-4">
          {/* Submit Button */}
          <Button
            type="button"
            className={`${
              theme ? "bg-dark-primary text-black" : "bg-light-primary"
            } m-auto d-block w-100 `}
            disabled={loading}
            style={{ border: 0 }}
            onClick={handleValidateCode}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp;Loading...
              </>
            ) : (
              "Apply"
            )}
          </Button>
        </Form.Group>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
      </Row>
      <Row>
        <Col xs={6} className="text-start">
          <div>
            {" "}
            {lang === "ar" ? "السعر " : "Subtotal"}({products.length} items)
          </div>
        </Col>
        <Col xs={6} className="text-end">
          <div> {totalPrice} JOD</div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={6} className="text-start">
          <div> {lang === "ar" ? "الشحن" : "Shipping"}</div>
          <div
            className={` ${theme ? "text-dark-primary" : "text-dark-primary"}`}
          >
            {shippingMethod}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={8} className="text-start">
          <div>
            <h5 className="m-1">
              {" "}
              {lang === "ar" ? "السعر الكلي" : "Total:  "}
            </h5>{" "}
          </div>
          {/* <div
            className={` ${theme ? "text-dark-primary" : "text-dark-primary"}`}
          >
            Including JOD 0.000 in taxes
          </div>
          <div>TOTAL SAVINGS JOD 4.000</div> */}
        </Col>
        <Col xs={4} className="text-end">
          <h5 className="m-1">{finalTotalPrice} JOD</h5>
        </Col>
      </Row>
    </>
  );
};

export default ProductInCheak;
