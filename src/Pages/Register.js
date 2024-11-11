import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import "react-phone-input-2/lib/high-res.css";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
const Register = () => {
//   const [loading, setLoading] = useState(false);
  const [theme] = useThemeHook();
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const lang = location.pathname.split("/")[1] || "en";
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const password = form.password.value;
    const firstname = form.firstName.value;
    const lastname = form.lastName.value;
    const email = form.email.value;

    if (password && firstname && lastname && email) {
    //   setLoading(true);
      try {
        const response = await axios.post(
          `${API_URL}/auth/signup/post`,
          {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set to application/json
            },
          }
        );
        navigate(`/${lang}`);
      } catch (error) {
        console.log(`Error fetching post data ${error}`);
      }
    }
  };
  return (
    <Container className="py-5 mt-5">
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
           {lang === "ar" ? " تسجيل حساب" : " Create Account "}
          </h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label> {lang === "ar" ? " الاسم الاول" : "First name"}</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder={lang === "ar" ? " الاسم الاول" : "First name"}
                  required
                  o
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label> {lang === "ar" ? " الاسم الاخير" : "Last name"}</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder={lang === "ar" ? " الاسم الاخير" : "Last name"}
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>            {lang === "ar" ? "البريد الالكتروني" : "Email"}
              </Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder=            {lang === "ar" ? "البريد الالكتروني" : "Email"}

                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>            {lang === "ar" ? "كلمة السر" : "Password"}
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder=            {lang === "ar" ? "كلمة السر" : "Password"}

                minLength={6}
                required
              />
            </Form.Group>
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
                         {lang === "ar" ? "تسجيل حساب" : "  Sign Up  "}

              {/* )} */}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
