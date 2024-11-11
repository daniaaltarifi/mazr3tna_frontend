import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../Css/brands.css"; // For custom styling
import { Image } from "react-bootstrap"; // Import Image component from react-bootstrap
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { IoIosArrowRoundForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link,useLocation } from "react-router-dom";
import BrandsData from "../components/BrandsData";
const Brands = () => {
  const [theme] = useThemeHook();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const {brands} = BrandsData();
  const API_URL = process.env.REACT_APP_API_URL;
  const location =useLocation()
  const lang = location.pathname.split("/")[1] || "en";
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992); // Large screens > 992px
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Settings for React Slick
  const sliderSettings = {
    speed: 300,
    slidesToShow: 2, // Adjust for small screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true, // Remove dots
    centerMode: false,
    responsive: [
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 576, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div
      className={
        theme
          ? "bg-light-black text-light container-Brands"
          : "bg-light text-black container-Brands"
      }
    >
      <h3
        className={
          theme ? "text-light Title-Brands m-5" : "text-black Title-Brands m-5"
        }
      >
         {lang === 'ar' ? "الماركات التي تفضلها": "BRANDS YOU LOVE!"}
      </h3>

      {/* Render different layouts based on screen size */}
      {isLargeScreen ? (
        <div className="row m-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-2 text-center brand-image-container "
            >
              <Link
                to={`productbybrand/${brand.brand_name}`}
                style={{ textDecoration: "none" }}
              >
                <Image
                  src={`${API_URL}/${brand.brand_img}`}
                  alt={brand.brand_name}
                  loading="lazy"
                  className="brand-image img-fluid"  />
                <p
                  className={
                    theme
                      ? "bg-light-black text-light margin_section full-screen-slider"
                      : "bg-light text-black margin_section full-screen-slider" } >
                  {brand.brand_name} <IoIosArrowRoundForward size="1.5rem" />
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {brands.map((brand) => (
            <div key={brand.id} className="text-center brand-image-container ">
              <Link
                to={`productbybrand/${brand.brand_name}`}
                style={{ textDecoration: "none"}}
                className={
                  theme
                    ? "bg-light-black text-light margin_section full-screen-slider"
                    : "bg-light text-black  full-screen-slider" }
              >
                <Image
                  src={`${API_URL}/${brand.brand_img}`}
                  alt={brand.brand_name}
                  className="brand-image img-fluid p-1"
                />
                {brand.brand_name} <IoIosArrowRoundForward size="1.5rem" />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Brands;
