import React, { Suspense, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalComponents/ThemeProvider";
import Header from "./components/Header";
import RightCart from "./components/RightCart";
import AppFooter from "./components/AppFooter";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Pages

// import Home from "./Pages/Home";
// import Cart from "./Pages/Cart";
// import ProductDetails from "./Pages/ProductDetails";
// import SignIn from "./Pages/SignIn";
// import Register from "./Pages/Register";
// import MyAccount from "./Pages/MyAccount";
// import Cardes from "./Pages/Cardes";
// import Allproducts from "./Pages/Allproducts";
// import CheakOut from "./components/CheakOut";
// import Gift from "./Pages/Gift";
// import Privacy from "./Pages/Privacy";
// import Terms from "./Pages/Terms";

import { CartProvider } from "react-use-cart";
// import ForgetPassword from "./Pages/ForgetPassword";
// import ResetPassword from "./Pages/ResetPassword";
// import GetAllproducts from "./Pages/GetAllProducts";
// import GetBySeason from "./Pages/GetBySeason";
const Home=React.lazy(()=>import('./Pages/Home'))
const Cart=React.lazy(()=>import('./Pages/Cart'))
const ProductDetails=React.lazy(()=>import('./Pages/ProductDetails'))
const SignIn=React.lazy(()=>import('./Pages/SignIn'))
const Register=React.lazy(()=>import('./Pages/Register'))
const MyAccount=React.lazy(()=>import('./Pages/MyAccount'))
const Cardes=React.lazy(()=>import('./Pages/Cardes'))
const Allproducts=React.lazy(()=>import('./Pages/Allproducts'))
const CheakOut=React.lazy(()=>import('./components/CheakOut'))
const Gift=React.lazy(()=>import('./Pages/Gift'))
const Privacy=React.lazy(()=>import('./Pages/Privacy'))
const Terms=React.lazy(()=>import('./Pages/Terms'))
const ForgetPassword=React.lazy(()=>import('./Pages/ForgetPassword'))
const ResetPassword=React.lazy(()=>import('./Pages/ResetPassword'))
const GetAllproducts=React.lazy(()=>import('./Pages/GetAllProducts'))
const GetBySeason=React.lazy(()=>import('./Pages/GetBySeason'))


const App = () => {
  const [theme] = useThemeHook();

  // Component to redirect to default language
  const RedirectToDefaultLanguage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
      if (location.pathname === "/") {
        navigate("/en"); // Redirect to default language
      }
    }, [navigate, location.pathname]);

    return null;
  };

  // Component to handle direction based on language
  const DirectionHandler = () => {
    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'

    React.useEffect(() => {
      document.body.classList.remove("ltr", "rtl"); // Remove previous direction classes
      document.body.classList.add(lang === "ar" ? "rtl" : "ltr"); // Add new direction class
    }, [lang]);

    return null;
  };
  const location = useLocation();

  return (
    <>
      <RedirectToDefaultLanguage />
      <DirectionHandler /> {/* Handle direction change */}
      <CartProvider>
        <Header />
        <RightCart theme={theme} />
        <main
          className={theme ? "bg-light-black" : "bg-light"}
          style={{ paddingTop: "100px" }}
        >
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path="/:lang/allproducts/:main_product_id" element={<Allproducts />} />
            <Route path="/:lang/allmainproducts" element={<GetAllproducts />} />
            <Route path="/:lang/byseason/:season" element={<GetBySeason />} />
            <Route path="/:lang/cheakOut" element={<CheakOut />} />
            <Route path="/:lang" element={<Home />} />
            <Route path="/:lang/my-account" element={<MyAccount />} />
            <Route path="/:lang/sign-in" element={<SignIn />} />
            <Route path="/:lang/register" element={<Register />} />
            <Route path="/:lang/forgetpassword" element={<ForgetPassword />} />
            <Route path="/:lang/resetpassword" element={<ResetPassword />} />
            <Route path="/:lang/cardes" element={<Cardes />} />
            <Route path="/:lang/cart" element={<Cart />} />
            <Route
              path="/:lang/product-details/:id"
              element={<ProductDetails />}
            />
            <Route path="/:lang/gift" element={<Gift />} />
            <Route path="/:lang/privacy" element={<Privacy />} />
            <Route path="/:lang/terms" element={<Terms />} />
      
          </Routes>
      </Suspense>
          {/* Conditionally render the footer if the path is NOT '/cart' */}
          {!location.pathname.includes("/cart") && <AppFooter />}
        </main>
      </CartProvider>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
        <App />
    </Router>
  );
};

export default AppWrapper;
