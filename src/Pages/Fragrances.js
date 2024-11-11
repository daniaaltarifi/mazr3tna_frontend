import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/cardes.css";
import { Image } from "react-bootstrap"; // Import necessary components
import { Link } from "react-router-dom";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";

const settings = {
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: false,
  dots: true, // Remove dots
  centerMode: false, // Disable center mode to avoid spacing issues
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
};

function Fragrances ({ title, apiUrl }) {
  const [theme] = useThemeHook();
  const API_URL = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/${apiUrl}`);
        const data = await response.json();
        const last15product=data.slice(-12)
        setProducts(last15product); // Set the products state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [apiUrl]);
  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section full-screen-slider"
          : "bg-light text-black margin_section full-screen-slider"
      }
      // data-aos="fade-up"
    >
      <div className="container-fluid text-center">
        <h1 className={theme ? "text-light  m-5" : "text-black  m-5"}>
          {title}
        </h1>

        <div className="row mt-5">
          <Slider
            {...settings}
            style={{ overflow: "hidden" }}
            className="slide"
          >
            {products.map((product) => (
              <div
                className="col-lg-2 col-md-4 col-sm-12 product-card mb-5"
                key={product.id}
              >
                <Link
                  to={`product-details/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {/* Wrap image and button in a relative container */}
                  <div className="image-container d-flex justify-content-center">
                    <Image
                      src={`${API_URL}/${product.first_image}`}
                      className="slider_img_home fargrances-image "
                      alt={product.name}
                      loading="lazy"

                    />
                    {/* Button placed on top of the image, aligned left */}
                    {product.sale === "yes" && (
                      <button
                        className={
                          theme
                            ? "text-light btn-top-left"
                            : "text-black btn-top-left"
                        }
                      >
                        Sale
                      </button>
                    )}
                  </div>

                  {/* Title and price section */}
                  <h5 className={theme ? "text-light " : "text-black"}>
                    {product.name}
                  </h5>
                  <p className={theme ? "text-light" : "text-black"}>
                    ${product.after_price}
                    <del className="original-price">
                      {" "}
                      ${product.before_price}
                    </del>
                  </p>
                  <div className="d-flex justify-content-center">
                    {product.instock === "yes" ? (
                      <button
                        // onClick={() => {
                        //   // Ensure you pass the necessary properties to addItem
                        //   addItem({
                        //     id: product.id,
                        //     title: product.name,
                        //     price: product.after_price,
                        //     size: product.size,
                        //     first_image: `${API_URL}/${product.first_image}`, // Add image to cart item
                        //   });
                        //   navigate("/cart"); // Navigate to the cart page after adding the item
                        // }}
                        type="button"
                        className={
                          theme
                            ? "text-light btn btn-card m-3"
                            : "text-black btn btn-card m-3"
                        }
                      >
                        Choose Option{" "}
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className={
                          theme
                            ? "text-light btn btn-card m-3"
                            : "text-black btn btn-card m-3"
                        }
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        {/* <button
          onClick={() => navigate(navigateTo)}
          type="button"
          className={
            theme
              ? "text-light btn btn-card m-5"
              : "text-black btn btn-card m-5"
          }
        >
          View all
        </button> */}
      </div>
    </section>
  );
}
export default Fragrances;
