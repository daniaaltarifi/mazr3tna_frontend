import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useLocation } from "react-router-dom";
const ForgetPassword = () => {
  const [theme] = useThemeHook();
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/changepassword/forgotpassword`, { email });
      setMessage("Reset link sent to your email");
    } catch (error) {
      setMessage(error.response.data.Error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mt-5">
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
            {lang === "ar" ? "نسيت كلمة السر" : "Forget Password"}{" "}
          </h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <MdOutlineAlternateEmail size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="email"
                type="email"
                placeholder={lang === "ar" ? "البريد الالكتروني:" : "Email:"}
                required
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
            </InputGroup>

            {Message && (
              <p
                style={{ color: "green", fontSize: "14px", marginTop: "13px" }}
              >
                {Message}
              </p>
            )}

            {/* Display error message */}
            <Button
              type="submit"
              className={`${
                theme ? "bg-dark-primary text-black" : "bg-light-primary"
              } m-auto d-block`}
              //   disabled={loading}
              value="Submit"
              style={{ border: 0 }}
            >
              {lang === "ar" ? "ارسال" : "Submit"}{" "}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ForgetPassword;
