import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const SearchBar = ({ searchQuery, searchResults, handleInputChange, setOpenSearch,setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const lang = location.pathname.split("/")[1] || "en";

  return (
    <form className="d-flex search-bar" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleInputChange}
      />
      {searchQuery && (
        <ul className="search_dropdown">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <li
                key={product.id}
                onClick={() => {
                  navigate(`${lang}/product-details/${product.id}`);
                  setOpenSearch(false);
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={`${API_URL}/${product.first_image}`}
                  alt={product.name}
                  height={"50"}
                  width={"50"}
                />
                {product.name}
              </li>
            ))
          ) : (
            <li>No products found.</li>
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
