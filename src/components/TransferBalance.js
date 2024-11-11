import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import Heading from "../components/Heading";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";

function TransferBalance() {
  const [theme] = useThemeHook();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const handleTransferBalance = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("account"));
if(amount < 0){
    setErrorMessage("Amount should be positive value")
    return;
}
    try {
        const response = await axios.post(
            `${API_URL}/wallet/transferbalance`,
            {
                fromUserId: storedUser.id,
                toEmail: email,
                amount: amount,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            setErrorMessage(response.data.message);
            setEmail("")
            setAmount("")
        } else {
            setErrorMessage(response.data.message);
        }
    } catch (error) {
        console.error("Transfer error:", error);
        if (error.response) {
            const { message } = error.response.data;
            setErrorMessage(message || "Something went wrong. Please try again later.");
        } else {
            setErrorMessage("Network error. Please check your connection.");
        }
    }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "40vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Heading heading="Transfer Balance" size="h3" />
        <Form onSubmit={handleTransferBalance}> 
          <InputGroup>
            <InputGroup.Text>
            <MdOutlineAlternateEmail size="1.8rem" />
            </InputGroup.Text>
            <Form.Control
              name="email"
              type="text"
              placeholder={lang === "ar" ? "البريد الالكتروني" : "Email"}
              required
                onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mt-3" >
            <InputGroup.Text>
            <FaBalanceScale size="1.8rem" />
            </InputGroup.Text>
            <Form.Control
              name="amount"
              type="number"
              placeholder={lang === "ar" ? "الرصيد" : "Amount"}
              required
                onChange={(e) => setAmount(e.target.value)}
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
              theme ? "bg-dark-primary text-black" : "bg-light-primary"
            } m-auto mt-3 d-block`}
            style={{ border: 0 }}
          >
            {lang === "ar" ? "تحويل" : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default TransferBalance;
