// BrandsData.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const BrandsData = () => {
  const [certificate, setcertificate] = useState([]);

  useEffect(() => {
    const fetchcertificates = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios(`${API_URL}/certificate/get/certificates`);
        setcertificate(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    
    fetchcertificates();
  }, []);

  return { certificate };
};

export default BrandsData;
