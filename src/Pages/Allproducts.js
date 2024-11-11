import React, { useState, useEffect } from "react";
import "../Css/allproducts.css";
import { Image } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import RightCart from "../components/RightCart";
import FilterAndSort from "../components/FilterAndSort";
import { useLocation } from "react-router-dom";
// Set items per page to 16
function Allproducts({ cartItems }) {
  const [theme] = useThemeHook();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const API_URL = process.env.REACT_APP_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [isCanvasOpen, setCanvasOpen] = useState(false);
  const [productType, setProductType] = useState("");
  const [mainType, setMainType] = useState("");
  const [season, setSeason] = useState("");
  const [allproducts, setAllProducts] = useState([]);
  const [productlocal, setProductLocal] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);
  // useEffect(() => {
  //   const storedData = localStorage.getItem("productInfo");
  //   if (storedData) {
  //     const productInfo = JSON.parse(storedData);
  //     setMainType(productInfo.mainType);
  //     setProductType(productInfo.productType);
  //     setSeason(productInfo.season);
  //     setProductLocal(productInfo.allproductData);
  //   }
  //   let fetchURL;
  //   if (mainType && productType) {
  //     fetchURL = `${API_URL}/product/bysubtype/subtype?type=${mainType}&subtype=${productType}`;
  //   } else if (mainType && !productType) {
  //     fetchURL = `${API_URL}/product/bymaintype/${mainType}`;
  //   } else if (!mainType && !productType && season) {
  //     fetchURL = `${API_URL}/product/get/productbyseason/${season}`;
  //   } else if (!mainType && !productType && !season && productlocal) {
  //     fetchURL = `${API_URL}/product/get/allproducts`;
  //   }

  //   if (fetchURL) {
  //     fetch(fetchURL)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setAllProducts(data); // Set all products without sorting
  //         setFilteredProducts(data); // Initially set filtered products to all products
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching products:", error);
  //       });
  //   }
    
  // }, [mainType, productType, season, productlocal]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleStorageChange = () => {
      const storedData = localStorage.getItem("productInfo");
      if (storedData) {
        const productInfo = JSON.parse(storedData);
        setMainType(productInfo.mainType);
        setProductType(productInfo.productType);
        setSeason(productInfo.season);
        setProductLocal(productInfo.allproductData);
      }
      let fetchURL;
      if (mainType && productType) {
        fetchURL = `${API_URL}/product/bysubtype/subtype?type=${mainType}&subtype=${productType}`;
      } else if (mainType && !productType) {
        fetchURL = `${API_URL}/product/bymaintype/${mainType}`;
      } else if (!mainType && !productType && season) {
        fetchURL = `${API_URL}/product/get/productbyseason/${season}`;
      } else if (!mainType && !productType && !season && productlocal) {
        fetchURL = `${API_URL}/product/get/allproducts`;
      }
      if (fetchURL) {
        setIsLoading(true); // Set loading state before fetching
        fetch(fetchURL)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setAllProducts(data);
            console.log("product",data)
            setFilteredProducts(data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          })
          .finally(() => {
            setIsLoading(false); // Reset loading state after fetching
          });
      } else {
        setIsLoading(false); // Reset loading if no fetch URL
      }
    };
    // Listen for custom event
    window.addEventListener("productInfoUpdated", handleStorageChange);
    // Initial check when component mounts
    handleStorageChange();
    return () => {
      window.removeEventListener("productInfoUpdated", handleStorageChange);
    };
  }, [mainType, productType, season, productlocal]);
  
  const toggleCanvas = () => {
    setCanvasOpen(!isCanvasOpen);
  };

  const productsPerPage = 16; // Example value for pagination

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
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

  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section "
          : "bg-light text-black margin_section "
      }
      // data-aos="fade-up"
    >
      <div className="container text-center container-all">
        <FilterAndSort
          products={allproducts}
          setFilteredProducts={setFilteredProducts}
        />
        {/* Backdrop for Offcanvas */}

        <div className="row mt-5 justify-content-center">
          {isLoading ? ( null // Show a loading message
        )
          :currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-12 product-allcard mb-5"
                key={product.id}
              >
                <div className="product-content d-flex flex-column h-100">
                  <Link
                    to={`/${lang}/product-details/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {/* Image and Sale Button */}
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
                    {/* Description and Price */}
                    <h6 className={theme ? "text-light" : "text-black"}>
                      {product.name}
                    </h6>

                    <p className={theme ? "text-light " : "text-black"}>
                      {product.after_price} JD
                      <del className="original-price">
                        {product.before_price} JD
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
                      <div >
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
              </div>
            ))
          ) : (
            <div>
              <p>No Products Found</p>
            </div>
          )}
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
      </div>
      {/* Include the RightCart component */}
      <RightCart
        cartItems={cartItems}
        isCanvasOpen={isCanvasOpen}
        toggleCanvas={toggleCanvas}
      />
    </section>
  );
}

export default Allproducts;
