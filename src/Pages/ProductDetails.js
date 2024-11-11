import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import "react-lightbox-component/build/css/index.css";
import "./product-details.css";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { LuShare2 } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import YouMayAlsoLike from "./YouMayAlsoLike";
import RightCart from "../components/RightCart";
import AddToCartBtn from "../components/AddToCartBtn";
import FeedbackForm from "../components/FeedbackForm";

const ProductDetails = ({cartItems}) => {
  const [theme] = useThemeHook();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const API_URL = process.env.REACT_APP_API_URL;
  const REACT_APP_URL_WEBSITE = process.env.REACT_APP_URL_WEBSITE;
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [largeImage, setLargeImage] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [after_price, setafter_price] = useState(null);
  const [before_price, setbefore_price] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const toggleCanvas = () => {
    setCanvasOpen(!isCanvasOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);
  const { product, images, variants } = productData;
  // Use effect to set initial images state if available
  useEffect(() => {
    if (productData) {
      const { images, variants } = productData;

      if (images && images.length > 0) {
        setLargeImage(images[0]);
        setActiveImage(images[0]);
      }

      if (variants && variants.length > 0) {
        const firstVariant = variants[0];
        if (firstVariant.prices) {
          setAvailableColors(firstVariant.prices);
          setafter_price(firstVariant.prices[0]?.after_price || "");
          setbefore_price(firstVariant.prices[0]?.before_price || "");
          setSelectedColor(firstVariant.prices[0]?.color || null);
        } else {
          setafter_price(firstVariant.after_price || "");
          setbefore_price(firstVariant.before_price || "");
        }
      }
    }
  }, [productData]);
  // const handleCheckout = () => {
  //   navigate(`/${lang}/cheakOut`);
  // };
  if (loading) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }} // Full viewport height for vertical centering
      >
        <div className="spinner-border text-dark" role="status">
        </div>
      </div>
    );
  }
  
  // Check if productData is not null
  if (!productData) {
    return <div>No product data available.</div>;
  }
  // Handle quantity increase and decrease
  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(prev => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSizeButtonClick = (size) => {
    const selectedVariant = productData.variants.find(v => v.size === size);
    if (selectedVariant) {
      setAvailableColors(selectedVariant.prices);
      setafter_price(selectedVariant.prices[0]?.after_price || "");
      setbefore_price(selectedVariant.prices[0]?.before_price || "");
      setSelectedSize(size);
    }
  };

  const handleColorButtonClick = (color) => {
    const selectedVariant = availableColors.find(p => p.color === color);
    if (selectedVariant) {
      setafter_price(selectedVariant.after_price);
      setbefore_price(selectedVariant.before_price);
      setSelectedColor(color);
    }
  };
  const shareProduct = (product) => {
    const shareMessage = `Check out this product: ${product.name} \n ${REACT_APP_URL_WEBSITE}/product-details/${product.id}`;
    const mailtoLink = `mailto:?subject=Check out this product!&body=${encodeURIComponent(
      shareMessage
    )}`;
    window.open(mailtoLink, "_self");
  };
  return (
    <Container className="py-5 overflow-hidden">
      <Row className=" mt-5 justify-content-center">
        <Col xs={10} md={7} lg={5} className="p-0 image-grid">
          {/* Big Image */}
          <div className="big-image mb-3">
            {largeImage && (
              <img
                src={`${API_URL}/${largeImage}`}
                className="img-fluid"
                alt="Product"

              />
            )}
          </div>
          {/* Small Images */}
          <Row className=" d-flex justify-content-center mb-3">
            {images.map((image, index) => (
              <Col xs={3} lg={3} key={index} className="">
                <img
                  src={`${API_URL}/${image}`}
                  className={`img-fluid small-image ${
                    activeImage === image ? "active" : ""
                  }`}
                  alt={`Small Product ${index + 1}`}
                  onClick={() => {
                    setLargeImage(image);
                    setActiveImage(image);
                  }}
                  loading="lazy"
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          xs={10}
          md={7}
          lg={7}
          className={`${theme ? "text-light" : "text-black"} product-details`}
        >
          <h6 style={{ textAlign: "center", opacity: "0.5" }}>
            {product.brand_name}
          </h6>
          <h1>{product.name}</h1>
          <p>{product.product_type}</p>
          <br />
          <b className={`h4 mt-3 d-block ${theme ? "text-dark-primary" : "text-light-primary"}`}>
            {after_price && (
              <del className="original-price">{before_price} JD</del>
            )}{" "}
            {after_price ? `${after_price} JD` : ''}
          </b>
          <div
            className={`${theme ? "text-dark-primary" : "text-dark-primary"}`}
          >
            Taxes included.
          </div>
          {/* handle the color and sizes */}
          {variants.length > 0  && variants.some(variant => variant.size) ?  (
        <div>
          <div className={`mt-3 ${theme ? "text-dark-primary" : ""}`}>
            Size
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0" }}>
            {variants.map((variant, index) => (
              <Button
                key={index}
                onClick={() => handleSizeButtonClick(variant.size)}
                className={`${
                  selectedSize === variant.size
                    ? "bg-black text-white"
                    : "bg-gray-300 text-black"
                } py-2 m-1`}
                style={{
                  border: 0,
                  width: "80px",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                {variant.size}
              </Button>
            ))}
          </div>

          {selectedSize && availableColors.length > 0 && (
  <div>
  
    <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0" }}>
      
      {availableColors.map((priceData, colorIndex) => 
        priceData.color && (  // Check if priceData.color exists
          <div>
          <Button
            key={colorIndex}
            onClick={() => handleColorButtonClick(priceData.color)}
            className={`${
              after_price === priceData.after_price
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            } py-2 m-1`}
            style={{
              border: 0,
              width: "80px",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            {priceData.color}
          </Button>
          </div>

        )
      )}
    </div>
  </div>
)}

        </div>
      ) : (
        <p></p>
      )}
          <div className={`mt-3 ${theme ? "text-dark-primary" : ""}`}>
            Quantity
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange("decrease")}
            >
              <FiMinus size="1.4rem" />
            </button>
            <span className="m-2">{quantity}</span>{" "}
            {/* Display current quantity */}
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange("increase")}
            >
              <IoMdAdd size="1.4rem" />
            </button>
          </div>{" "}
          <br />
          {product.instock === "yes" ? (
            <div>
              {/* <Button
                onClick={() => {
                  // Ensure you pass the necessary properties to addItem
                  addItem({
                    id: product.id,
                    title: product.name,
                    quantity:quantity,
                    price: after_price,
                    color: selectedColor,
                    size: selectedSize,
                    first_image: `${API_URL}/${largeImage}`,
                  });
                     setCanvasOpen(!isCanvasOpen);
                      }}
                className={`${
                  theme
                    ? "bg-dark-primary text-black"
                    : "bg-light-primary text-light"
                } py-2 m-1`}
                style={{ border: 0 }}
              >
                <BsCartPlus size="1.8rem" />
                Add to cart
              </Button> */}
               <AddToCartBtn
        productID={product.id}
        title={product.name}
        quantity={quantity}
        price={after_price}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        first_image= {`${API_URL}/${largeImage}`}
        addItem={addItem}
      />
              {/* <Button
                type="submit"
                onClick={handleCheckout}
                className={`${
                  theme
                    ? "bg-dark-primary text-black"
                    : "bg-light-primary text-light"
                }  py-2 m-1`}
                style={{ border: 0 }}
              >
                <BsCartCheck size="1.7rem" />
                Buy it now
              </Button> */}
            </div>
          ) : (
            <Button
              disabled
              className={`${
                theme
                  ? "bg-dark-primary text-black"
                  : "bg-light-primary text-light"
              } py-2 m-1`}
              style={{ borderRadius:"20px",width:"45%" }}
              >
              <BsCartPlus size="1.8rem" />
              Sold Out{" "}
            </Button>
          )}
          <p className="mt-3" style={{ opacity: "0.8", lineHeight: "2" }}>
            {product.description}
          </p>
          <div className={`mt-5  ${theme ? "text-light" : "text-black"}`}>
            <span className="ms-1">
              <LuShare2 size="1.2rem" />
            </span>
            <Link
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor behavior
                shareProduct(product); // Call the share function
              }}
              className={` ${theme ? "text-light" : "text-black"}`}
              style={{ textDecoration: "none" }}
            >
              Share
            </Link>
          </div>
        </Col>
      </Row>
      <YouMayAlsoLike main_product_type={product.main_product_type} />
      <RightCart
        cartItems={cartItems}
        isCanvasOpen={isCanvasOpen}
        toggleCanvas={toggleCanvas}
      />
      <FeedbackForm />
    </Container>
  );
};

export default ProductDetails;
