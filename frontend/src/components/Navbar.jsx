import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const navItems = {
  ar: ["الرئيسية", "من نحن", "الخدمات", "تواصل معنا"],
  en: ["Home", "About", "Services", "Contact"],
};

const LogoSection = () => {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-white/40"
    >
      <img
        src={logoImage}
        alt="Brand logo"
        className="h-8 w-auto drop-shadow-sm transition group-hover:scale-[1.02] md:h-9"
      />
    </Link>
  );
};

const navButtonClass =
  "rounded-lg px-3 py-1.5 text-xs font-medium text-(--color-secondary-text) transition hover:bg-white/70 hover:text-(--color-accent-blue) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-blue)/40";

const NavButtons = ({ language, mobile = false, onItemClick }) => {
  const items = navItems[language];

  return (
    <div
      className={`flex items-center gap-2 md:gap-3 ${
        mobile ? "flex-col" : "flex-wrap justify-center"
      }`}
    >
      {items.map((item, index) =>
        index === 0 ? (
          <Link
            key={item}
            to="/"
            onClick={onItemClick}
            className={`${navButtonClass} ${mobile ? "w-full text-center" : ""}`}
          >
            {item}
          </Link>
        ) : (
          <button
            key={item}
            type="button"
            onClick={onItemClick}
            className={`${navButtonClass} ${mobile ? "w-full" : ""}`}
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
};

const AuthButtons = ({
  language,
  mobile = false,
  onActionClick,
  onLoginClick,
  onSignupClick,
}) => {
  const labels = {
    ar: { login: "تسجيل الدخول", signup: "إنشاء حساب" },
    en: { login: "Login", signup: "Sign Up" },
  };

  return (
    <div
      className={`flex items-center gap-2 md:gap-3 ${mobile ? "w-full flex-col" : ""}`}
    >
      <button
        type="button"
        onClick={() => {
          onLoginClick?.();
          onActionClick?.();
        }}
        className={`rounded-full border border-(--color-border) bg-(--color-soft-orange) px-4 py-2 text-sm font-semibold text-(--color-primary-text) transition hover:bg-(--color-main) ${
          mobile ? "w-full" : ""
        }`}
      >
        {labels[language].login}
      </button>
      <button
        type="button"
        onClick={() => {
          onSignupClick?.();
          onActionClick?.();
        }}
        className={`rounded-full bg-(--color-accent-blue) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-accent-teal) ${
          mobile ? "w-full" : ""
        }`}
      >
        {labels[language].signup}
      </button>
    </div>
  );
};

const LanguageButton = ({ language, onToggleLanguage }) => {
  const isArabic = language === "ar";

  return (
    <button
      type="button"
      onClick={onToggleLanguage}
      className="group relative inline-flex h-9 w-24 items-center rounded-lg border border-(--color-border)/60 bg-white/90 px-1 text-[11px] font-bold text-(--color-primary-text) shadow-sm backdrop-blur transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-blue)/40"
      aria-label="Switch language"
    >
      <span
        className={`absolute top-1 h-7 w-11 rounded-md bg-(--color-accent-blue) transition-all duration-300 ${
          isArabic ? "right-1" : "left-1"
        }`}
      />
      <span className="relative z-10 w-1/2 text-center leading-none text-black transition">
        AR
      </span>
      <span className="relative z-10 w-1/2 text-center leading-none text-black transition">
        EN
      </span>
    </button>
  );
};

const Navbar = ({
  language = "ar",
  onToggleLanguage,
  onOpenLogin,
  onOpenSignup,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--color-border)/30 bg-(--color-main)/75 backdrop-blur-xl">
      <nav className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/40 bg-white/50 px-2.5 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] backdrop-blur">
          <div className="flex items-center justify-between gap-3">
          <LogoSection />

          <div className="hidden flex-1 items-center justify-center md:flex">
            <NavButtons language={language} />
          </div>

            <div className="hidden items-center gap-3 md:flex">
            <LanguageButton
              language={language}
              onToggleLanguage={onToggleLanguage}
            />
            <AuthButtons
              language={language}
              onLoginClick={onOpenLogin}
              onSignupClick={onOpenSignup}
            />
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-lg border border-(--color-border)/70 bg-white/80 p-1.5 text-(--color-accent-blue) shadow-sm transition hover:bg-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4.5 w-4.5"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-2.5 flex flex-col gap-3 rounded-xl border border-(--color-border)/40 bg-white/90 p-3 shadow-[0_8px_20px_rgba(0,0,0,0.07)] backdrop-blur md:hidden">
            <LanguageButton
              language={language}
              onToggleLanguage={onToggleLanguage}
            />
            <NavButtons language={language} mobile onItemClick={closeMenu} />
            <AuthButtons
              language={language}
              mobile
              onActionClick={closeMenu}
              onLoginClick={onOpenLogin}
              onSignupClick={onOpenSignup}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
