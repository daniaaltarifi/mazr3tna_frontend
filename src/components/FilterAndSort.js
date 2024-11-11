import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoFilterCircleOutline } from "react-icons/io5";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import axios from "axios";
import "../Css/allproducts.css";
function FilterAndSort({ products, setFilteredProducts }) {
  const [theme] = useThemeHook();
  const API_URL = process.env.REACT_APP_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [mainType, setMainType] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  const sortProducts = (products, option) => {
    switch (option) {
      case "alphabetically_a_to_z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "alphabetically_z_to_a":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "price_low_to_high":
        return [...products].sort((a, b) => a.after_price - b.after_price);
      case "price_high_to_low":
        return [...products].sort((a, b) => b.after_price - a.after_price);
      default:
        return products;
    }
  };
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    const filtered = filterProducts(); // Get filtered products
    const sortedAndFilteredProducts = sortProducts(filtered, selectedOption); // Sort the filtered products
    setFilteredProducts(sortedAndFilteredProducts); // Update the filtered products
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brands
        const brandsResponse = await axios(`${API_URL}/product/get/brands`);
        setBrands(brandsResponse.data);

        // Fetch sizes based on mainType
        const storedData = localStorage.getItem("productInfo");
        if (storedData) {
          const productInfo = JSON.parse(storedData);
          setMainType(productInfo.mainType);
        }

        const sizeEndpoint =
          mainType === "Fragrance"
            ? `${API_URL}/product/get/sizesfragrances`
            : `${API_URL}/product/get/sizesbags`;

        const sizesResponse = await axios(sizeEndpoint);
        setSizes(sizesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mainType]);
  const filterProducts = () => {
    let updatedProducts = [...products];
    // Filter by availability
    if (availability) {
      updatedProducts = updatedProducts.filter((product) =>
        availability === "yes" ? product.instock : !product.instock
      );
    }
    // Filter by selected brand
    if (selectedBrand) {
      updatedProducts = updatedProducts.filter(
        (product) => product.brand_name === selectedBrand
      );
    }
    // Filter by selected size
    if (selectedSize) {
      updatedProducts = updatedProducts.filter(
        (product) => product.size === selectedSize
      );
    }
    if (minPrice) {
      updatedProducts = updatedProducts.filter(
        (product) => product.after_price >= Number(minPrice)
      );
    }
    if (maxPrice) {
      updatedProducts = updatedProducts.filter(
        (product) => product.after_price <= Number(maxPrice)
      );
    }
    return updatedProducts;
  };
  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
    setSelectedBrand("");
    setSelectedSize("");
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setAvailability("");
    setSelectedSize("");
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setAvailability("");
    setSelectedBrand("");
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };
  useEffect(() => {
    const filtered = filterProducts(); // Get currently filtered products
    const sortedAndFilteredProducts = sortProducts(filtered, sortOption); // Sort the filtered products
    setFilteredProducts(sortedAndFilteredProducts); // Update state
  }, [
    availability,
    selectedBrand,
    selectedSize,
    minPrice,
    maxPrice,
    sortOption,
    products,
  ]);

  return (
    <div className="container text-center container-all mt-5">
      <Row className="justify-content-between content-filter">
        <Col lg={8} className="mb-lg-0">
          <div className="d-flex justify-content-between">
            {/* Toggle Button for Offcanvas */}
            <Link
              className={`nav-link link-filter mt-3 ${
                theme ? "text-dark-primary" : "text-light-primary"
              }`}
              onClick={toggleOffcanvas}
            >
              <IoFilterCircleOutline size="1.4rem" /> Filter & Sort
            </Link>
          </div>
        </Col>
        <Col lg={4} md={6} xs={12} className=" mb-lg-0">
          <ul className="list-unstyled d-none d-md-flex justify-content-start mt-3">
            <li
              className={`me-3 title-filter mt-1 ${
                theme ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              Sort by:
            </li>
            <li className="me-3">
              <select
                className={`form-select ${
                  theme
                    ? "bg-light-black text-dark-primary"
                    : "bg-light text-light-primary"
                }`}
                style={{ border: "none" }}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="alphabetically_a_to_z">
                  Alphabetically A-Z
                </option>
                <option value="alphabetically_z_to_a">
                  Alphabetically Z-A
                </option>
                <option value="price_low_to_high">Price Low to High</option>
                <option value="price_high_to_low">Price High to Low</option>
              </select>
            </li>
            <li
              className={`me-3 title-filter mt-1 ${
                theme ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              {products.length} products
            </li>
          </ul>
        </Col>
        {/* 
          <Col lg={4} className="mb-lg-0">
            <ul className="list-unstyled d-flex m-2 justify-content-start d-md-none">
              <li
                className={`me-3 title-filter ${
                  theme ? "text-dark-primary" : "text-light-primary"
                }`}
              >
                644 products
              </li>
            </ul>
          </Col> */}
      </Row>

      {/* Offcanvas Component */}
      <div
        className={`offcanvas offcanvas-end ${isOpen ? "show" : ""} ${
          theme ? "bg-light-black" : "bg-light"
        }`}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header">
          <h5
            className={`offcanvas-title ${theme ? "text-light" : "text-black"}`}
            id="offcanvasRightLabel"
          >
            Filters and Sort
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={toggleOffcanvas}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <div className="cont_sort">
              <span className={`mt-1 ${theme ? "text-light" : "text-black"}`}>
                Availability:
              </span>
              <select
                className={`form-select custom-select ${
                  theme ? "bg-light-black text-light" : "bg-light text-black"
                }`}
                onChange={handleAvailabilityChange}
              >
                <option value="">Select Availability</option>
                <option value="yes">In stock</option>
                <option value="no">Out of stock</option>
              </select>
            </div>

            <div className="cont_sort">
              <span className={`mt-1 ${theme ? "text-light" : "text-black"}`}>
                Brand:
              </span>
              <select
                className={`form-select custom-select ${
                  theme ? "bg-light-black text-light" : "bg-light text-black"
                }`}
                onChange={handleBrandChange}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option value={brand.brand_name} key={brand.id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>
            {mainType && (
              <div className="cont_sort">
                <span className={`mt-1 ${theme ? "text-light" : "text-black"}`}>
                  Size:
                </span>
                <select
                  className={`form-select custom-select ${
                    theme ? "bg-light-black text-light" : "bg-light text-black"
                  }`}
                  onChange={handleSizeChange}
                >
                  <option value="">Select Size</option>
                  {sizes.map((size, index) => (
                    <option value={size.size} key={index}>
                      {size.size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="cont_sort">
              <span className={`mt-1 ${theme ? "text-light" : "text-black"}`}>
                Price Range:
              </span>
              <div>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className={`form-control ${
                    theme ? "bg-light-black text-light" : "bg-light text-black"
                  }`}
                  style={{
                    width: "80px",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className={`form-control ${
                    theme ? "bg-light-black text-light" : "bg-light text-black"
                  }`}
                  style={{ width: "80px", display: "inline-block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={toggleOffcanvas}
        ></div>
      )}
    </div>
  );
}

export default FilterAndSort;
