import React, { useEffect, useState } from "react";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
const API_URL = process.env.REACT_APP_API_URL;
function Privacy() {
  const [theme] = useThemeHook();
  const [privacyPolicy, setPrivacyPolicy] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
   
    fetch(`${API_URL}/privacypolicy/getprivacypolicy`)
      .then((response) => response.json()) 
      .then((data) => {
        setPrivacyPolicy(data); 
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
          <h2>Privacy Policies</h2>
          {privacyPolicy.map((policy) => (
            <div key={policy.id}>
              <h5>{policy.title}</h5>
              <p>{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Privacy;
