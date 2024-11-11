import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { VscKey } from "react-icons/vsc";
const ResetPassword = () => {
  const [theme] = useThemeHook();
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");
  const [Message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newConfirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${API_URL}/changepassword/resetpassword/${token}`, {
        token,
        newPassword,
      });
      setMessage("Password reset successfully");
      setTimeout(() => {
        navigate(`/${lang}/sign-in`);
      }, 2000);
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
            {lang === "ar" ? "اعادة تعيين كلمة السر" : "Reset Paswword   "}
          </h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <VscKey size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="newPassword"
                type="password"
                placeholder={lang === "ar" ? "كلمة السر" : "Password"}
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />{" "}
            </InputGroup>
            <InputGroup className="mb-4 mt-5">
              <InputGroup.Text>
                <VscKey size="1.8rem" />
              </InputGroup.Text>
              <Form.Control
                name="newconfirmPassword"
                type="password"
                placeholder={
                  lang === "ar" ? " تأكيد كلمة السر" : "Confirm Password"
                }
                required
                onChange={(e) => setNewConfirmPassword(e.target.value)}
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
              {lang === "ar" ? "اعادة تعيين كلمة السر" : "Reset Password"}{" "}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ResetPassword;
