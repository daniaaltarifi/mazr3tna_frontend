// import React, { useEffect, useState } from "react";
// import { BsCartPlus } from "react-icons/bs";
// import { useThemeHook } from "../GlobalComponents/ThemeProvider";
// import RightCart from "./RightCart";
// import FetchCartData from "./FetchCardData";
// const AddToCartBtn = ({
//   productID,
//   price,
//   quantity,
//   title,
//   selectedWeight,
//   selectedSize,
//   first_image,
//   addItem,
// }) => {
//   const [theme] = useThemeHook();
//   const [user, setuser] = useState({});
//   const API_URL = process.env.REACT_APP_API_URL;
//   const [isCanvasOpen, setCanvasOpen] = useState(false);
//   const [productData, setProductData] = useState(null);
//   const { cart } = FetchCartData(); // Use the custom hook

//   const toggleCanvas = () => {
//     setCanvasOpen(!isCanvasOpen);
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("account"));
//     if (storedUser) {
//       setuser(storedUser);
//     }
//   }, []);
  
//   const handleClick = async () => {
//     // Check if user is logged in
//     if (user && user.id) {
//       const newProductData = {
//         id: productID,
//         productID: productID,
//         user_id: user.id,
//         title: title,
//         quantity: quantity,
//         price: price,
//         weight: selectedWeight,
//         size: selectedSize,
//         first_image: first_image,
//       };
//       try {
//         const response = await fetch(`${API_URL}/cart/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newProductData),
//         });

//         const data = await response.json();
//         setProductData(newProductData); // Set the productData here
//         setCanvasOpen(true);
//         console.log("Product added to database:", data);
//       } catch (error) {
//         console.error("Error adding product:", error);
//       }
//     } else {
//       // User is not logged in, add item only to local cart
//       const newProductData = {
//         id: productID,
//         title: title,
//         quantity: quantity,
//         price: price,
//         weight: selectedWeight,
//         size: selectedSize,
//         first_image: first_image,
//       };
//       addItem(newProductData);
//       setProductData(newProductData); // Set the productData here
//       setCanvasOpen(true);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         className={`${
//           theme ? "bg-dark-primary text-black" : " text-light"
//         } py-2 m-1 `}
//         style={{ borderRadius:"20px",width:"45%",backgroundColor:"#6A994E" }}
//       >
//         <BsCartPlus size="1.8rem" style={{paddingRight:"5px"}}/>
//         Add to cart
//       </button>
//       <RightCart
//         isCanvasOpen={isCanvasOpen}
//         toggleCanvas={toggleCanvas}
//         cart={cart}
//         user={user}
//       />
//     </>
//   );
// };

// export default AddToCartBtn;
import React, { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import RightCart from "./RightCart";
import FetchCartData from "./FetchCardData";
const AddToCartBtn = ({
  productID,
  price,
  quantity,
  title,
  selectedWeight,
  selectedSize,
  first_image,
  addItem,
}) => {
  const [theme] = useThemeHook();
  const [user, setUser] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const [productData, setProductData] = useState(null);
  const { cart, setCart } = FetchCartData(); // Get cart data from FetchCartData

  const toggleCanvas = () => {
    setCanvasOpen(!isCanvasOpen);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("account"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleClick = async () => {
    // Check if user is logged in
    const newProductData = {
      id: productID,
      productID: productID,
      user_id: user.id,
      title: title,
      quantity: quantity,
      price: price,
      weight: selectedWeight,
      size: selectedSize,
      first_image: first_image,
    };

    if (user && user.id) {
      try {
        const response = await fetch(`${API_URL}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProductData),
        });

        const data = await response.json();
        setProductData(newProductData);
        setCanvasOpen(true);

        // If successful, update the cart state immediately
        setCart((prevCart) => [...prevCart, newProductData]); // Update cart in state
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      // User is not logged in, add item to local cart using useCart's addItem
      addItem(newProductData);
      setProductData(newProductData); // Set the productData here
      setCanvasOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          theme ? "bg-dark-primary text-black" : " text-light"
        } py-2 m-1 `}
        style={{ borderRadius: "20px", width: "45%", backgroundColor: "#6A994E" }}
      >
        <BsCartPlus size="1.8rem" style={{ paddingRight: "5px" }} />
        Add to cart
      </button>
      <RightCart
        isCanvasOpen={isCanvasOpen}
        toggleCanvas={toggleCanvas}
        cart={cart}
        user={user}
      />
    </>
  );
};

export default AddToCartBtn;
