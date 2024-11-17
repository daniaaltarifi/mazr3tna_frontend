import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../Css/brands.css"; 
import { Image } from "react-bootstrap"; 
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { IoIosArrowRoundForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; 

const Abouts = () => {
  const [theme] = useThemeHook();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [abouts, setAbouts] = useState([]); 
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${API_URL}/about/getallaboutposts`);
        setAbouts(response.data); 
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992); 
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const sliderSettings = {
    speed: 300,
    slidesToShow: 2, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true, 
    centerMode: false,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 576, 
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
        {lang === "ar" ? "معلومات عن" : "About Us"}
      </h3>

      
      {isLargeScreen ? (
        <div className="row m-4 justify-content-center">
          {abouts.map((about, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-2 text-center about-image-container">
              <Link
                to={`/about/${about.id}`} 
                                style={{ textDecoration: "none" }}
              >
                <Image
                  src={`${API_URL}/${about.img}`}                   alt={about.title}
                  loading="lazy"
                  className="about-image img-fluid"
                />
                <p
                  className={
                    theme
                      ? "bg-light-black text-light margin_section full-screen-slider"
                      : "bg-light text-black margin_section full-screen-slider"
                  }
                >
                  {about.title} 
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {abouts.map((about) => (
            <div key={about.id} className="text-center about-image-container">
              <Link
                to={`/about/${about.id}`}
                style={{ textDecoration: "none" }}
                className={
                  theme
                    ? "bg-light-black text-light margin_section full-screen-slider"
                    : "bg-light text-black full-screen-slider"
                }
              >
                <Image
                  src={`${API_URL}/${about.img}`} 
                  alt={about.title}
                  className="about-image img-fluid p-1"
                />
                {about.title} <IoIosArrowRoundForward size="1.5rem" />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Abouts;
