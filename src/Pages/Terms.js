import React, { useEffect, useState } from "react";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";

const API_URL = process.env.REACT_APP_API_URL;

function Terms() {
  const [theme] = useThemeHook();
  const [termsData, setTermsData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch(`${API_URL}/TermsConditionsRouter/getAllTermsConditions`)
      .then((response) => response.json()) 
      .then((data) => {
        setTermsData(data); 
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message); 
        setLoading(false);
      });
    window.scrollTo(0, 0); 
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section full-screen-slider"
          : "bg-light text-black margin_section full-screen-slider"
      }
      data-aos="fade-up"
    >
      <div className="container py-5">
        <div className="ms-3">
          <h2>Terms and Conditions</h2>
      
          {termsData.map((term) => (
            <div key={term.id}>
              <h5>{term.title}</h5>
              <p>{term.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Terms;
