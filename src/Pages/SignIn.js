import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";

//icons
import { MdOutlineAlternateEmail } from "react-icons/md";
import { VscKey } from "react-icons/vsc";
import axios from "axios";

const SignIn = () => {
  //   const [loading, setLoading] = useState(false);
  const [theme] = useThemeHook();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.currentTarget;

    if (!email.value || !password.value) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/login/post`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );

      if (response.data.Status === "Login Succses") {
        // Ensure the status matches
        // Navigate to account page after successful login
        localStorage.setItem("account", JSON.stringify(response.data.user));
        navigate(`/${lang}`);
      } else {
        setErrorMessage(response.data.Error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <Container className="py-5 overflow-hidden "style={{width:"100%"}}>
      <Row className="justify-content-center mt-5">
        <Col
          xs={12}
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
            {lang === "ar" ? "تسجيل دخول" : "Sign in"}{" "}
          </h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <MdOutlineAlternateEmail size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="email"
                type="email"
                placeholder={lang === "ar" ? "البريد الالكتروني" : "Email"}
                required
              />{" "}
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <VscKey size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="password"
                type="password"
                placeholder={lang === "ar" ? "كلمة السر" : "Password"}
                required
              />{" "}
            </InputGroup>
            {errorMessage && (
              <div
                className="error-message"
                style={{
                  color: "red",
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
              {lang === "ar" ? "تسجيل دخول" : "Sign in"}
              {/* )} */}
            </Button>
            <Form.Group className="mt-3 text-center">
              <Link
                to={`/${lang}/forgetpassword`}
                className={`text-center border-bottom pb-3 ${
                  theme ? "text-dark-primary" : "text-light-primary"
                }`}
              >
                {lang === "ar" ? "نسيت كلمة السر ؟" : "Forget Password ?"}
              </Link>
              <Row className="py-2 border-bottom mb-3" />
              <Link
                to={`/${lang}/register`}
                className={`btn btn-info rounded-0  ${
                  theme ? "text-dark-primary" : "text-light-primary"
                }`}
              >
                {lang === "ar" ? " تسجيل حساب" : "Create account"}{" "}
              </Link>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
