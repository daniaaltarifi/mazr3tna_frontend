import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../Css/brands.css"; // For custom styling
import { Image } from "react-bootstrap"; // Import Image component from react-bootstrap
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { IoIosArrowRoundForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLocation } from "react-router-dom";
import BlogsData from "../components/BlogsData";
const Blogs = () => {
  const [theme] = useThemeHook();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const { blogs } = BlogsData();
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
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
          infinite: false,
        },
      },
      {
        breakpoint: 576, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          infinite: false,
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
        {lang === "ar" ? "المدونات" : "Blogs"}
      </h3>

      {/* Render different layouts based on screen size */}
      {isLargeScreen ? (
        <div className="row m-4 justify-content-center">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-2 text-center brand-image-container "
            >
              <Image
                src={`${API_URL}/${blog.img}`}
                alt={blog.title}
                loading="lazy"
                className="brand-image img-fluid"
              />
              <h3
                className={
                  theme
                    ? "bg-light-black text-light margin_section full-screen-slider"
                    : "bg-light text-black margin_section full-screen-slider"
                }
              >
                {blog.title}
              </h3>
              <p
                className={
                  theme
                    ? "bg-light-black text-light margin_section full-screen-slider "
                    : "bg-light text-black margin_section full-screen-slider "
                }
              >
                {blog.description}
              </p>
              {/* </Link> */}
            </div>
          ))}
        </div>
      ) : (
        <Slider {...sliderSettings} style={{ overflow: "hidden" }}>
          {blogs.map((blog) => (
            <div key={blog.id} className="text-center brand-image-container ">
              <Image
                src={`${API_URL}/${blog.img}`}
                alt={blog.title}
                className="brand-image img-fluid p-1"
              />
              <h4>{blog.title}</h4>
              <p className="blog_desc">{blog.description}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Blogs;
