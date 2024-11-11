import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { FaBalanceScale } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import axios from "axios";
function Gift() {
  const [theme] = useThemeHook();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);
  const handleChargeBalance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/wallet/chargebalance`, {
        userId: userId,
        amount: amount,
        paymentMethod: paymentMethod,
      });
      // Check for successful response
      if (response.status === 200) {
        setErrorMessage(response.data.message);
        setAmount("")
        setPaymentMethod("")
      } else {
        setErrorMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "An unexpected error occurred."
        );
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };
  return (
    <Container>
      {!userId ? <p className="mt-5 text-center"> Please Login to use this service</p> :  <Row className="justify-content-center mt-5">
        <Col
          xs={11}
          sm={10}
          md={8}
          lg={4}
          className={`p-4 rounded ${
            theme ? "text-light bg-dark" : "text-black bg-light"
          }`}
        >
          <h1
            className={`text-center border-bottom pb-3 ${
              theme ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            {lang === "ar" ? "شحن المحفظة" : "Charge Wallet"}{" "}
          </h1>
          <Form onSubmit={handleChargeBalance}>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <FaBalanceScale size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="amount"
                type="number"
                placeholder={lang === "ar" ? "الرصيد" : "Amount"}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />{" "}
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <MdOutlinePayment size="1.8rem" />
              </InputGroup.Text>
              <Form.Select required value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="">
                  {lang === "ar" ? "طريقة الدفع" : "Payment Method"}
                </option>
                <option value="cliq">Cliq</option>
                {/* <option value="credit card">Credit Card</option> */}
              </Form.Select>
            </InputGroup>
            {errorMessage && (
              <div
                className="error-message"
                style={{
                  color: "blue",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "2vh",
                }}
              >
                {errorMessage}
              </div>
            )}{" "}
            {/* Display error message */}
            <Button
              type="submit"
              className={`${
                theme ? "bg-dark-primary text-black" : "bg-light-primary"
              } m-auto d-block`}
              //   disabled={loading}
              style={{ border: 0 }}
            >
              {/* {loading ? (
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
            ) : ( */}
              {lang === "ar" ? "اشحن" : "Submit"}
              {/* )} */}
            </Button>
          </Form>
        </Col>
      </Row>}
    
  
    </Container>
  );
}

export default Gift;
