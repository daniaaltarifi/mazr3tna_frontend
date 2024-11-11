import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "../Css/cheakout.css";
import FetchUserById from "./FetchUserById";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import ProductInCheak from "./ProductInCheak";
import { useLocation, useNavigate } from "react-router-dom";
import Address from "./Address";
import axios from "axios";

function CheakOut({ products = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [theme] = useThemeHook();
  const { fetchUser } = FetchUserById(API_URL);
  const email = fetchUser && fetchUser.length > 0 ? fetchUser[0].email : "";
  const [errorMessage, setErrorMessage] = useState("");
  // const [billingAddress, setBillingAddress] = useState("");
  // const [showBillingForm, setShowBillingForm] = useState(false); // State for showing the billing form
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const [previousShippingCost, setPreviousShippingCost] = useState(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState(totalPrice);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const { formData, address, loading, handleChange, handleSubmit } = Address(
    storedUser?.id
  );
  const handleShippingChange = (method, cost) => {
    setFinalTotalPrice((prevPrice) => prevPrice - previousShippingCost + cost);
    setPreviousShippingCost(cost); // Update the previous shipping cost
    setShippingMethod(method);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleSubmit(); // Make sure this is defined

    try {
      const balance = fetchUser[0].balance;
      if (paymentMethod === "wallet" && balance < finalTotalPrice) {
        setErrorMessage(
          "Insufficient wallet balance to complete the purchase."
        );
        return; // Stop the function if balance is insufficient
      }
      const response = await axios.post(`${API_URL}/orders/addorder`, {
        user_id: storedUser.id,
        address_id: address.id,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        total_price: finalTotalPrice,
        order_items: cart.map((item) => ({
          product_id: item.productID, // Assuming `id` corresponds to `product_id`
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
          message: item.message,
          wrap_type: item.wrap_type,
          delivery_date: item.delivery_date,
        })),
      });
      // Update balance only if payment method is wallet
      if (paymentMethod === "wallet") {
        const newBalance = (balance - finalTotalPrice).toFixed(2); // Calculate new balance

        // Update user balance in the database
        await axios.put(`${API_URL}/wallet/update/balance`, {
          userId: storedUser.id,
          new_balance: newBalance,
        });
      }
      setErrorMessage("Order Completed successfully");
      setTimeout(() => {
        navigate(`/${lang}`);
      }, 1500);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Container
      className={`py-5 ${
        theme ? "text-light bg-light-black" : "text-black bg-light"
      }`}
    >
      <Row>
        {/* Contact Section */}
        <Col md={6} lg={6} sm={12}>
          <h6
            className={`border-bottom pb-3 ${
              theme ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            {lang === "ar" ? "التواصل" : "Contact"}
          </h6>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
              />
            </Form.Group>
          </Form>
          {/* <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckIndeterminate"
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckIndeterminate"
            >
              Email me with news and offers
            </label>
          </div> */}
          {/* Delivery Section */}
          <h6
            className={` border-bottom mt-4 pb-3 ${
              theme ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            {lang === "ar" ? "التوصيل" : "Delivery"}
          </h6>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formAddress1">
                <Form.Label>
                  {" "}
                  {lang === "ar" ? "العنوان 1" : "Address 1"}
                </Form.Label>
                <Form.Control
                  type="text"
                  required={!address}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Address 2 */}
              <Form.Group className="mb-3 col-lg-6" controlId="formAddress2">
                <Form.Label>
                  {" "}
                  {lang === "ar" ? "العنوان 2" : "Address 2  "}
                </Form.Label>
                <Form.Control
                  type="text"
                  required={!address}
                  name="addressoptional"
                  value={formData.addressoptional}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  required={!address}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Control
                  name="city"
                  type="text"
                  placeholder="City"
                  required={!address}
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3 ">
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required={!address}
              >
                <option>
                  {" "}
                  {lang === "ar" ? "اختر المدينة" : "Select country"}
                </option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
                {/* Add more country options here */}
              </Form.Select>
            </Form.Group>

            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckIndeterminate"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckIndeterminate"
              >
                Save this information for next time
              </label>
            </div> */}
            {/* Shipping Method Section */}
            <h6
              className={` border-bottom mt-4 pb-3 ${
                theme ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              {lang === "ar" ? "موقع الشحن" : " Shipping Method "}
            </h6>
            <Form.Group className="mt-3">
              <div
                className={`shipping-option p-3 ${
                  shippingMethod === "Amman 4.00 JOD"
                    ? theme
                      ? "bg-slider-black selected"
                      : "bg-dark-primary selected"
                    : ""
                }`}
                // onClick={() => setShippingMethod("Amman 4.00 JOD")}
                onClick={() => handleShippingChange("Amman 4.00 JOD", 4.0)}
              >
                <Form.Check
                  type="radio"
                  id="amman"
                  label={
                    <Row>
                      <Col xs={8} className="text-start">
                        <div> {lang === "ar" ? "عمان" : "Amman"}</div>
                        <div>
                          {" "}
                          {lang === "ar"
                            ? "توصيل خلال 24 ساعة"
                            : "Delivery within 24 hours   "}
                        </div>
                      </Col>
                      <Col xs={4} className="text-end">
                        <div className={` ${theme ? "text-dark-primary" : ""}`}>
                          JOD 4.000
                        </div>
                        {/* <div>FREE</div> */}
                      </Col>
                    </Row>
                  }
                  name="shippingMethod"
                  value="Amman"
                  checked={shippingMethod === "Amman 4.00 JOD"}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div
                className={`shipping-option p-3 ${
                  shippingMethod === "Outside Amman 6.00 JOD"
                    ? theme
                      ? "bg-slider-black selected"
                      : "bg-dark-primary selected"
                    : ""
                }`}
                // onClick={() => setShippingMethod("Outside Amman 6.00 JOD")}
                onClick={() =>
                  handleShippingChange("Outside Amman 6.00 JOD", 6.0)
                }
              >
                <Form.Check
                  type="radio"
                  id="outsideAmman"
                  label={
                    <Row>
                      <Col xs={8} className="text-start">
                        <div>
                          {" "}
                          {lang === "ar" ? "خارج عمان" : "Outside Amman"}
                        </div>
                        <div>
                          {" "}
                          {lang === "ar"
                            ? "توصيل خلال 48 ساعة"
                            : "Delivery within 48 hours  "}
                        </div>
                      </Col>
                      <Col xs={4} className="text-end">
                        <div className={` ${theme ? "text-dark-primary" : ""}`}>
                          JOD 6.000
                        </div>
                        {/* <div>FREE</div> */}
                      </Col>
                    </Row>
                  }
                  name="shippingMethod"
                  value="Outside Amman 6.00 JOD"
                  checked={shippingMethod === "Outside Amman 6.00 JOD"}
                  required
                />
              </div>
            </Form.Group>

            {/* Payment Method Section */}
            <h6
              className={`border-bottom mt-4 pb-3 ${
                theme ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              {lang === "ar" ? "الدفع" : " Payment"}
            </h6>
            <div
              className={` ${
                theme ? "text-dark-primary" : "text-dark-primary"
              }`}
            >
              All transactions are secure and encrypted.
            </div>
            <Form.Group className="mt-3">
              <div
                className={`shipping-option p-3 ${
                  paymentMethod === "Cash on Delivery (COD)"
                    ? theme
                      ? "bg-slider-black selected"
                      : "bg-dark-primary selected"
                    : ""
                }`}
                onClick={() => setPaymentMethod("Cash on Delivery (COD)")}
              >
                <Form.Check
                  type="radio"
                  id="cod"
                  label={
                    <Row>
                      <Col xs={12} className="text-start">
                        <div>
                          {" "}
                          {lang === "ar"
                            ? "كاش عند التوصيل"
                            : "Cash on Delivery (COD)  "}
                        </div>
                      </Col>
                    </Row>
                  }
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "Cash on Delivery (COD)"}
                  onChange={() => setPaymentMethod("Cash on Delivery (COD)")}
                  required
                />
                {paymentMethod === "Cash on Delivery (COD)" && (
                  <Row>
                    <Col xs={12} className="text-start">
                      <div>Pay with Cash on Delivery (COD)</div>
                    </Col>
                  </Row>
                )}
              </div>
            </Form.Group>

            <Form.Group>
              <div
                className={`shipping-option p-3 ${
                  paymentMethod === "wallet"
                    ? theme
                      ? "bg-slider-black selected"
                      : "bg-dark-primary selected"
                    : ""
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <Form.Check
                  type="radio"
                  id="wallet"
                  label={
                    <Row>
                      <Col xs={12} className="text-start">
                        <div> {lang === "ar" ? "المحفظة" : "Wallet"}</div>
                      </Col>
                    </Row>
                  }
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                  required
                />

                {/* {paymentMethod === "wallet" && (
                  <Row>
                    <Col xs={12} className="text-start">
                      <div>cliq alias: HADIYYEH</div>
                    </Col>
                  </Row>
                )} */}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <div
                className={`shipping-option p-3 ${
                  paymentMethod === "Cliq"
                    ? theme
                      ? "bg-slider-black selected"
                      : "bg-dark-primary selected"
                    : ""
                }`}
                onClick={() => setPaymentMethod("cliq")}
              >
                <Form.Check
                  type="radio"
                  id="cliq"
                  label={
                    <Row>
                      <Col xs={12} className="text-start">
                        <div> {lang === "ar" ? "كليك" : "Cliq"}</div>
                      </Col>
                    </Row>
                  }
                  name="paymentMethod"
                  value="Cliq"
                  checked={paymentMethod === "cliq"}
                  onChange={() => setPaymentMethod("cliq")}
                  required
                />

                {paymentMethod === "cliq" && (
                  <Row>
                    <Col xs={12} className="text-start">
                      <div>cliq alias: HADIYYEH</div>
                      <p>
                        {lang === "ar"
                          ? "الرجاء اكمال خطوات الدفع عن طريق الواتساب  لاعتماد الطلب"
                          : "Please complete the payment steps via WhatsApp to confirm the order."}
                      </p>
                    </Col>
                  </Row>
                )}
              </div>
            </Form.Group>
            <small>
              {lang === "ar"
                ? "في حال كنت تريد الغاء الطلب التواصل عن طريق الواتساب في حد اقصى 24 ساعة"
                : "If you want to cancel the order, please contact us via WhatsApp within a maximum of 24 hours."}
            </small>
            {/* Billing Address Section */}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`${
                theme ? "bg-dark-primary text-black" : "bg-light-primary"
              } m-auto d-block mt-4 w-100 `}
              disabled={loading}
              style={{ border: 0 }}
              onSubmit={handleSubmit}
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
              ) : lang === "ar" ? (
                "اكمال الطلب"
              ) : (
                "Complete Order"
              )}
            </Button>
          </Form>
          {errorMessage && (
            <p style={{ color: "blue", textAlign: "center", marginTop: "2vh" }}>
              {errorMessage}
            </p>
          )}
        </Col>

        <Col md={6} lg={6} sm={12}>
          {/* Product to card Section */}
          <ul className="list-group mt-4">
            <ProductInCheak
              products={cart}
              totalPrice={totalPrice}
              shippingMethod={shippingMethod}
              finalTotalPrice={finalTotalPrice}
              setFinalTotalPrice={setFinalTotalPrice}
              theme={theme}
            />
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default CheakOut;
