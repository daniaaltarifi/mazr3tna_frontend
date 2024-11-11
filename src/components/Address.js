// src/Address.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const Address = (userId) => {
  const [formData, setFormData] = useState({
    address: "",
    addressoptional: "",
    city: "",
    country: "",
    phone: "",
  });
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchUserAddress = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `${API_URL}/address/getaddress/${userId}`
        );
        const addressData = response.data.length > 0 ? response.data[0] : null;
        setAddress(addressData);
        if (addressData) {
          setFormData({
            address: addressData.address,
            addressoptional: addressData.addressoptional,
            city: addressData.city,
            country: addressData.country,
            phone: addressData.phone,
          });
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchUserAddress();
  }, [fetchUserAddress, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (address) {
        await axios.put(`${API_URL}/address/update/${address.id}`, {
          ...formData,
          user_id: userId,
        });
        setMessage("Address updated successfully!");
      } else {
        await axios.post(`${API_URL}/address/add`, {
          ...formData,
          user_id: userId,
        });
        setMessage("Address added successfully");
      }
      fetchUserAddress(); // Refresh address
    } catch (error) {
      console.error("Error submitting address:", error);
      setMessage("There was an error submitting the address.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    address,
    loading,
    handleChange,
    handleSubmit,
    message,
  };
};

export default Address;
