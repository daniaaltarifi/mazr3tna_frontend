// // src/hooks/FetchCartData.js
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useCart } from "react-use-cart";
// const API_URL = process.env.REACT_APP_API_URL;

// const FetchCartData = () => {
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const {
//     items,
//   } = useCart();

//   useEffect(() => {
//     const fetchData = async () => {
//       const storedUser = JSON.parse(localStorage.getItem("account"));

//       if (storedUser) {
//         setUser(storedUser.id);

//         try {
//           const cartResponse = await axios.get(
//             `${API_URL}/cart/getcart/${storedUser.id}`
//           );
//           setCart(cartResponse.data);
//         } catch (error) {
//           setError(error);
//           console.error("Error fetching data:", error);
//         }
//       } else {
//         setCart(items); // Or set to default items if needed
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [cart,items]);

//   return { user, cart, loading, error, setCart };
// };

// export default FetchCartData;
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";

const API_URL = process.env.REACT_APP_API_URL;

const FetchCartData = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("account"));

      if (storedUser) {
        setUser(storedUser.id);

        try {
          const cartResponse = await axios.get(
            `${API_URL}/cart/getcart/${storedUser.id}`
          );
          setCart(cartResponse.data); // Set the cart with the fetched data from API
        } catch (error) {
          setError(error);
          console.error("Error fetching data:", error);
        }
      } else {
        setCart(items); // If no user is logged in, fallback to useCart's state
      }

      setLoading(false); // Stop loading after fetch completes
    };

    fetchData();
  }, [items]); // Run only once when the component mounts, no need to depend on cart or items

  return { user, cart, loading, error, setCart };
};

export default FetchCartData;
