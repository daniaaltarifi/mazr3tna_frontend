import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col , Form,Image} from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import { RiTiktokFill } from 'react-icons/ri';
import { BsInstagram } from "react-icons/bs";
import { ThemeContext } from '../GlobalComponents/ThemeProvider';
import '../Css/appFooter.css'
import { useNavigate ,useLocation, Link} from 'react-router-dom';
function AppFooter() {
  const { theme, setThemeMode } = useContext(ThemeContext); 
  const navigate = useNavigate();
  const location = useLocation();
 // Get the current language from the path or default to 'en'
 const lang = location.pathname.split('/')[1] || 'en';
  
 // Default selected option to the current language from the URL
 const [selectedOption, setSelectedOption] = useState(lang);

 const handleSelection = (event) => {
   const newLang = event.target.value;
   setSelectedOption(newLang);

   // Construct the new URL with the new language
   const newPath = `/${newLang}${location.pathname.substring(lang.length + 1)}`; // Adjust path for new language

   // Navigate to the new URL
   navigate(newPath);
 };

 // Optionally, update the selected option if the language in the URL changes (e.g., through manual URL entry)
 useEffect(() => {
   setSelectedOption(lang);
 }, [lang]);
    return (
      
        <footer  className={`  footer ${theme ? 'bg-light-black text-light' : 'bg-light text-black'}`}>
            <Container className=" p-3">
          
            <Row className="d-flex justify-content-between ">
    <Col lg={3} className="d-flex justify-content-evenly">
        {/* <h6 className="text-uppercase">

        {lang === "ar" ? "انضم إلى عائلتنا  " : "JOIN OUR FAMILY"}
        </h6>
        <Form.Group className="mb-3 position-relative w-50">
            <Form.Control 
                name="email" 
                type="email" 
                placeholder={lang === 'ar' ? "الايميل": "Email"} 
                required 
            />
        </Form.Group> */}
          <Image
                src={require('../images/Logo.avif')}
                style={{ maxHeight: "70px", margin: "10px",width:"70px",height:"70px" }}
                thumbnail
                fluid
                roundedCircle
                className="p-0 "
              />
    </Col>

    <Col lg={9} className="text-center">
        {/* Social media icons */}
        <FaFacebook size="1.1rem" className="ms-3" />
        <RiTiktokFill size="1.1rem" className="ms-3" />
        <BsInstagram size="1.1rem" className="ms-3" />
        
       {/* Contact Information */}
<div className="mt-3 ">
    <p className="mb-1">
       <a href="mailto:Info@hadiyyeh.com" className="link-Footer">Info@hadiyyeh.com</a>
    </p>
   
    <p className="mb-0">
       <a href="tel:+962775831777" className="link-Footer">+962 77 5831 777</a>
    </p>
</div>

    </Col>
</Row>


                <hr/>
                <Row className=" g-0">
  <Col lg={6} className=" style-formG m-2">
    <Form.Group className="mb-3"> {/* Adjusted to full width */}
      <Form.Label>

      {lang === "ar" ? "  اللغه " : "Language"}
      </Form.Label>
      <div  className="dropdown-wrapper">
      <select className="form-select " value={selectedOption} onChange={handleSelection}>
        <option value="en">En</option>
        <option value="ar">Ar</option>
      </select>
    </div>
    </Form.Group>
  </Col>
 
  <Col lg={6} className=" style-formG m-2">
    <Form.Group className="mb-3"> {/* Adjusted to full width */}
      <Form.Label>

      {lang === "ar" ? " البلد/المنطقة  " : "Country/Region"}
      </Form.Label>
      <Form.Select  name="country"  required>
        <option value="us" className={theme? 'bg-light-black text-light ': 'bg-light text-black'}>{lang === 'ar' ? "الاردن": "Jordan"}</option>
        {/* <option value="uk" className={theme? 'bg-light-black text-light ': 'bg-light text-black'}>Palestinian</option> */}
      </Form.Select>
    </Form.Group>
  </Col>
</Row>
<Row className="">
  <Col lg={12} className="mt-4 mb-lg-0">
    <ul className="list-unstyled d-flex flex-column flex-lg-row justify-content-start mt-3">
      <li className="ms-3 mb-2 mb-lg-0">
        <a href="/" className={theme ? 'linkbottom-Footer' : 'text-black linkbottom-Footer'}>
         
          {lang === "ar" ? "  هديه"  : "  © 2024, Hadiyyeh "}
        </a>
      </li>
      <li className="ms-3 mb-2 mb-lg-0">
        <Link to={`/${lang}/refund`} className={theme ? 'linkbottom-Footer' : 'text-black linkbottom-Footer'}>
         
           {lang === "ar" ? " سياسة الاسترجاع " : " Refund policy"}
        </Link>
      </li>
      <li className="ms-3 mb-2 mb-lg-0">
        <Link to={`/${lang}/privacy`} className={theme ? 'linkbottom-Footer' : 'text-black linkbottom-Footer'}>
          
          {lang === "ar" ? " سياسة الخصوصية " : "Privacy policy"}
        </Link>
      </li>
      <li className="ms-3 mb-2 mb-lg-0">
        <Link to={`/${lang}/terms`} className={theme ? 'linkbottom-Footer' : 'text-black linkbottom-Footer'}>
        
          {lang === "ar" ? "شروط الخدمة" : "  Terms of service"}
        </Link>
      </li>
    </ul>
  </Col>
</Row>



            </Container>
        </footer>
    );
}

export default AppFooter;
