// src/hooks/FetchCartData.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";
const API_URL = process.env.REACT_APP_API_URL;

const FetchCartData = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    items,
  } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("account"));

      if (storedUser) {
        setUser(storedUser.id);

        try {
          const cartResponse = await axios.get(
            `${API_URL}/cart/getcart/${storedUser.id}`
          );
          setCart(cartResponse.data);
        } catch (error) {
          setError(error);
          console.error("Error fetching data:", error);
        }
      } else {
        setCart(items); // Or set to default items if needed
      }

      setLoading(false);
    };

    fetchData();
  }, [cart,items]);

  return { user, cart, loading, error, setCart };
};

export default FetchCartData;
