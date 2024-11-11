import React, { useEffect, useState } from "react";
import { Carousel, Image, Container, Row, Col } from "react-bootstrap"; // Import necessary components
import "../Css/homee.css";
import Cardes from "./Cardes";
import Fragrances from "./Fragrances";
import Brands from "./Brandes";
import Opinions from "./Opinions";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import axios from "axios";
const Home = () => {
  const [theme] = useThemeHook();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSlider = async () => {
      try {
        const response = await axios.get(`${API_URL}/slider/`);
        setSlider(response.data);
      } catch (error) {
        console.error("Error fetching slider:", error);
      }
    };
    fetchSlider();
  }, []);

  return (
    <div>
      <Carousel interval={2000} className="responsive-carousel">
        {slider.map((slide)=>(
        <Carousel.Item key={slide.id}>
          <Image
            src={`${API_URL}/${slide.img}`}
            className="d-block w-100 carousel-image"
            alt="First slide"
          />
          <Carousel.Caption
            className={
              theme ? "bg-slider-black text-light" : "bg-light text-black"
            }
          >
            <Container>
              <Row className="justify-content-center">
                <Col md={8} className="text-center titel-home">
                  <h3 className={theme ? "text-light my-3" : "text-black my-3"}>
                   {slide.title}
                  </h3>
                  <p className={theme ? "text-light" : "text-black "}>
                  {slide.subtitle}
                  </p>
                  <button
                    onClick={()=>navigate(`/${lang}/${slide.link_to}`)}
                    type="button"
                    className={
                      theme ? "text-light btn m-3" : "text-black btn m-3"
                    }
                  >
                    SHOP NOW
                  </button>
                </Col>
              </Row>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
        ))}
      
      </Carousel>

      <Cardes />
      {/* fragrance mean all type (Fragrances,Bags,Watches) but dynamic */}
      <Fragrances
        title={lang === "ar" ? "العطور" : "Fragrances"}
        apiUrl="product/bymaintype/Fragrance"
      />
      <Fragrances
        title={lang === "ar" ? "الحقائب" : "Bags"}
        apiUrl="product/bymaintype/Bag"
      />
      <Fragrances
        title={lang === "ar" ? "الساعات" : "Watches"}
        apiUrl="product/bymaintype/Watch"
      />
      <Brands />
      <Opinions />
    </div>
  );
};

export default Home;
