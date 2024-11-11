import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/cardes.css";
import axios from "axios";
import { Image } from "react-bootstrap"; // Import necessary components
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Link } from "react-router-dom";
const settings = {
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
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
        // infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        // infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
};

const Cardes = () => {
  const [theme] = useThemeHook();
  const API_URL = process.env.REACT_APP_API_URL;
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    const getLatestProduct = async () => {
      const res = await axios.get(`${API_URL}/product/get/latestproducts`);
      setLatestProduct(res.data);
    };
    getLatestProduct();
  }, []);
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
        <h3
          className={
            theme
              ? "text-light we_help_you_home m-5"
              : "text-black we_help_you_home m-5"
          }
        >
          LATEST ARRIVALS
        </h3>

        <div className="row mt-5">
          <Slider
            {...settings}
            style={{ overflow: "hidden" }}
            className="slide"
          >
            {latestProduct.map((product) => (
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
                      className="slider_img_home Card-image"
                      alt="Latest Product"
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
                    {product.after_price} JD
                    <del className="original-price">
                      {" "}
                      ${product.before_price} JD
                    </del>
                  </p>
                  {product.instock === "yes" ? (
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className={
                          theme
                            ? "text-light btn btn-card"
                            : "text-black btn btn-card"
                        }
                      >
                        Choose Option
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        disabled
                        className={
                          theme
                            ? "text-light btn btn-card"
                            : "text-black btn btn-card"
                        }
                      >
                        Out of Stock
                      </button>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
export default Cardes;
