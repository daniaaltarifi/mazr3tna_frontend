// BrandsData.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const BrandsData = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios(`${API_URL}/product/get/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    
    fetchBrands();
  }, []);

  return { brands };
};

export default BrandsData;
