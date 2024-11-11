import React, { useState, useEffect } from "react";
import "../Css/allproducts.css";
import { Image } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import RightCart from "../components/RightCart";
import { useLocation } from "react-router-dom";
import FilterAndSort from "../components/FilterAndSort";
// Set items per page to 16
const ITEMS_PER_PAGE = 16;
function BrandsProduct({ cartItems }) {
  const [theme] = useThemeHook();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const lang = location.pathname.split("/")[1] || "en";
  const { brand } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const [productByBrand, setProductByBrand] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [brandImg, setBrandImg] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleCanvas = () => {
    setCanvasOpen(!isCanvasOpen);
  };
  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  const currentProductsByBrand = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductsByBrand = async () => {
      try {
        const response = await fetch(
          `${API_URL}/product/get/productbybrands/${brand}`
        );
        const data = await response.json();
        setBrandName(data[0].brand_name);
        setBrandImg(data[0].brand_img);
        setProductByBrand(data); // Set the products state
        setFilteredProducts(data); // Initially set filtered products to all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByBrand();
  }, [brand]);
  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section full-screen-slider"
          : "bg-light text-black margin_section full-screen-slider"
      }
    >
      {productByBrand.length > 0 ? ( <div className="container text-center container-all">
        <Row className="mt-5">
          <Col
            xs={12}
            md={6}
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <h1 className="text-uppercase font-bold ">{brandName}</h1>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <Image
              src={` ${API_URL}/${brandImg} `}
              className="img-fluid brand_img m-3 "
              alt="brand img"
              height={"100px"}
              width={"300px"}
            />{" "}
          </Col>
        </Row>
        <FilterAndSort
          products={productByBrand}
          setFilteredProducts={setFilteredProducts}
        />

        {/* Backdrop for Offcanvas */}
        {isOpen && (
          <div
            className="offcanvas-backdrop fade show"
            onClick={toggleOffcanvas}
          ></div>
        )}
        <div className="row mt-5 justify-content-center">
          {currentProductsByBrand.map((product) => (
            <div
              className="col-lg-3 col-md-4 col-sm-12 product-allcard mb-5"
              key={product.id}
            >
              <Link
                to={`/${lang}/product-details/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                {/* Add a flex container to wrap the product content */}
                <div className="product-content d-flex flex-column h-100">
                  {/* Image and Sale Button */}
                  <div className="image-container">
                    <Image
                      src={`${API_URL}/${product.images}`}
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

                  {/* Description and Price */}
                  <h6 className={theme ? "text-light" : "text-black"}>
                    {product.name}
                  </h6>
                  <p className={theme ? "text-light " : "text-black"}>
                    {product.after_price}JD
                    <del className="original-price">
                      {product.before_price}JD
                    </del>
                  </p>

                  {/* Push button to the bottom */}
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
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls m-5">
          <a
            href="#"
            onClick={handlePreviousPage}
            className={currentPage === 1 ? "disabled-link mx-2" : "mx-2"}
          >
            <IoIosArrowBack size={20} />
          </a>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <a
            href="#"
            onClick={handleNextPage}
            className={
              currentPage === totalPages ? "disabled-link mx-2" : "mx-2"
            }
          >
            <IoIosArrowForward size={20} />
          </a>
        </div>
      </div>): <div className="m-5 text-center"> No Product Found For This Brand</div>}
     
      {/* Include the RightCart component */}
      <RightCart
        cartItems={cartItems}
        isCanvasOpen={isCanvasOpen}
        toggleCanvas={toggleCanvas}
      />
    </section>
  );
}

export default BrandsProduct;
