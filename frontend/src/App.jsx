import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";

const LANGUAGE_COOKIE_KEY = "site_language";
const ONE_YEAR_IN_DAYS = 365;

const getCookieValue = (key) => {
  const allCookies = document.cookie ? document.cookie.split("; ") : [];
  const match = allCookies.find((cookie) => cookie.startsWith(`${key}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
};

const setCookieValue = (key, value, days) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${key}=${encodeURIComponent(
    value,
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

const App = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = getCookieValue(LANGUAGE_COOKIE_KEY);
    return savedLanguage === "ar" || savedLanguage === "en"
      ? savedLanguage
      : "ar";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    const isArabic = language === "ar";

    html.lang = isArabic ? "ar" : "en";
    html.dir = isArabic ? "rtl" : "ltr";
    setCookieValue(LANGUAGE_COOKIE_KEY, language, ONE_YEAR_IN_DAYS);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      setCookieValue(LANGUAGE_COOKIE_KEY, next, ONE_YEAR_IN_DAYS);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenLogin={() => navigate("/login")}
        onOpenSignup={() => navigate("/signup")}
      />

      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/about" element={<UnderConstruction language={language} />} />
        <Route
          path="/services"
          element={<UnderConstruction language={language} />}
        />
        <Route
          path="/contact"
          element={<UnderConstruction language={language} />}
        />
        <Route path="/signup" element={<Signup language={language} />} />
        <Route path="/login" element={<Login language={language} />} />
        <Route
          path="*"
          element={<UnderConstruction language={language} />}
        />
      </Routes>

      <Footer language={language} />
    </div>
  );
};

export default App;
