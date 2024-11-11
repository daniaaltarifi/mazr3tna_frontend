import React,{useEffect, useState} from 'react'
import {Image } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Link,useLocation } from 'react-router-dom';

function YouMayAlsoLike({main_product_type}) {
    const [theme] = useThemeHook();
    const location = useLocation();
    const API_URL = process.env.REACT_APP_API_URL;
    const lang = location.pathname.split("/")[1] || "en";

const [mayLike,setMayLike]=useState([])
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`${API_URL}/product/bymaintype/${main_product_type}`);
            const data = await response.json();
            const randomProduct=data.sort(()=> 0.5 - Math.random()).slice(0, 4);
            setMayLike(randomProduct); // Set the products state
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchProducts();
      }, [main_product_type]);
  return (
    <div>
           {/* You May Also Like Section */}
      <div className="mt-5 text-center">
        <h3 className={theme ? "text-light mt-5" : "text-black mt-5"}>
          You May Also Like
        </h3>

        {/* Card Section */}
        <div className="row m-5 justify-content-center">
          {mayLike.map((product) => (
              <div
              className="col-lg-3 col-md-4 col-sm-12 product-allcard mb-5 p-4"
              key={product.id}
            >
              <Link to ={`/${lang}/product-details/${product.id}`} style={{textDecoration:"none"}}>
              <div className="image-container">
                <Image
                  src={`${API_URL}/${product.first_image}`}
                  className="img-fluid img_all m-3 product-image"
                  alt="First slide"
                />
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
              <h6 className={theme ? "text-light" : "text-black"}>
                {product.name}
              </h6>
              <p className={theme ? "text-light" : "text-black"}>
                {product.after_price} JD
                <del className="original-price">{product.before_price} JD</del>
              </p>
            </Link>
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}

export default YouMayAlsoLike