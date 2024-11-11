import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Image,
  Form,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import FetchUserById from "../components/FetchUserById";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import Heading from "../components/Heading";
import profilePix from "../images/profile-picture.png";
import { FaClipboardList, FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import "./my-account.css";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Address from "../components/Address";
import { MdOutlineQrCode } from "react-icons/md";
import TransferBalance from "../components/TransferBalance";
const MyAccount = () => {
  const [theme] = useThemeHook();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const lang = location.pathname.split("/")[1] || "en";
  const {fetchUser}=FetchUserById(API_URL)
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderItem, setOrderItem] = useState([]);
  useEffect(()=>{
const fetchOrdeItems= async ()=>{
  try {
    const response = await axios.get(`${API_URL}/orders/getorderbyid/${storedUser.id}` )
    if (response.data) {
      setOrderItem(response.data);
    } else {
      console.log("Get orders by id error:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    
  }
}
fetchOrdeItems()
  },[])
  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data.Status === "Logout Success") {
        navigate(`/${lang}/sign-in`);
        localStorage.removeItem("account");
        window.location.reload()
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [API_URL, lang, navigate]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const { formData, address, loading, handleChange, handleSubmit, message } =
    Address(storedUser?.id);
  if (!fetchUser) {
    return <p>No user data available. Please log in.</p>;
  }

const handleVerifyCode = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post(
          `${API_URL}/wallet/redeemcode`,
          { userId: storedUser.id, code: code }
      );
      if (response.status === 200) {
          setErrorMessage(response.data.message); // Clear previous error messages
       setCode("")
      } else {
          setErrorMessage(response.data.message); // Show error message based on server response
      }
  } catch (error) {
      console.error("Verify code error:", error);
      if (error.response) {
          setErrorMessage(error.response.data.message || "An error occurred while verifying the code. Please try again.");
      } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
      }
  }
};


  return (
    <Container className="py-5 overflow-hidden">
      <Heading heading="My Account" />
      <Tab.Container defaultActiveKey="my-orders">
        <Row className="justify-content-evenly mt-4 p-1">
        {fetchUser.length === 0 ? ( // Check if fetchUser array is empty
    <p>You are not logged in. Please log in to view your account.</p>
) : (
    fetchUser.map((user) => (
      <>
          <Col
            sm={3}
            className={`${
              theme ? "text-light bg-dark" : "text-black bg-light"
            } p-2 rounded h-100 mb-3 user-menu`}
          >
            <Row className="mb-3 py-2">
              <Col xs={3} className="pe-0">
                <Image
                  src={profilePix}
                  thumbnail
                  fluid
                  roundedCircle
                  className="p-0"
                />
              </Col>
              <Col xs={9} className="pt-1">
                <span>Hello,</span>
                <h4>{user.first_name}</h4>
              </Col>
            </Row>
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="mb-3">
                <Nav.Link eventKey="my-orders">
                  My Orders <FaClipboardList size="1.4rem" />
                </Nav.Link>
                <Nav.Link eventKey="account-details">
                  Account Details <FaUser size="1.4rem" />
                </Nav.Link>
                <Nav.Link eventKey="address">
                  Address <IoLocationSharp size="1.4rem" />
                </Nav.Link>
                <Nav.Link eventKey="wallet-code">
                   Wallet Code <FaWallet  size="1.4rem" />
                </Nav.Link>
                <Nav.Link eventKey="transfer-balance">
                send balance as a gift <FaGift  size="1.4rem" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col
            sm={8}
            className={`${
              theme ? "text-light bg-dark" : "text-black bg-light"
            } p-2 rounded`}
          >
            <Tab.Content>
              <Tab.Pane eventKey="my-orders">
                <Heading heading="My Orders" size="h3" />
                {orderItem.map(order => (
  <div key={order.id}>
    {order.items.map(item => (
      <OrderCard
        key={item.id} // Add a unique key for each item
        orderId={item.id}
        created_at={order.created_at}
        title={item.product_name}
        img={`${API_URL}/${item.product_image}`}
        quantity={item.quantity}
        price={item.price}
        
      />
    ))}
  </div>
))}
              </Tab.Pane>
              <Tab.Pane eventKey="account-details">
                <Heading heading="Account details" size="h3" />
             
        <div key={user.id} className="cont_acc_details">
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>Balance: {user.balance}</p>
            <Link onClick={handleLogout}>Log Out</Link>
        </div>
              </Tab.Pane>
              <Tab.Pane eventKey="transfer-balance" >
         <TransferBalance/>
              </Tab.Pane>
              <Tab.Pane eventKey="address">
                <Heading heading="Address" size="h3" />
                <Form onSubmit={handleSubmit}>
                  {/* Address 1 */}
                  <Form.Group className="mb-3" controlId="formAddress1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      type="text"
                      required={!address}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Address 2 */}
                  <Form.Group className="mb-3" controlId="formAddress2">
                    <Form.Label>Address 2 (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      required={!address}
                      name="addressoptional"
                      value={formData.addressoptional}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* City */}
                  <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      required={!address}
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Country/Region */}
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Country/Region</Form.Label>
                    <Form.Select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required={!address}
                    >
                      <option value="">
                        {formData.country || "Select Country"}
                      </option>
                      <option value="USA">Amman</option>
                      <option value="Canada">Zarqa</option>
                      <option value="UK">Madaba</option>
                      <option value="UK">Jerash</option>
                      <option value="UK">Aqaba</option>
                      {/* Add more country options as needed */}
                    </Form.Select>
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className={`${
                      theme ? "bg-dark-primary text-black" : "bg-light-primary"
                    } m-auto d-block`}
                    disabled={loading}
                    style={{ border: 0 }}
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
                    ) : address ? (
                      "Update Address"
                    ) : (
                      "Add Address"
                    )}
                  </Button>
                  <p style={{ color: "green" }}>{message}</p>
                </Form>
              </Tab.Pane>
              
              <Tab.Pane
                eventKey="wallet-code"
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "40vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Heading heading="Wallet Code" size="h3" />
                  <Form onSubmit={handleVerifyCode}>
                    <InputGroup>
                      <InputGroup.Text>
                        <MdOutlineQrCode size="1.8rem" />
                      </InputGroup.Text>
                      <Form.Control
                        name="amount"
                        type="text"
                        placeholder={lang === "ar" ? "الكود" : "Code"}
                        required
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </InputGroup>

                    {errorMessage && (
                      <div
                        className="error-message"
                        style={{
                          color: "blue",
                          fontSize: "14px",
                          textAlign: "center",
                          marginTop: "2vh",
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className={`${
                        theme
                          ? "bg-dark-primary text-black"
                          : "bg-light-primary"
                      } m-auto mt-3 d-block`}
                      style={{ border: 0}}
                    >
                      {lang === "ar" ? "اشحن" : "Submit"}
                    </Button>
                  </Form>
                </div>
              </Tab.Pane>
             
            </Tab.Content>
          </Col>
      </>

              ))
            )}
            
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default MyAccount;
